const express = require("express")
const morgan = require("morgan")
import router from "../routes/routes"
import session from "express-session";
import * as path from 'node:path';
import dotenv from 'dotenv';
import { PORT } from "../utils/const";
import fs from 'fs';
import https from 'https';

dotenv.config();

const app = express()

// Specify SSL/TLS options
const options = {
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
};

// Logging
app.use(morgan("dev"))

/** Parse the request */
app.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
app.use(express.json());

/** RULES OF OUR API */
router.use((req: any, res: any, next: any) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

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

const server = https.createServer(options, app);
server.listen(PORT, () => {
    console.log(`Backend wallet de titulaciones digitales desplegado en: https://localhost:${PORT}`);
});