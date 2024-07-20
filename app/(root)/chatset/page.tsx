"use client"

import Loading from '@/components/Loading'
import React,{useState,useEffect} from 'react'
import gsap from 'gsap'
import {cn} from "@/lib/utils"
import { createClient } from "@supabase/supabase-js";
import { useGSAP } from '@gsap/react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'


interface FileName {
  file_name: string;
}


const Chat = () => {
  // States
  const {userId} = useAuth();
  let user:string;
  if (userId){
    user = userId;
  }
  const [fileNames, setFileNames] = useState<FileName[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  //Animations
  useGSAP(()=>{
    gsap.fromTo('#card',{
      opacity:0,
      y:0,
    },{
      opacity:1,
      y:20,
      delay:1,
      stagger:0.5,
    })
  },[])

  //Functions
                        
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

  const fetchUserFiles = async (user: string) => {
    if (!supabaseClient) {
        throw new Error('Supabase client is not initialized');
    }

    const { data, error } = await supabaseClient
        .from('embeddings')
        .select('file_name')
        .eq('user_id', user);

    if (error) {
        console.error('Error fetching filenames:', error);
        throw error;
    }

    // Use a Set to filter unique filenames
    const uniqueFiles = Array.from(new Set(data.map((file: { file_name: string }) => file.file_name)));

    return uniqueFiles;
};

 const createChat = async () =>{
  
 }

  useEffect(()=>{
   fetchUserFiles(user)
  },[])

  return (
    <div className='flex flex-col gap-6'>
     <div className='m-4 p-3 justify-items-center'>
        <p className='text-5xl font-medium text-white p-2'>
          Here are your PDFs , let's get learning.
        </p>
     </div>
     <div className='mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2'>
        {/* Function with card that map over the already uploaded files */}
        {}
     </div>
    </div>
  )
}

export default Chat