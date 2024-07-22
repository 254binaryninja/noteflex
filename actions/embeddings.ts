import MistralClient from '@mistralai/mistralai';
import { createClient } from '@supabase/supabase-js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import pdf from 'pdf-parse';

// Create new mistral and supabase client

const mistralClient = new MistralClient(process.env.NEXT_MISTRAL_CLIENT);

let supabaseClient: any;

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

// PDF text extraction

interface PdfData {
  text: string;
  numpages: number;
  numrender: number;
  info: {
    [key: string]: any;
  };
  metadata: any;
}

const extractPDF = async (fileBuffer: Buffer): Promise<PdfData> => {
  const data = await pdf(fileBuffer) as PdfData;
  return data;
};

// Breaking pdf data into chunks

async function splitDocument(fileBuffer: Buffer) {
  try {
    const data = await extractPDF(fileBuffer);
    const response = data.text;
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 250,
      chunkOverlap: 50,
    });

    const output = await splitter.createDocuments([response]);
    const textArr = output.map(chunk => chunk.pageContent);

    return textArr;
  } catch (error) {
    console.log('Error splitting document:', error);
  }
}

// Save embeddings to supabase

async function saveSupabase(embeddingsData: { user_id: string; file_name: string; content: string; embedding: number[] }[]): Promise<void> {
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
}

// Create Embeddings using mistral AI
async function createEmbeddings(userId: string, fileName: string, chunks: string[]): Promise<void> {
  try {
    const embeddings = await mistralClient.embeddings({
      model: 'mistral-embed',
      input: chunks,
    });

    const embeddingsData = chunks.map((chunk, i) => ({
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
}

export async function fileUpload(userId: string, fileName: string, fileBuffer: Buffer): Promise<void> {
  try {
    const text = await splitDocument(fileBuffer);
    if (text) {
      await createEmbeddings(userId, fileName, text);
    } else {
      console.log('Error creating embeddings');
    }
  } catch (error) {
    console.log('Error uploading file:', error);
  }
}
