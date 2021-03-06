import express, {Application , Request, Response} from "express";
import http from "http";
import nodemailer from 'nodemailer';
const app: Application = express();
const server = http.createServer(app);
const router = require('./routes/index');
require('dotenv').config();

// Middleware

app.use(express.json());

// Routing

app.use(router);

// DB

const db = require( './database/mongoose');

// Mail

export const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "string",
        pass: "string"
    }
});

// Dev

const PORT = 5000;
server.listen(PORT);
server.on("listening", () => {
    console.info("Server listening on port: "+PORT);
});