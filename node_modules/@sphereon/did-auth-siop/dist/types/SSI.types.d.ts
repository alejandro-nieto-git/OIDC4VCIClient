import { JWTVerifyOptions } from 'did-jwt';
import { DIDDocument as DIFDIDDocument, Resolvable } from 'did-resolver';
export interface ResolveOpts {
    jwtVerifyOpts?: JWTVerifyOptions;
    resolver?: Resolvable;
    resolveUrl?: string;
    noUniversalResolverFallback?: boolean;
    subjectSyntaxTypesSupported?: string[];
}
export interface LinkedDataProof {
    type: string;
    created: string;
    creator: string;
    nonce: string;
    signatureValue: string;
}
export interface DIDDocument extends DIFDIDDocument {
    owner?: string;
    created?: string;
    updated?: string;
    proof?: LinkedDataProof;
}
