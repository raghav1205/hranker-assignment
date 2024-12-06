import express  from "express";
import authenticate from './routes/authenticate'
import dashboard from './routes/dashboard'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1', authenticate);
app.use('/api/v1', dashboard);


const connectDb = async () => {
  await mongoose.connect(
    "mongodb+srv://raghav:superpassword@cluster0.h5ctc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
};
connectDb();

app.listen(3000, () => {
    console.log('server running on port 3000');
})
