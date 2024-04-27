import { Jwt, ProofOfPossessionCallbacks } from '@sphereon/oid4vci-common';
import { WalletTitulacionesDigitalesUVa } from '../api/walletTitulacionesDigitales';
import { generateSignCallback } from '../utils/utils';

const express = require("express");
import jose from 'jose';
import { DIDDocument } from 'did-resolver';
const router = express.Router();

let wallet: WalletTitulacionesDigitalesUVa;

router.get('/health', async (req: any, resp: any ) => { 
    resp.status(200).send("issuerTitulacionesDigitales OK");
})

router.post('/initiateIssuance', async (req: any, resp: any ) => { 
    var { privateKey, publicKey } = await jose.generateKeyPair('ES256');
    wallet = new WalletTitulacionesDigitalesUVa([{privateKey, publicKey}]);
    wallet.setActiveDid(privateKey);

    wallet.initiateIssuance(req.body.oidcURI);
    resp.status(200);
})

router.post('/tokenRequest', async (req: any, resp: any) => { 
    wallet.tokenRequest(req.body.pin);
    resp.status(200);
})

export default router;
