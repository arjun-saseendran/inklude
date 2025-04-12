import express from 'express';
import dotenv from 'dotenv';


const app = express();
PORT = process.env.PORT;

app.use(express.json());

app.listen(PORT,`Server running on port ${PORT}`)

