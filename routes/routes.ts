import { Jwt, ProofOfPossessionCallbacks } from '@sphereon/oid4vci-common';
import { WalletTitulacionesDigitalesUVa } from '../api/walletTitulacionesDigitales';
import { generateSignCallback } from '../utils/utils';
import { DIDDocument } from 'did-resolver';
import { debug } from "debug";
import { hexToUint8Array } from '../utils/utils';
import { importJWK, JWK, KeyLike} from 'jose';
import { ec as EC } from 'elliptic';



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
        const privateKeyBuffer = Buffer.from(process.env.USER_PRIVATE_KEY!.slice(2), 'hex');

        const ec = new EC('secp256k1');
        const key = ec.keyFromPrivate(privateKeyBuffer);

        const pubPoint = key.getPublic();
        const x = pubPoint.getX().toArrayLike(Buffer, 'be', 32);
        const y = pubPoint.getY().toArrayLike(Buffer, 'be', 32);

        const privateKeyJWK: JWK = {
            kty: 'EC',
            crv: 'secp256k1',
            x: Buffer.from(x).toString('base64url'),
            y: Buffer.from(y).toString('base64url'),
            d: privateKeyBuffer.toString('base64url')
        };
        
        var privateKey = await importJWK(privateKeyJWK, 'ES256K') as KeyLike;

        let keysToDids = new Map<KeyLike, string>();
        keysToDids.set(privateKey, process.env.USER_DID!);
        wallet = new WalletTitulacionesDigitalesUVa([privateKey], keysToDids);
        wallet.setActiveKey(privateKey);

        await wallet.initiateIssuance(req.body.oidcURI);
        resp.status(201);
        resp.end();
    
   } catch (error) {
        console.log(error);
   } 
})

router.post('/tokenRequest', async (req: any, resp: any) => { 
    try {
        wallet.tokenRequest(req.body.pin);
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

export default router;
