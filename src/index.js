import express from "express"
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const app = express()
const port = parseInt(process.env.PORT,10) || 5000
const dbUrl = process.env.DB_URL;


async function start() {
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