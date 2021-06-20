import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const start = async () => {
    try {
        app.listen(port, () => console.log(`server has been started on port ${port}`));
    } catch (error) {
        throw new Error(error);
    }
}

start();