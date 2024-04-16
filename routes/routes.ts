import { generateIssuanceRequest } from "../api/issuerTitulacionesDigitales";

const express = require("express")
const router = express.Router();

router.get('/health', async (req: any, resp: any ) => { 
    resp.status(200).send("issuerTitulacionesDigitales OK");
})

router.post('/initiateIssuanceRequest', async (req: any, resp: any ) => { 
    resp.status(200);
})

export default router;
