import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const awsRoutes = express.Router();

const s3Bucket = 'ptangatuestorage';
const accessKeyId = process.env['AWS_ACCESS_KEY'];
const secretAccessKey = process.env['AWS_SECRET_KEY'];

if (!accessKeyId || !secretAccessKey) {
  throw new Error(
    'AWS_ACCESS_KEY and AWS_SECRET_KEY environment variables must be set'
  );
}

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

// Retrieve image from S3 and return as base64 data URL
awsRoutes.get(
  '/images/:filename',
  async (req: Request<{ filename: string }>, res: Response): Promise<void> => {
    const { filename } = req.params;
    const params = {
      Bucket: s3Bucket,
      Key: filename,
    };

    try {
      const data = await s3Client.send(new GetObjectCommand(params));
      if (!data.Body) {
        res.status(404).json({ error: 'Image not found' });
        return;
      }
      const buffer = await data.Body.transformToString('base64');
      const contentType = data.ContentType ?? 'image/jpeg';
      const imageSource = `data:${contentType};base64,${buffer}`;
      res.json({ imageSource });
    } catch (err) {
      console.error('Error fetching image from S3:', err);
      res.status(500).json({ error: 'Failed to retrieve image' });
    }
  }
);

export default awsRoutes;
