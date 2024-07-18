import React from 'react'
import Image from 'next/image'
 

type CardProps = {
  Title: string
  Icon?: string
  handleClick?: () => void
  Content: string
}

const Card = ({Title,Icon,handleClick,Content}:CardProps) => {
  return (
    <div className='bg-dark-4 rounded-lg text-white p-5 px-3 pl-4 m-4  hover:opacity-50 cursor-pointer transition-all z-10 max-w-[450px]'onClick={handleClick}>
       <div className='flex-col gap-2'>
        <div className='flex-row gap-2'>
        <h1 className='text-2xl text-center font-bold'>{Title}</h1>
        <div className=''>{
          Icon &&
            <Image src={Icon} width={50} height={50} alt='Icon' className='glassmorphism p-2 m-1' />}
          </div>
          </div>
        <div className='flex justify-between'>
          <p className='text-lg font-medium'>{Content}</p>
          
        </div>
       </div>
    </div>
  )
}

export default Card