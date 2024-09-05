import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';
import { authenticateToken } from '../middlewares/authMiddle';

const getReqNgo = Router();

interface AuthenticatedRequest extends Request {
    phone?: string; 
    orgname?:string
}

getReqNgo.get('/getReq', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const phone = req.phone;
        const status = req.query.status;

        if (!phone) {
            return res.status(400).json({ error: 'Phone not provided.' });
        }
        const data = await prisma.ngo.findFirst({
            where:{phone},
            select:{
                org_name:true
            }
        })

        

        const requests = await prisma.animal_requests.findMany({
            where: {
                request_status: false,  
            },
        });

        return res.json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the requests.' });
    }
});


getReqNgo.get('/getReqTrue', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const phone = req.phone;
        const org_name = req.headers['x-custom-header'] as string
        console.log(org_name)

        if (!phone) {
            return res.status(400).json({ error: 'Phone not provided.' });
        }

        const requests = await prisma.animal_requests.findMany({
            where: {
                request_status: true,
                org_name : org_name
            },
        });

        return res.json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while fetching the requests.' });
    }
});

getReqNgo.get('/acceptReq', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
    const id = parseInt(req.query.id as string) 
    const phone = req.phone;

    if (!id || !phone) {
        return res.status(400).json({ error: 'Request ID is required.' });
    }

    try {
        const animal = await prisma.animal_requests.findUnique({
            where: {
                request_id: id,
            },
        });

        if (!animal) {
            return res.status(404).json({ error: 'Request not found.' });
        }

        if (animal.request_status) {
            return res.status(403).json({ msg: 'Request is already assigned to another NGO.' });
        }

        const ngo = await prisma.ngo.findFirst({
            where: {
                phone: phone,
            },
            select: {
                org_name: true,
            },
        });

        if (!ngo) {
            return res.status(404).json({ error: 'NGO not found.' });
        }

        await prisma.animal_requests.update({
            where: {
                request_id: id,
            },
            data: {
                request_status: true, 
                org_name: ngo.org_name, 
            },
        });

        return res.json({ msg: 'Request accepted successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while accepting the request.' });
    }
});

export default getReqNgo;
