import { Jwt, ProofOfPossessionCallbacks } from '@sphereon/oid4vci-common';
import { WalletTitulacionesDigitalesUVa } from '../api/walletTitulacionesDigitales';
import { generateSignCallback } from '../utils/utils';
import jose from 'jose';
import { KeyLike } from 'jose';
import { DIDDocument } from 'did-resolver';
import { debug } from "debug";

const debugLog = debug("Routes:debug ");

const express = require("express");
const router = express.Router();

let wallet: WalletTitulacionesDigitalesUVa;

router.get('/health', async (req: any, resp: any ) => { 
    resp.status(200).send("issuerTitulacionesDigitales OK");
})

router.post('/initiateIssuance', async (req: any, resp: any ) => { 
    try {
        debugLog(req.body);
        var privateKey = process.env.USER_PRIVATE_KEY! as unknown as KeyLike;
        let did = process.env.USER_DID;
        wallet = new WalletTitulacionesDigitalesUVa([privateKey], { privateKey: process.env.USER_DID });
        wallet.setActiveDid(privateKey!);

        wallet.initiateIssuance(req.body.oidcURI);
        resp.status(200);
    
   } catch (error) {
        console.log(error);
   } 
})

router.post('/tokenRequest', async (req: any, resp: any) => { 
    wallet.tokenRequest(req.body.pin);
    resp.status(200);
})

export default router;
