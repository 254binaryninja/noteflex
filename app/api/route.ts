import type { NextApiRequest, NextApiResponse } from 'next';
import { fileUpload } from '@/actions/embeddings';
import FormData from 'form-data';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const formData = await req.body;
      const { userId, fileName } = formData.fields;
      const file = formData.get('file');

      // Convert file stream to buffer
      const chunks: Buffer[] = [];
      for await (const chunk of file!) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      await fileUpload(userId, fileName, fileBuffer);

      res.status(200).json({ message: 'File processed successfully' });
    } catch (error) {
      console.error('Error handling file:', error);
      res.status(500).json({ error: 'Error processing file.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
