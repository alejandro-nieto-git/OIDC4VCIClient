import { Jwt, ProofOfPossessionCallbacks } from '@sphereon/oid4vci-common';
import { WalletTitulacionesDigitalesUVa } from '../api/walletTitulacionesDigitales';
import { generateSignCallback } from '../utils/utils';
import { DIDDocument } from 'did-resolver';
import { debug } from "debug";
import { hexToUint8Array } from '../utils/utils';
import { importJWK, JWK, KeyLike} from 'jose';
import { ec as EC } from 'elliptic';
import { privateKeyToKeyLike } from '../utils/func';


const debugLog = debug("Routes:debug ");

const express = require("express");
const router = express.Router();

let wallet: WalletTitulacionesDigitalesUVa;
initializeWallet();

async function initializeWallet(){
    var privateKey = await privateKeyToKeyLike(process.env.USER_PRIVATE_KEY!);

    let keysToDids = new Map<KeyLike, string>();
    keysToDids.set(privateKey, process.env.USER_DID!);
    wallet = new WalletTitulacionesDigitalesUVa([privateKey], keysToDids);
    wallet.setActiveKey(privateKey);
}

router.get('/health', async (req: any, resp: any ) => { 
    resp.status(200).send("issuerTitulacionesDigitales OK");
})

router.post('/initiateIssuance', async (req: any, resp: any ) => { 
    try {
        debugLog(req.body);
        
        await wallet.initiateIssuance(req.body.oidcURI);
        resp.status(201);
        resp.end();
    
   } catch (error) {
        console.log(error);
   } 
})

router.post('/tokenRequest', async (req: any, resp: any) => { 
    try {
        await wallet.tokenRequest(req.body.pin);
        resp.status(201);
        resp.end();
    } catch (error) {
        console.log(error);
        resp.send(error);
        resp.status(400);
        resp.end();
        
    }
})

router.post('/credentialRequest', async (req: any, resp: any) => { 
    try {
        resp.json(await wallet.credentialRequest());
        resp.status(201);
        resp.end();
    } catch (error) {
        console.log(error);
        resp.send(error);
        resp.status(400);
        resp.end();
        
    }
})

router.post('/requestSIOPResponse', async (req: any, resp: any) => { 
    try {
        resp.json(await wallet.generateSIOPResponse(req.body.authRequestURI));
        resp.status(201);
        resp.end();
    } catch (error) {
        console.log(error);
        resp.send(error);
        resp.status(400);
        resp.end();
    }
})

export default router;
