import express from 'express';
import { userSignupSchema, userLoginSchema } from '../validators/user';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  try {
    const { email, name, phone, password ,address } = req.body;

    const validatedData = userSignupSchema.safeParse(req.body);
    if (!validatedData.success) {
        
        return res.status(400).json({
          msg: 'Validation failed'
        });
      }
      const result = await prisma.users.findFirst({
        where: { phone }
    });

    if (result) {
        return res.status(403).json({
            msg:"User already exists"
        })
    } else {
        const create = await prisma.users.create({
            data: {
                email,
                name,
                phone,
                address,
                password
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
      return res.status(400).json(err.errors);
    }
    res.status(500).json({ message: 'Internal server error' });
  }
});

userRouter.post('/login', async (req, res) => {
  const {email,password} = req.body;
  try {
    const validatedData = userLoginSchema.safeParse(req.body);
    if (!validatedData.success) {
        
      return res.status(400).json({
        msg: 'Validation failed'
      });
    }
    const result = await prisma.users.findUnique({
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

export default userRouter;
