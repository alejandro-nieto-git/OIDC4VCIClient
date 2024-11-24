import { JWK } from '../types';
export declare const isEd25519DidKeyMethod: (did?: string) => boolean;
export declare function calculateJwkThumbprintUri(jwk: JWK, digestAlgorithm?: 'sha256' | 'sha384' | 'sha512'): Promise<string>;
