import React,{ReactNode} from 'react'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from '@/components/MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'
import StreamVideoProvider from '@/Providers/StreamClientProvider'

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <main className='relative'>
      <StreamVideoProvider>
      <nav className='mt-0 flex-between fixed w-full bg-dark-1 px-6 py-4 lg:px-10 z-50'>
      <Link href="/home" className='flex items-center gap-1'>
      <Image
        src="/images/Cap.png"
        width={60}
        height={60}
        alt="Logo"
        className='max-sm:size-11'
       />
       <p className='text-white font-bold'>Noteflex</p>
       </Link>
       <div className='flex-between gap-5 text-white'>
       {/* Clerk -User Management */}
            <SignedIn> 
              <UserButton/>
            </SignedIn>
       <div className='flex-center sm:hidden'><MobileNav/></div>
       </div>
      </nav>
    <div className='flex'>
        <Navbar/>
       <section className='flex min-h-screen flex-1 flex-col px-6 pb-6  pt-28  max-md:pb-14 sm:px-14'>
       <div className='w-full'>{children}</div>
       </section>
    </div>
    </StreamVideoProvider>
    </main>
  )
}

export default HomeLayout