'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useUser } from '@clerk/nextjs';
import gsap from 'gsap';
import { cn } from '@/lib/utils';
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useGSAP } from '@gsap/react';
import Modal from '@/components/Modal';
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import Card from '@/components/Card';


const HomePage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>();
  const  client = useStreamVideoClient();
  const [file, setFile] = useState<File|null>(null);
  const { toast } = useToast();
  const [cardState, setCardState] = useState<'isUploadingFile' | 'isJoiningMeeting' | 'isSchedulingMeeting' | 'isDoingExam' | undefined>();
  const { user } = useUser();
  const [date,setDate] = useState<Date>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });
  const [callDetails,setCallDetails] = useState<Call>();

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

//Create handle file change function
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  setFile(file);
};

// Create handle file upload function to upload file to server
const handleFileUpload = async () => {
  if (!file) return;
  setLoading(true);
  const formData = new FormData();
  formData.append('file', file);
};

// Create meeting functionality
   const createMeeting = async ()=>{
    if(!client || !user) return;

    try{
    if(!values.dateTime){
      toast({title:'Please select a date and time'})
    }
     
    const id = crypto.randomUUID();
    const call = client.call('default',id);

    if(!call) throw new Error("Failed to Initialize call");
    const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
    const description = values.description || "Instant Meeting";

    await call.getOrCreate({
      data:{
        starts_at:startsAt,
        custom:{
          description
        }
      }
    })
    setCallDetails(call);

    if(!values.description) {
      router.push(`/meeting/${call.id}`);
    }
    toast({title:'Meeting created successfully'})
    }catch(error){
      console.log(error)
      toast({title:'Failed to create Meeting'})
    }
   }

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`


  return (
    <div className='flex flex-col'>
      <div className='glassmorphism ring-remove p-4 flex-col gap-4'>
        <h1 id='text' className='text-white font-bold text-4xl flex-wrap'>Welcome back, <span className='text-color font-extrabold text-5xl'>{user?.firstName}</span></h1>
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
          Icon="/icons/add-meeting.svg"
          handleClick={() => setCardState('isSchedulingMeeting')}
        />
        <Card
          Title="Exam Room"
          Content="Would you like to test your exam skills, then you will have a blast at our question generating algorithm."
          //Icon="/images/brain.png"
          handleClick={() => setCardState('isDoingExam')}
        />
        <Card
          Title="Join Meeting"
          Content="Would you like to join a meeting, enter meeting link to learn with your peers."
          Icon="/icons/join-meeting.svg"
          handleClick={() => setCardState('isJoiningMeeting')}
        />
        <Modal
          isOpen={cardState === 'isUploadingFile'}
          onClose={() => setCardState(undefined)}
          title="Upload your Document to get started"
          className='text-center'
          buttonText={loading ? 'Processing....' : 'Upload PDF'}
          loading={loading}
          handleClick={handleFileUpload}
           >
          <form>
            <label htmlFor='file' className='glassmorphism p-2 cursor-pointer'>
              Select PDF
              <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
            </label>
          </form>
        </Modal>

        {!callDetails ? (
           <Modal
           isOpen={cardState === 'isSchedulingMeeting'}
           onClose={()=>setCardState(undefined)}
           title="Create Meeting"
           buttonText='Create'
           handleClick={createMeeting}
           >
             <div className="flex flex-col gap-2.5">
                <label className="text-base font-normal leading-[22px] text-sky-2">Add a description</label>
                <Textarea className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
                onChange={(e)=>{setValues({...values,description:e.target.value})}}
                />
             </div>
             <div className="flex w-full flex-col gap-2.5">
             <label className="text-base font-normal leading-[22px] text-sky-2">Select Date and Time</label>
             <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal text-black",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
             </div>
           </Modal>
         ):(
          <Modal
          isOpen={cardState === 'isSchedulingMeeting'}
          onClose={()=>setCardState(undefined)}
          title="Meeting Created"
          className="text-center"
          buttonText="Copy meeting Link"
          handleClick={()=>{navigator.clipboard.writeText(meetingLink)
          toast({title:"Link Copied"})}}
          image="/icons/checked.svg" 
          buttonIcon="/icons/copy.svg"    
          />
         )}

     <Modal
      isOpen={cardState === 'isJoiningMeeting'}
      onClose={()=>setCardState(undefined)}
      title="Type the link here"
      className="text-center"
      buttonText="Join  Meeting"
      handleClick={()=>router.push(values.link)}
      >
      <Textarea
       placeholder='Meeting Link'
       onChange={(e)=>{setValues({...values,link:e.target.value})}}
       className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
      />
      </Modal>
      </div>
    </div>
  );
};

export default HomePage;
