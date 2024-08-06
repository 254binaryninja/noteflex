import type { NextApiRequest, NextApiResponse } from 'next';
import { fileUpload } from '@/actions/embeddings';
import { auth } from '@clerk/nextjs/server';
import formidable from 'formidable';


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req:NextApiRequest, res: NextApiResponse) {
  const { userId } = auth();

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized request, signIn first' });
  }

  try {
    const form = formidable({ multiples: true });

    form.parse(req, async (err,files) => {
      if (err) {
        return res.status(500).json({ error: 'Error parsing file' });
      }
      const file = files.file as unknown as File;
      const fileName = file.name;

      if (!fileName || !file) {
        return res.status(400).json({ message: 'Missing filename or file' });
      }
      await fileUpload(userId, fileName, file);
      res.status(200).json({ message: 'File processed successfully' });
    })

  
  } catch (error) {
    console.error('Error handling file:', error);
    // Consider logging error to a centralized error tracking service
    res.status(500).json({ error: 'An error occurred while processing the file.' }); // Provide a more generic error message
  }
}
