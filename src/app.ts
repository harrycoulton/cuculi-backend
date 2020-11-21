import express, {Application , Request, Response} from "express";
import http from "http";
const app: Application = express();
const server = http.createServer(app);
const router = require('./routes/index');
require('dotenv').config();

// Auth

const passport = require('passport');

/* PASSPORT LOCAL AUTHENTICATION */

app.use(passport.initialize());
app.use(passport.session());

// Middleware

app.use(express.json());

// Routing

app.use(router);

// DB

const db = require( './database/mongoose');

// Dev

const PORT = 5000;
server.listen(PORT);
server.on("listening", () => {
    console.info("Server listening on port: "+PORT);
});