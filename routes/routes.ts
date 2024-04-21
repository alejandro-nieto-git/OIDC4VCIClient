import { WalletTitulacionesDigitalesUVa } from '../api/walletTitulacionesDigitales';

const express = require("express");
import jose from 'jose';
const router = express.Router();

let wallet: WalletTitulacionesDigitalesUVa;

router.get('/health', async (req: any, resp: any ) => { 
    resp.status(200).send("issuerTitulacionesDigitales OK");
})

router.post('/initiateIssuance', async (req: any, resp: any ) => { 
    var { privateKey, publicKey } = await jose.generateKeyPair('ES256');
    wallet = new WalletTitulacionesDigitalesUVa([{privateKey, publicKey}], ["did:ethr:0x123456789abcdefghi"]);
    wallet.initiateIssuance(req.body.oidcURI);
    resp.status(200);
})

router.post('/tokenRequest', async (req: any, resp: any) => { 
    wallet.tokenRequest(req.body.pin);
    resp.status(200);
})

export default router;
