import express from "express"
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = parseInt(process.env.PORT,10) || 5000


async function start() {
    try {
        app.listen(port, () => {
            console.log(`server started at port: ${port}`)
        });
    } catch (error) {
        
    }
}

start();