import { Router, Request, Response } from 'express';
import prisma from '../config/prisma';
import { authenticateToken } from '../middlewares/authMiddle';

interface AuthenticatedRequest extends Request {
    phone?: string;
}

const authRouter = Router();

authRouter.get('/me', authenticateToken, async (req: AuthenticatedRequest, res: Response) => {
  const phone = req.phone;

  if (!phone) {
    return res.status(400).json({ msg: 'Phone is missing from the token.' });
  }

  try {
    const user = await prisma.users.findFirst({
      where: {
        phone
      },
      select: {
        address: true,
        email : true
      },
    });

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    res.json({
      phone,
      email:user.email,
      address: user.address, 
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ msg: 'An error occurred while fetching user data.' });
  }
});
authRouter.get('/ngome',authenticateToken,async(req:AuthenticatedRequest , res:Response)=>{
  const phone = req.phone;
  if (!phone) {
    return res.status(400).json({ msg: 'Phone is missing from the token.' });
  }

  try {
    const ngo = await prisma.ngo.findFirst({
      where: {
        phone
      },
      select: {
        fixed_address: true,
        email:true,
        org_name:true
      },
    });
    console

    if (!ngo) {
      return res.status(404).json({ msg: 'Ngo not found.' });
    }

    res.json({
      phone,
      fixed_address: ngo.fixed_address, 
      email:ngo.email,
      org_name:ngo.org_name
    });
  } catch (error) {
    console.error('Error fetching ngo:', error);
    res.status(500).json({ msg: 'An error occurred while fetching ngo data.' });
  }




})


export default authRouter;
