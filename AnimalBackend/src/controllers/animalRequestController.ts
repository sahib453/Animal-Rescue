import { Request, Response } from 'express';
import s3  from '../config/aws';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import { authenticateToken } from '../middlewares/authMiddle';

const prisma = new PrismaClient();

export const createAnimalRequest = async (req: Request, res: Response) => {
  const { user_phone, injury_description, animal_type } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'No file uploaded.' });
  }

  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: process.env.BUCKET_NAME!,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileStream,
    ContentType: file.mimetype,
  };

  try {
    const data = await s3.upload(uploadParams).promise();
    const imageUrl = data.Location;

    const animalRequest = await prisma.animal_requests.create({
      data: {
        user_phone,
        image_url: imageUrl,
        injury_description,
        animal_type,
        address: req.body.address || "", 
      },
    });

    res.status(201).json({ message: 'Animal request created successfully', animalRequest });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating animal request' });
  } finally {
    fs.unlinkSync(file.path); // Delete the local file after uploading to S3
  }
};
