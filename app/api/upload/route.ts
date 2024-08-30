import type { NextRequest } from 'next/server';
import { NextApiResponse } from 'next';
import { fileUpload } from '@/actions/embeddings';
import { auth } from '@clerk/nextjs/server';


export default async function POST(req:NextRequest, res: NextApiResponse) {
  const { userId } = auth();

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized request, signIn first' });
  }

  try {

    // const form = formidable({ multiples: true });

    // form.parse(req, async (err,files) => {
    //   if (err) {
    //     return res.status(500).json({ error: 'Error parsing file' });
    //   }
    //   const file = files.file as unknown as File;
    //   if (!file) {
    //     return res.status(400).json({ message: 'Missing filename or file' });
    //   }
    //   await fileUpload(userId,file);
    //   res.status(200).json({ message: 'File processed successfully' });
    // })
     const formData :FormData = await req.formData();
     const uploadedFile = formData.getAll('filepond');

     if(uploadedFile) {
      console.log("Uploaded file:",uploadedFile)
      if(uploadedFile instanceof File) {
        await fileUpload(userId,uploadedFile)
        res.status(201).json({message:"File processed successfully"})
      }
     }
  } catch (error) {
    console.error('Error handling file:', error);
    // Consider logging error to a centralized error tracking service
    res.status(500).json({ error: 'An error occurred while processing the file.' }); // Provide a more generic error message
  }
}
