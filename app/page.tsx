import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { navLists } from '@/constants'

const Home = () => {
  
  return (
    <div className='flex flex-col'>
      <nav className='flex-between w-full bg-transparent px-6 py-4 lg:px-10'>
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
          max-sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-600 via-purple animate-gradient-x'>
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
        
        <div className='max-sm:hidden'>
         <Image
          src='/images/study1.png'
          alt="Study"
          width={500}
          height={500}
          className='hover:scale-75'
         />
        </div>
       </div>
       <div className='bg-gray-700 flex-col'>
         <div className='flex-wrap p-5'>
           <h1 className='text-2xl text-white m-4'>Here is where your Education is going to be improved with
             <span className='font-extrabold text-7xl bg-clip-text text-transparent
              bg-gradient-to-r from-purple-500 to-blue-600 via-purple animate-gradient-x ml-5'>AI</span></h1>
         </div>
         <div className=''>
          <p className=''>

          </p>
         </div>
       </div>
    </div>
  )
}

export default Home