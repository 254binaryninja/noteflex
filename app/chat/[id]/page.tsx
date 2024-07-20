'use client'

import Card from '@/components/Card'
import React,{useState} from 'react'
import { Send } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { useAuth } from '@clerk/nextjs'
import { chatResponse } from '@/actions/generation'

const NoteChat = ({params : id}:{params:{id:string}}) => {

   const sendPrompt =() => {

   }

  const [prompt,setPrompt] = useState("")
  return (
    <div className='flex flex-col gap-6'>
     <div className=' flex flex-col gap-3  mt-20  p-4  flex-center'>
       <p className='text-9xl max-sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600'>Hello Arnold,</p>
       <p className='text-7xl max-sm:text-4xl text-white/30 font-extrabold'>how can I help today ? </p>
     </div>
     <div className='flex-center mt-20 grid    md:grid-cols-2 xl:grid-cols-2'>
     <Card
       Title="Precision"
       Content="With Noteflex you get assuared quality responses since your notes are the data source"
      />
      <Card
       Title="AI"
       Content="Unlike your regular experience this MISTRAL_AI powered tool gives you top notch study exprience "
      />
     </div>
     <div className='mt-20 flex flex-center flex-row'>
       <Textarea
        placeholder="Enter Prompt"
        value={prompt}
        onChange={(e)=>setPrompt(e.target.value)}
        className='bg-dark-4 rounded-lg p-5 text-white max-w-[350px] focus-visible:ring-0 focus-visible:ring-offset-0'
       />
       <div className='m-3 p-4 bg-dark-4 rounded-md  text-white cursor-pointer' onClick={sendPrompt}>
        <Send size={20}/>
        </div>  
     </div>
    </div> 
  )
}

export default NoteChat