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
  const [prompt,setPrompt] =useState();

  //Animations
  useGSAP(()=>{
    gsap.fromTo('#text',{
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
    <div className=''>
      {/* <Loading/> */}
    </div>
  )
}

export default Chat