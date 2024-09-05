import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';
import { authenticateToken } from '../middlewares/authMiddle';

const getReq = Router();

interface AuthenticatedRequest extends Request {
    phone?: string; 
}

getReq.get('/getReq', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const phone = req.phone;

        if (!phone) {
            return res.status(400).json({ error: 'Phone not provided.' });
        }
        const user = await prisma.users.findUnique({
            where:{phone:phone},
            
        })
        if (!user) {
            return res.status(404).json({ error: 'User phone not found.' });
        }

        const requests = await prisma.animal_requests.findMany({
            where: {
                user_phone: user.phone
            }
        });

        return res.json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the requests.' });
    }
});

export default getReq;
