'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Modal from '@/components/Modal';
import Card from '@/components/Card';
import { fileUpload } from '@/actions/embeddings';


const HomePage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [cardState, setCardState] = useState<'isUploadingFile' | 'isJoiningMeeting' | 'isSchedulingMeeting' | 'isDoingExam' | undefined>();
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const { userId } = useAuth();
  const { user } = useUser();
  const [meetingValues, setMeetingValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });

  useGSAP(() => {
    gsap.fromTo("#text", {
      opacity: 0,
      y: 20,
    }, {
      opacity: 1,
      y: 0,
      delay: 1,
      stagger: 0.5,
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      toast({ title: 'File Selected' });
    } else {
      toast({ title: 'Try selecting file again' });
    }
  };

  // Pass FILE TO server using post request
  const handleFileUpload = async () => {
    try {
      // const form = new FormData();
      // form.append('file', file as File);
      // console.log(form)
      setLoading(true)
  //     const response =  await fetch('https://api.apyhub.com/extract/text/pdf-file',{
  //      method:'POST',
  //      headers: {
  //       'Content-Type': 'multipart/form-data',
  //       'apy-token': 'APY0cJ8Ja52WJ4Qdk28MRlWb8rRsm3Sdu0UyKv1nXxLEuwXVqxEUPccmx3oaDK1W7AkESn'
  //     },
  //      body:form,     
  //  });
  if(file && userId){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = async() => {
      const textfile = reader.result?.toString().split(',')[1];
      // Send base64String and other data (userId, fileName) to the server using your preferred method (e.g., fetch)
    if(textfile)  
    await fileUpload(userId,file.name,textfile)
    setLoading(false)
    router.push('/chatset')
    toast({title:'PDF proccesed successfully !'})
    };
    
    
  }
  
    }catch(error){
    console.log("Error passing file : ", error)
    toast({title:'Error passing file'})
    setLoading(false)
    }
 
  }

  return (
    <div className='flex flex-col'>
      <div className='glassmorphism ring-remove p-4 flex-col gap-4'>
        <h1 id='text' className='text-white font-bold text-4xl flex-wrap'>Welcome back, <span className='text-color font-extrabold text-5xl'>{user?.username}</span></h1>
        <p id='text' className='text-white font-bold text-3xl mt-4'>No worries in study your
          <span className='text-color text-4xl font-extrabold'> all in one partner</span> has got you covered.</p>
        <p id='text' className='text-white font-bold text-3xl '>You name it from studying your notes to answering questions tailored from it through AI and also gain help from friends in real-time.</p>
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
          Content="Here is where you can have an online class session with your peers using our video streaming service."
          Icon="/images/brain.png"
          handleClick={() => setCardState('isSchedulingMeeting')}
        />
        <Card
          Title="Exam Room"
          Content="Would you like to test your exam skills, then you will have a blast at our question generating algorithm."
          Icon="/images/brain.png"
          handleClick={() => setCardState('isDoingExam')}
        />
        <Card
          Title="Join Meeting"
          Content="Would you like to join a meeting, enter meeting link to learn with your peers."
          Icon="/images/brain.png"
          handleClick={() => setCardState('isJoiningMeeting')}
        />
        <Modal
          isOpen={cardState === 'isUploadingFile'}
          onClose={() => setCardState(undefined)}
          title="Upload your Document to get started"
          className='text-center'
          buttonText={loading ? 'Processing....' : 'Upload PDF'}
          loading={loading}
          handleClick={handleFileUpload}>
          <form>
            <label htmlFor='file' className='glassmorphism p-2 cursor-pointer'>
              Select PDF
              <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
            </label>
          </form>
        </Modal>
        <Modal
          isOpen={cardState === 'isSchedulingMeeting'}
          onClose={() => setCardState(undefined)}
          title='Schedule Meeting'
          className='text-center'
          buttonText='Create Meeting'
          handleClick={() => {/* Meeting creation logic */}}
        />
      </div>
    </div>
  );
};

export default HomePage;
