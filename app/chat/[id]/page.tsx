'use client'

import Card from '@/components/Card'
import React,{useState} from 'react'
import { Send } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useUser,useAuth } from '@clerk/nextjs'
import { chatResponse } from '@/actions/generation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Skeleton from '@/components/Skeleton'
import { Typewriter } from 'react-simple-typewriter'

const NoteChat = ({params : id}:{params:{id:string}}) => {
  const {userId} = useAuth();
  const {user} = useUser();

  let Id:string;
 
  if (userId) {
    Id = userId;
  }

  const [prompt,setPrompt] = useState("");
  const [recentPrompt,setRecentPrompt] = useState<string>();
  const [loading,setLoading] = useState<boolean>();
  const [showResult,setShowResault] = useState<boolean>();
  const [resultData,setResultData] = useState<string>();
  const [messages,setMessages] = useState([]);

  const response = async () => {
    setResultData(" ")
    setLoading(true)
    setShowResault(true)
    setRecentPrompt(prompt)
    const data = await chatResponse(prompt,Id,id.id)
    setResultData(data)
    setLoading(false)
    setPrompt(" ")
  }

 
  return (
    <div className='flex flex-col gap-6'>
      
     {!showResult?<>
     <div className=' flex flex-col gap-3  mt-20  p-4  flex-center'>
        <p className='text-9xl max-sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600'>Hello {user?.lastName},</p>
        <p className='text-7xl max-sm:text-4xl text-white/30 font-extrabold'>how can I help today ? </p>
      </div><div className='flex-center mt-20 grid    md:grid-cols-2 xl:grid-cols-2'>
          <Card
            Title="Precision"
            Content="With Noteflex you get assuared quality responses since your notes are the data source" />
          <Card
            Title="AI"
            Content="Unlike your regular experience this MISTRAL_AI powered tool gives you top notch study exprience " />
        </div>
        </>:
        <div className='flex flex-col gap-7 ml-10 mt-10'>
          <div className='flex-row gap-2 bg-gray-500 rounded-md m-2 p-4'>
            <Image
             src={user?.imageUrl || ''}
             width={20}
             height={20}
             alt='User Image'
             className='p-2 bg-gray-500 rounded-lg '
            />
            <p className='font-medium text-white text-2xl cursor-pointer'>{recentPrompt}</p>
          </div>
          <div className='flex-row gap-2 bg-dark-4 rounded-md m-10 p-4'>
            <Image
             src='images/brain.png'
             width={20}
             height={20}
             alt='Mistral AI'
             className='p-2 bg-dark-4 rounded-lg'            
            />{
              loading ? <div className='mt-5'>
                <Skeleton/>
                </div> :
            <p className='font-medium text-white text-2xl'>
              {<Typewriter
                  words={[resultData || '']}
                  cursor
                  cursorStyle='_'
                  typeSpeed={50}
                  deleteSpeed={50}
                  delaySpeed={1000}/>}
              </p>}
          </div>
        </div>}

     <div className='mt-20 flex flex-center flex-row'>
       <Textarea
        placeholder="Enter Prompt"
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        className='bg-dark-4 rounded-lg p-5 text-white max-w-[350px] focus-visible:ring-0 focus-visible:ring-offset-0'
       />
       <div className='m-3 p-4 bg-dark-4 rounded-md  text-white cursor-pointer' onClick={response}>
        <Send size={20} />
        </div>  
     </div>
     <p className='flex-center m-1 flex-center font-medium text-xl text-white/30'>Context may vary depending on PDF or the mistral model hence use with caution.</p>
    </div> 
  )
}

export default NoteChat