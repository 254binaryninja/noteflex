'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { footer, navLists } from '@/constants'
import Lottie from 'lottie-react'
import study from '../public/animations/study.json'
import AI from '../public/animations/AI.json'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Mobile from '@/components/Mobile'

const Home = () => {

  useGSAP(()=>{
     gsap.fromTo("#text",{
      opacity:0,
      y:20,
     },{
      opacity:1,
      y:0,
      delay:1,
      stagger:0.5,
     })
  },[])
  
  return (
    <div className='flex flex-col'>
      <nav className='flex-between  w-full bg-transparent px-6 py-4 lg:px-10'>
      <Link href="/" className='flex items-center gap-1'>
      <Image
        src="/images/Cap.png"
        width={60}
        height={60}
        alt="Logo"
        className='max-sm:size-11'
       />
       <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Noteflex</p>
       </Link>
       <div className='flex-center sm:hidden'><Mobile/></div>
       <div className='flex flex-1 justify-center max-sm:hidden'>
            {navLists.map((nav,i)=>(
              <Link href={nav.route}>
              <div key={i} className='p-3 m-5 text-sm cursor-pointer text-white  
                  hover:text-gray-800 hover:bg-white  rounded-md  transition-all'>
                 {nav.label}
              </div>
              </Link>
            ))}
        
      </div>
       </nav>
       <div className='mt-10'>
          <h1 className='flex justify-center  text-8xl font-extrabold
          max-sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600 via-white animate-gradient-x'>
            NOTEFLEX
          </h1>
       </div>
       <div className='flex flex-row p-5 justify-start'>
        <div  className='m-5 p-3'>
          <p id="text" className='text-xl text-white font-medium max-w-[850px]'>
            Noteflex:
            <span className='text-3xl text-color'>Your All-in-One Study Buddy</span>
          Feeling overwhelmed by notes and struggling to find the information you need? 
          Noteflex is here to revolutionize your studying! Capture all your important ideas in one place,
          transform them into a powerful knowledge base, and leverage the power of AI to enhance your learning 
          experience.
          </p>
          <p id="text" className='text-xl text-white font-medium max-w-[850px]'>
          Imagine a platform that not only remembers everything you've written but 
          also learns from it. With Noteflex's innovative AI features, your notes become 
          a springboard for deeper understanding. Generate practice questions, personalize your 
          study experience, and even collaborate with fellow learners through seamless video conferencing.

           No tech expertise needed! Noteflex is designed with simplicity in mind. 
           Focus on what matters most - mastering your subject - while Noteflex takes care of the rest.
          </p>
        </div>
        
        <div className='max-sm:hidden' style={{width:"30%"}}>
        <Lottie animationData={study} />
        </div>
       </div>
       <div id='more' className='bg-gray-800 flex-col'>
         <div className='p-5'>
           <h1 className='m-6  p-5 w-full text-2xl text-white  font-bold'>Here is where your Education is going to be improved with
             <span className='font-extrabold text-7xl bg-clip-text text-transparent
              bg-gradient-to-r from-purple-500 to-blue-600 via-white animate-gradient-x ml-5 p-4'>AI</span></h1>
         </div>
         <div className='flex-center m-9  z-20 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border '>
          <div className=''>
         <div style={{width:"40%"}} className='flex-center ml-20'>
            <Lottie animationData={AI}/>
          </div>
          <div  className='justify-end'>
          <p id="text"  className='text-white m-5 p-4 hover:'>
          Noteflex's built-in AI is like having a <span className='text-3xl font-semibold text-color'> personal study 
          coach in your pocket</span>. Think of it as a super-powered highlighter that 
          goes beyond marking text. It analyzes your notes, identifies key concepts, 
          and even generates practice questions to test your understanding.
          Stuck on a particular topic? The AI can suggest relevant resources or connect
           you with classmates who can help. It's like having a built-in study partner that 
           adapts to your learning style and keeps you on track for success.</p>
          </div>
          </div>
          </div>
         <footer className='w-full max-sm:max-w-[300px] flex-between'>
           <h1 className='text-bold text-white text-sm m-4 p-3'>© 2024 Chemist Labs</h1>
           <div className='flex-row gap-4'>
               {footer.map((foot,i)=>(
                <Link href="#" key={i} className='text-blue-600 font-semibold m-4 p-2 hover:text-purple-500 transition-all'>
                  {foot}
                  </Link>
               ))}
           </div>
         </footer>
       </div>
    </div>
  )
}

export default Home