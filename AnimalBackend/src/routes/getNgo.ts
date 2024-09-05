import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';

const getNgo = Router();

getNgo.get('/ngos', async (req: Request, res: Response) => {
  try {
    const ngos = await prisma.ngo.findMany({
      select: {
        org_name: true,
        fixed_address: true,
        working_hours: true,
        upi_id: true,
        phone: true,
        email: true,
      },
    });
    res.json(ngos);
  } catch (error) {
    console.error('Error fetching NGOs:', error);
    res.status(500).json({ msg: 'An error occurred while fetching NGOs.' });
  }
});

export default getNgo;
