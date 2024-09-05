import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';
import { authenticateToken } from '../middlewares/authMiddle';

const delReq = Router();

interface AuthenticatedRequest extends Request {
    phone?: string;
}

delReq.delete('/delReq', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const id = parseInt(req.query.id as string);

    try {
        const phone = req.phone;

        if (!phone) {
            return res.status(400).json({ error: 'Phone not provided.' });
        }

        const request = await prisma.animal_requests.findUnique({
            where: {
                request_id: id
            },
            select: {
                user_phone: true
            }
        });

        if (!request) {
            return res.status(404).json({ error: 'Request not found.' });
        }

        if (phone !== request.user_phone) {
            return res.status(403).json({ error: 'You are not authorized to delete this request.' });
        }

        await prisma.animal_requests.delete({
            where: {
                request_id: id
            }
        });

        return res.json({ message: 'Request deleted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while deleting the request.' });
    }
});

export default delReq;
