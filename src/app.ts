import express, {Application , Request, Response} from "express";
import http from "http";
import nodemailer from 'nodemailer';
const app: Application = express();
const server = http.createServer(app);
const router = require('./routes/index');
import multer from 'multer';
const sharp = require('sharp');
import {User, UserDocument} from "./models/user.model";
import {debuglog} from "util";
import {imgUpload} from "./middleware/imgUpload";
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

// File uploads

// Processes data and passes it through to the request



// Set the buffer as a db property

app.post('/upload', imgUpload.single('upload'), async (req: Request, res: Response) => {
    const buffer = await sharp(req.file.buffer).png().toBuffer();
    // console.log(buffer);
    // req.file.buffer
    // Set this buffer as an img property of an artist
    res.send('heeeyyyy')
});

// NEED LOGIC TO DISCOVER

router.get('/artist/:id/img', async (req: Request, res: Response) => {
    const user = await User.findById(req.params.id, async (err, user: UserDocument) => {
        if (!user || user.passwordResetToken){
            res.status(500).send({Error: 'User image not found'});
        }
        res.set('Content-Type', 'image/png');
        // res.send image
    })
})

// Dev

const PORT = 5000;
server.listen(PORT);
server.on("listening", () => {
    console.info("Server listening on port: "+PORT);
});