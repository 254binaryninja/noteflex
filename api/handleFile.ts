import type { NextApiRequest, NextApiResponse } from 'next';
import { fileUpload } from '@/actions/embeddings';
import { IncomingForm } from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

const parseForm = async (req: NextApiRequest): Promise<{ fields: any; files: any }> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err: any, fields: any, files: any) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { fields, files } = await parseForm(req);
      const { userId, fileName } = fields;
      const file = files.file[0];

      const fileBuffer = fs.readFileSync(file.filepath);
      await fileUpload(userId, fileName, fileBuffer);

      res.status(200).json({ message: 'File processed successfully' });
    } catch (error) {
      console.log('Error handling file:', error);
      res.status(500).json({ error: 'Error processing text.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
