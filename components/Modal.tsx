import React,{Children, ReactNode} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from 'next/image';
import { cn } from '@/lib/utils';


interface ModalProps {
isOpen:boolean;
onClose:()=>void;
title:string;
className?:string;
children?:ReactNode;
handleClick?:()=>void;
buttonText:string;
image?:string;
buttonIcon?:string;
}

const Modal = ({isOpen,onClose,title,children,className,handleClick,buttonText,image,buttonIcon}:ModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
  <DialogContent className='flex w-full max-w[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
    <div className='flex flex-col gap-6'>
       {image && (
         <div className='flex justify-center'>
          <Image
           src={image}
           alt="image"
           width={72}
           height={72}
          />
         </div>
       )}
       <DialogTitle>  <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>
        {title}
       </h1>
       </DialogTitle>
      {children}
       <Button className='bg-blue-600 ring-remove cursor-pointer'>
        {buttonIcon && (
          <Image
          src={buttonIcon}
          alt="buttonIcon"
          width={13}
          height={13}
          />
        )} &nbsp;
        {buttonText}
       </Button>
    </div>
  </DialogContent>
</Dialog>

  )
}

export default Modal