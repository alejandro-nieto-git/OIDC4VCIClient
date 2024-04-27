import { Jwt, ProofOfPossessionCallbacks } from "@sphereon/oid4vci-common";
import { KeyLike } from "jose";
import { DIDDocument } from "did-resolver";
import jose from "jose";

export function generateSignCallback(privateKey: KeyLike) {
    async function signCallback(args: Jwt, kid?: string): Promise<string> {
        return await new jose.SignJWT({ ...args.payload })
            .setProtectedHeader({ alg: args.header.alg })
            .setIssuedAt()
            .setIssuer(kid!)
            .setAudience(args.payload.aud!)
            .setExpirationTime('2h')
            .sign(privateKey);
    }

    return signCallback;
}