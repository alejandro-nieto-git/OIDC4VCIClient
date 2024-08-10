const express = require("express")
const morgan = require("morgan")
import router from "../routes/routes"
import session from "express-session";
import * as path from 'node:path';
import dotenv from 'dotenv';
import { PORT } from "../utils/const";
import fs from 'fs';
import https from 'https';
import http from 'http';
import cors from 'cors';

dotenv.config();

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
  }));


// Logging
app.use(morgan("dev"))

/** Parse the request */
app.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
app.use(express.json());

/** ExpressJS session */
app.use(session({
    // TODO: this is only for demo purposes.
    secret: "verySecretSecret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,            //setting this false for http connections
    },
    name: "issuerTitulaciones"
}))

/** Routes */
app.use("/", router)

/** Error handling */
app.use((req: any, res: any, next: any) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Backend wallet de titulaciones digitales desplegado en: http://localhost:${PORT}`);
});