'use server'

import MistralClient from '@mistralai/mistralai';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import pdf from 'pdf-parse';

interface PdfData {
  text: string;
  numpages: number;
  numrender: number;
  info: {
    [key: string]: any;
  };
  metadata: any;
}

interface EmbeddingData {
  user_id: string;
  file_name: string;
  content: string;
  embedding: number[];
}

const mistralClient = new MistralClient(process.env.NEXT_MISTRAL_CLIENT!);

let supabaseClient: SupabaseClient | null = null;

if (process.env.NEXT_SUPABASE_PROJECT_URL && process.env.NEXT_SUPABASE_API_KEY) {
  try {
    supabaseClient = createClient(
      process.env.NEXT_SUPABASE_PROJECT_URL,
      process.env.NEXT_SUPABASE_API_KEY
    );
  } catch (error) {
    console.log(error);
  }
}

const extractPDF = async (buffer: Buffer): Promise<string> => {
  const data = (await pdf(buffer)) as PdfData;
  return data.text;
};

const splitDocument = async (buffer: Buffer): Promise<string[]> => {
  const text = await extractPDF(buffer);
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,
    chunkOverlap: 50,
  });

  const output = await splitter.createDocuments([text]);
  return output.map(chunk => chunk.pageContent);
};

const saveSupabase = async (embeddingsData: EmbeddingData[]): Promise<void> => {
  if (!supabaseClient) {
    throw new Error('Supabase client is not initialized');
  }

  const { data, error } = await supabaseClient
    .from('embeddings')
    .insert(embeddingsData);

  if (error) {
    console.error('Error saving to Supabase:', error);
    throw error;
  } else {
    console.log('Embeddings saved to Supabase:', data);
  }
};

export const createEmbeddings = async (userId: string, fileName: string, chunks: string[]): Promise<void> => {
  try {
    const embeddings = await mistralClient.embeddings({
      model: 'mistral-embed',
      input: chunks,
    });

    const embeddingsData: EmbeddingData[] = chunks.map((chunk, i) => ({
      user_id: userId,
      file_name: fileName,
      content: chunk,
      embedding: embeddings.data[i].embedding,
    }));

    await saveSupabase(embeddingsData);
  } catch (error) {
    console.error('Error creating embeddings:', error);
    throw error;
  }
};

export const handleFileUpload = async (file: File, userId: string, fileName: string): Promise<void> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const chunks = await splitDocument(buffer);
    await createEmbeddings(userId, fileName, chunks);
  } catch (error) {
    console.error('Error handling file upload:', error);
    throw error;
  }
};
