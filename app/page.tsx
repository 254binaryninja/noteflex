'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { footer, navLists } from '@/constants'
import Lottie from 'lottie-react'
import study from '../public/animations/study.json'
import AI from '../public/animations/AI.json'

const Home = () => {
  
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
        <div className='m-5 p-3'>
          <p className='text-xl text-white font-medium max-w-[850px]'>
            <span className='text-5xl text-cyan-600 px-4'>Welcome</span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eaque nisi, quo ad recusandae
             sit ut error animi neque nostrum beatae ducimus illo quisquam facilis, 
             aut velit perspiciatis! Fuga, necessitatibus cum!
          </p>
        </div>
        
        <div className='max-sm:hidden' style={{width:"30%"}}>
        <Lottie animationData={study} />
        </div>
       </div>
       <div className='bg-gray-800 flex-col'>
         <div className='p-5'>
           <h1 className='flex-center w-full text-2xl text-white m-4 font-bold'>Here is where your Education is going to be improved with
             <span className='font-extrabold text-7xl bg-clip-text text-transparent
              bg-gradient-to-r from-purple-500 to-blue-600 via-white animate-gradient-x ml-5 p-4'>AI</span></h1>
         </div>
         <div className=' gap-7 max-w-[1500px] z-10 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 border '>
          <div className=''>
          <div style={{width:"50%"}} className='flex-center ml-20'>
            <Lottie animationData={AI}/>
          </div>
          <div className='justify-end'>
          <p className='text-white m-5 p-4'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio velit illum reiciendis sit iure 
            corporis nobis necessitatibus ducimus quas quis. Cumque corrupti sit qui, alias natus assumenda eos nisi doloremque?
          </p>
          </div>
          </div>
          </div>
         <footer className='w-full max-sm:max-w-[300px] flex-between'>
           <h1 className='text-bold text-white text-sm m-4 p-3'>A copyright of Chemist Labs @2024</h1>
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