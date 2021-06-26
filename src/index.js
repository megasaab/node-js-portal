import express from "express"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { router } from "./router";
dotenv.config();

const app = express()
const port = parseInt(process.env.PORT,10) || 5000
const dbUrl = process.env.DB_URL;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);

const start = async ()=> {
    try {
        await mongoose.connect(dbUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            connectTimeoutMS: 1000
          });
        app.listen(port, () => {
            console.log(`server started at port: ${port}`)
        });
    } catch (error) {
        
    }
}

start();