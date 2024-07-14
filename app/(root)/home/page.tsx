'use client'

import Card from '@/components/Card'
import { useRouter } from 'next/navigation'
import React,{useState} from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import Modal from '@/components/Modal'

const HomePage = () => {
  const router = useRouter();
  const [cardState,setCardState] = useState<'isUploadingFile'|'isJoiningMeeting'|'isSchedulingMeeting'|'isDoingExam'|undefined>();
  const [fileUrl,setFileUrl] = useState({
    file:null,
    url:""
  });
  const [meetingValues,setMeetingValues] = useState({
    dateTime:new Date(),
    description:'',
    link:'',
   });

  //Animation
  useGSAP(()=>{
    gsap.fromTo("#text",{
      opacity:0,
      y:20,
    },{
      opacity:1,
      y:0,
      delay:1,
      stagger:0.5,
  })},[])

  //Schedule Meeting
  const createMeeting = () => {
    
  }

  //File Selection
   const handleFile = (e:any) => {
    if (e.target.files[0]) {
      setFileUrl({
        file:e.target.files[0],
        url:URL.createObjectURL(e.target.files[0])
      })
    }
   }

  return (
    <div className='flex flex-col'>
      <div className='glassmorphism ring-remove p-4 flex-col gap-4'>
        <h1 id='text' className='text-white font-bold text-4xl flex-wrap'>Welcome back , <span className='text-color font-extrabold text-5xl'>Arnold</span></h1>
        <p id='text' className='text-white font-bold text-3xl mt-4'>No worries in study your
           <span className='text-color text-4xl font-extrabold'> all in one patner</span> has got you covered.</p>
        <p id='text' className='text-white font-bold text-3xl '> You name it from studying your notes to answering questions tailoured from it through AI  and also  gain help from friends in real time. </p>   
      </div>
      <div id="text" className='mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2'>
      <Card
       Title="Chat"
       Content="Click here so that you can chat with our AI model and learn from it as it learns from you through your notes"
        Icon="/images/brain.png"
        handleClick={() => setCardState('isUploadingFile')}
      />
      <Card
       Title="Schedule Meeting"
       Content="Here is where you can have an online class session with your peers using our video streaming service. "
        Icon="/images/brain.png"
        handleClick={() => setCardState('isSchedulingMeeting')}
      />
      <Card
       Title="Exam Room "
       Content="Would you like to test your exam skills , then you will have a blast at our question generating algorithm."
        Icon="/images/brain.png"
        handleClick={() => setCardState('isDoingExam')}
      />
      <Card
       Title="Join Meeting"
       Content="Would you like to join a meetng, enter meeting link to learn with your peers."
        Icon="/images/brain.png"
        handleClick={() => setCardState('isJoiningMeeting')}
      />
      <Modal
      isOpen={cardState === 'isUploadingFile'}
      onClose={()=> setCardState(undefined)}
      title="Upload your Document to get started "
      className='text-center'
      buttonText='Upload File'
      handleClick={()=>router}>
         <form>
          <label htmlFor='file' className='glassmorphism p-2 cursor-pointer'>
            Select Document
            <input type="file" id="file" style={{display:"none"}} onChange={handleFile}/>
          </label>
        </form>
      </Modal>
      <Modal
       isOpen={cardState === 'isSchedulingMeeting'}
       onClose={()=> setCardState(undefined)}
       title='Schedule Meeting'
       className='text-center'
       buttonText='Create Meeting'
       handleClick={createMeeting}
      />
      </div>
    </div>
  )
}

export default HomePage