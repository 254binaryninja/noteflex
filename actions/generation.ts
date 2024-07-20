import MistralClient from "@mistralai/mistralai";
import { createClient } from "@supabase/supabase-js";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


//Create new mistral and supabase client

const mistralClient = new MistralClient(process.env.NEXT_MISTRAL_CLIENT)
                        
let supabaseClient:any;

 if (process.env.NEXT_SUPABASE_PROJECT_URL && process.env.NEXT_SUPABASE_API_KEY) {
    try{
        supabaseClient = createClient(
            process.env.NEXT_SUPABASE_PROJECT_URL,
            process.env.NEXT_SUPABASE_API_KEY)
    }catch(error){
        console.log(error)
    }
 }


//Embed User Input

async function embedInput(input:string){
   const inputResponse = await mistralClient.embeddings({
    model:'mistral-embed',
    input:input
   })

   return inputResponse.data[0].embedding
}
// Retrieve similar embedding from supabase
const queryEbedding = async (userId: string, queryEmbedding:number[]) => {
    if (!supabaseClient) {
        throw new Error('Supabase client is not initialized');
    }

    const { data} = await supabaseClient.rpc('match_documents', {
        user_id: userId,
        query_embedding: queryEmbedding, // Pass the embedding you want to compare
        match_threshold:0.78, // Choose an appropriate threshold for your data
        match_count: 5, // Choose the number of matches
    });

    return data.map((chunk: { content: string; }) => chunk.content).join("")
};


// Generate Chat response
async function generateChatResponse(context:string,input:string){
   const response = await mistralClient.chat({
    model:'open-mixtral-8x22b',
    messages:[{
        role:'user',
        content:`PDF content:${context}-Question:${input}`
    }]
   })

   return response.choices[0].message.content
}

export async function chatResponse(input:string,userId:string) {
   const resInput = await embedInput(input)
   const response = await queryEbedding(userId,resInput)
   const chatResponse = await generateChatResponse(response,input)

   return chatResponse;
}