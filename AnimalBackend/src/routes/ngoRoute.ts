import express from 'express';
import { ngoSignupSchema, ngoLoginSchema } from '../validators/ngo';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();
const ngoRouter = express.Router();

ngoRouter.post('/signup', async (req, res) => {
  try {
    const { email, org_name, phone, password ,fixed_address, upi_id , working_hours } = req.body;

    const validatedData = ngoSignupSchema.safeParse(req.body);
    if (!validatedData.success) {
        
        return res.status(400).json({
          msg: 'Validation failed'
        });
      }
      const result = await prisma.ngo.findFirst({
        where: { email }
    });

    if (result) {
        return res.status(403).json({
            msg:"NGO already exists"
        })
    } else {
        const create = await prisma.ngo.create({
            data: {
                email,
                org_name,
                phone,
                fixed_address,
                password,
                upi_id,
                working_hours
            }
        });

        const token = jwt.sign({ phone }, "sahib");
        res.json({
            msg: "Signup successful",
            token: token
        });
    }
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json("msg : ERRRRRR");
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

ngoRouter.post('/login', async (req, res) => {
  const {email,password} = req.body;
  try {
    const validatedData = ngoLoginSchema.safeParse(req.body);
    if (!validatedData.success) {
        
      return res.status(400).json({
        msg: 'Validation failed'
          });
    }
    const result = await prisma.ngo.findUnique({
      where: { email,password },
      select:{
        phone:true
      }
  });
  if (!result) {
    return res.status(403).json({
        msg:"Wrong login credentials"
    }
        );
}
const phone = result.phone

const token = jwt.sign({ phone }, "sahib");
res.json({
    msg: "Login successful",
    token: token
});


  
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json(err.errors);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default ngoRouter;
