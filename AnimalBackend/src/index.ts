import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './routes/userRoute'
import ngoRouter from './routes/ngoRoute'
import authRouter from './routes/authRoute'
import animalRouter from './routes/animalRoute'
import getNgo from './routes/getNgo'
import getReq from './routes/animalRequests'
import delReq from './routes/deleteReq'
import getReqNgo from './routes/animalReqNgo'
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/user',userRouter,getReq,delReq,authRouter);
app.use('/api/ngo',ngoRouter,authRouter,getReqNgo);
app.use('/api',animalRouter,getNgo)



const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
