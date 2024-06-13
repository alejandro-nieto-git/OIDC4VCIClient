import { Jwt, ProofOfPossessionCallbacks } from "@sphereon/oid4vci-common";
import { KeyLike } from "jose";
import { DIDDocument } from "did-resolver";
import * as jose from 'jose'
import { KeyObject } from "crypto";

export function generateSignCallback(privateKey: KeyLike) {
    async function signCallback(args: Jwt, kid?: string): Promise<string> {
        return await new jose.SignJWT({ ...args.payload, kid })
            .setProtectedHeader({ alg: args.header.alg, typ: 'openid4vci-proof+jwt'})
            .setIssuedAt()
            .setIssuer(kid!)
            .setAudience(args.payload.aud!)
            .setExpirationTime('2h')
            .sign(privateKey);
    }

    return signCallback;
}

export function hexToUint8Array(hex: string): Uint8Array {
    if (hex.length % 2 !== 0) throw new Error('Invalid hex string');
    const array = new Uint8Array(hex.length / 2);
    for (let i = 0; i < hex.length; i += 2) {
      array[i / 2] = parseInt(hex.substr(i, 2), 16);
    }
    return array;
  }