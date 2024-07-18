"use client"

import Loading from '@/components/Loading'
import React,{useState,useEffect} from 'react'
import gsap from 'gsap'
import {cn} from "@/lib/utils"
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger)

const Chat = () => {
  // States
  

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

  return (
    <div className='flex flex-col gap-6'>
     <div className='m-4 p-3 justify-items-center'>
        <p className='text-5xl font-medium text-white p-2'>
          Here are your PDFs , let's get learning.
        </p>
     </div>
     <div className='mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2'>
        {/* Function with card that map over the already uploaded files */}
     </div>
    </div>
  )
}

export default Chat