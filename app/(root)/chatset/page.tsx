"use client"

import Loading from '@/components/Loading'
import React, { useState, useEffect } from 'react'
import gsap from 'gsap'
import { createClient, SupabaseClient } from "@supabase/supabase-js"
import { useGSAP } from '@gsap/react'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import Card from '@/components/Card'
import { PlusCircle } from 'lucide-react'

interface FileName {
  file_name: string;
}

const Chat = () => {
  // States
  const { userId } = useAuth()
  const [fileNames, setFileNames] = useState<FileName[]>([])
  const [loading, setLoading] = useState(true)
  const [result, setResult] = useState<boolean>(true)
  const router = useRouter()

  // Supabase client state
  const [supabaseClient, setSupabaseClient] = useState<SupabaseClient | null>(null)

  // Initialize Supabase client
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL && process.env.NEXT_PUBLIC_SUPABASE_API_KEY) {
      try {
        const client = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,
          process.env.NEXT_PUBLIC_SUPABASE_API_KEY
        )
        setSupabaseClient(client)
      } catch (error) {
        console.error('Error initializing Supabase client:', error)
      }
    }
  }, [])

  //Animations
  useGSAP(() => {
    gsap.fromTo('#card', {
      opacity: 0,
      y: 0,
    }, {
      opacity: 1,
      y: 20,
      delay: 1,
      stagger: 0.5,
    })
  }, [])

  //Functions
  const fetchUserFiles = async (user: string): Promise<FileName[]> => {
    if (!supabaseClient) {
      throw new Error('Supabase client is not initialized')
    }

    const { data, error } = await supabaseClient
      .from('embeddings')
      .select('file_name')
      .eq('user_id', user)

    if (error) {
      console.error('Error fetching filenames:', error)
      throw error
    }
    return data
  }

  const getFiles = async () => {
    if (userId) {
      try {
        const files = await fetchUserFiles(userId)
        if (files) {
          setFileNames(files)
          setResult(false)
        }
      } catch (error) {
        console.error('Error getting files:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  // Get the files
  useEffect(() => {
    getFiles()
  }, [userId, supabaseClient])

  return (
    <div className='flex flex-col gap-6'>
      <div className='m-4 p-3 justify-items-center'>
        <p id='card' className='text-5xl font-medium text-white/55 p-2'>
          Here are your PDFs, let's get learning.
        </p>
      </div>
      {result ?
        <div className='flex-center'>
          <p id='card' className='font-extrabold text-white text-5xl max-sm:hidden'>
            You currently haven't uploaded any PDF file for study
          </p>
          <PlusCircle id='card' className='text-white/30 cursor-pointer' size={'20%'} onClick={() => router.push('/home')} />
        </div> :
        <div id='card' className='mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-2'>
          {/* Function with card that map over the already uploaded files */}
          {loading ? <Loading /> :
            fileNames.map((file, i) =>
              <Card
                key={i}
                Title={file.file_name}
                Content='Click here to simplify your study'
                handleClick={() => router.push(`/chat/${file.file_name}`)}
              />
            )
          }
        </div>
      }
    </div>
  )
}

export default Chat
