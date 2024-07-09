import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Menu } from 'lucide-react' 
import { navLists } from '@/constants'
import Link from 'next/link'   
  
const Mobile = () => {
  return (
    <section className=''>
      <DropdownMenu>
       <DropdownMenuTrigger><Menu className='text-white' size={20}/></DropdownMenuTrigger>
    <DropdownMenuContent className='glassmorphism'>      
        {navLists.map((nav,i)=>(
              <Link href={nav.route}>
              <DropdownMenuItem key={i} className='p-3 m-5 text-sm cursor-pointer text-white  
                  hover:text-gray-800 hover:bg-white  rounded-md  transition-all'>
                 {nav.label}
              </DropdownMenuItem>
              </Link>
            ))}
  </DropdownMenuContent>
</DropdownMenu>

    </section>
  )
}

export default Mobile