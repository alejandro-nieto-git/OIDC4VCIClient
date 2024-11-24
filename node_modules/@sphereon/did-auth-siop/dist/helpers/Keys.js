"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateJwkThumbprintUri = exports.isEd25519DidKeyMethod = void 0;
// import { keyUtils as ed25519KeyUtils } from '@transmute/did-key-ed25519';
// import { ec as EC } from 'elliptic';
const u8a = __importStar(require("uint8arrays"));
const ED25519_DID_KEY = 'did:key:z6Mk';
const isEd25519DidKeyMethod = (did) => {
    return did && did.includes(ED25519_DID_KEY);
};
exports.isEd25519DidKeyMethod = isEd25519DidKeyMethod;
/*
export const isEd25519JWK = (jwk: JWK): boolean => {
  return jwk && !!jwk.crv && jwk.crv === KeyCurve.ED25519;
};

export const getBase58PrivateKeyFromHexPrivateKey = (hexPrivateKey: string): string => {
  return bs58.encode(Buffer.from(hexPrivateKey, 'hex'));
};

export const getPublicED25519JWKFromHexPrivateKey = (hexPrivateKey: string, kid?: string): JWK => {
  const ec = new EC('ed25519');
  const privKey = ec.keyFromPrivate(hexPrivateKey);
  const pubPoint = privKey.getPublic();

  return toJWK(kid, KeyCurve.ED25519, pubPoint);
};

const getPublicSECP256k1JWKFromHexPrivateKey = (hexPrivateKey: string, kid: string) => {
  const ec = new EC('secp256k1');
  const privKey = ec.keyFromPrivate(hexPrivateKey.replace('0x', ''), 'hex');
  const pubPoint = privKey.getPublic();
  return toJWK(kid, KeyCurve.SECP256k1, pubPoint);
};

export const getPublicJWKFromHexPrivateKey = (hexPrivateKey: string, kid?: string, did?: string): JWK => {
  if (isEd25519DidKeyMethod(did)) {
    return getPublicED25519JWKFromHexPrivateKey(hexPrivateKey, kid);
  }
  return getPublicSECP256k1JWKFromHexPrivateKey(hexPrivateKey, kid);
};

const toJWK = (kid: string, crv: KeyCurve, pubPoint: EC.BN) => {
  return {
    kid,
    kty: KeyType.EC,
    crv: crv,
    x: base64url.toBase64(pubPoint.getX().toArrayLike(Buffer)),
    y: base64url.toBase64(pubPoint.getY().toArrayLike(Buffer))
  };
};

// from fingerprintFromPublicKey function in @transmute/Ed25519KeyPair
const getThumbprintFromJwkDIDKeyImpl = (jwk: JWK): string => {
  // ed25519 cryptonyms are multicodec encoded values, specifically:
  // (multicodec ed25519-pub 0xed01 + key bytes)
  const pubkeyBytes = base64url.toBuffer(jwk.x);
  const buffer = new Uint8Array(2 + pubkeyBytes.length);
  buffer[0] = 0xed;
  buffer[1] = 0x01;
  buffer.set(pubkeyBytes, 2);

  // prefix with `z` to indicate multi-base encodingFormat

  return base64url.encode(`z${u8a.toString(buffer, 'base58btc')}`);
};

export const getThumbprintFromJwk = async (jwk: JWK, did: string): Promise<string> => {
  if (isEd25519DidKeyMethod(did)) {
    return getThumbprintFromJwkDIDKeyImpl(jwk);
  } else {
    return await calculateJwkThumbprint(jwk, 'sha256');
  }
};

export const getThumbprint = async (hexPrivateKey: string, did: string): Promise<string> => {
  return await getThumbprintFromJwk(
    isEd25519DidKeyMethod(did) ? getPublicED25519JWKFromHexPrivateKey(hexPrivateKey) : getPublicJWKFromHexPrivateKey(hexPrivateKey),
    did
  );
};
*/
const check = (value, description) => {
    if (typeof value !== 'string' || !value) {
        throw Error(`${description} missing or invalid`);
    }
};
function calculateJwkThumbprint(jwk, digestAlgorithm) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!jwk || typeof jwk !== 'object') {
            throw new TypeError('JWK must be an object');
        }
        const algorithm = digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : 'sha256';
        if (algorithm !== 'sha256' && algorithm !== 'sha384' && algorithm !== 'sha512') {
            throw new TypeError('digestAlgorithm must one of "sha256", "sha384", or "sha512"');
        }
        let components;
        switch (jwk.kty) {
            case 'EC':
                check(jwk.crv, '"crv" (Curve) Parameter');
                check(jwk.x, '"x" (X Coordinate) Parameter');
                check(jwk.y, '"y" (Y Coordinate) Parameter');
                components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x, y: jwk.y };
                break;
            case 'OKP':
                check(jwk.crv, '"crv" (Subtype of Key Pair) Parameter');
                check(jwk.x, '"x" (Public Key) Parameter');
                components = { crv: jwk.crv, kty: jwk.kty, x: jwk.x };
                break;
            case 'RSA':
                check(jwk.e, '"e" (Exponent) Parameter');
                check(jwk.n, '"n" (Modulus) Parameter');
                components = { e: jwk.e, kty: jwk.kty, n: jwk.n };
                break;
            case 'oct':
                check(jwk.k, '"k" (Key Value) Parameter');
                components = { k: jwk.k, kty: jwk.kty };
                break;
            default:
                throw Error('"kty" (Key Type) Parameter missing or unsupported');
        }
        const data = u8a.fromString(JSON.stringify(components), 'utf-8');
        return u8a.toString(yield digest(algorithm, data), 'base64url');
    });
}
const digest = (algorithm, data) => __awaiter(void 0, void 0, void 0, function* () {
    const subtleDigest = `SHA-${algorithm.slice(-3)}`;
    return new Uint8Array(yield crypto.subtle.digest(subtleDigest, data));
});
function calculateJwkThumbprintUri(jwk, digestAlgorithm) {
    return __awaiter(this, void 0, void 0, function* () {
        digestAlgorithm !== null && digestAlgorithm !== void 0 ? digestAlgorithm : (digestAlgorithm = 'sha256');
        const thumbprint = yield calculateJwkThumbprint(jwk, digestAlgorithm);
        return `urn:ietf:params:oauth:jwk-thumbprint:sha-${digestAlgorithm.slice(-3)}:${thumbprint}`;
    });
}
exports.calculateJwkThumbprintUri = calculateJwkThumbprintUri;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2V5cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL0tleXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0RUFBNEU7QUFDNUUsdUNBQXVDO0FBQ3ZDLGlEQUFtQztBQUluQyxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUM7QUFFaEMsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLEdBQVksRUFBRSxFQUFFO0lBQ3BELE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDOUMsQ0FBQyxDQUFDO0FBRlcsUUFBQSxxQkFBcUIseUJBRWhDO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFzRUU7QUFFRixNQUFNLEtBQUssR0FBRyxDQUFDLEtBQUssRUFBRSxXQUFXLEVBQUUsRUFBRTtJQUNuQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hDLE1BQU0sS0FBSyxDQUFDLEdBQUcsV0FBVyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7QUFDSCxDQUFDLENBQUM7QUFFRixTQUFlLHNCQUFzQixDQUFDLEdBQVEsRUFBRSxlQUFnRDs7UUFDOUYsSUFBSSxDQUFDLEdBQUcsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUNwQyxNQUFNLElBQUksU0FBUyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDL0MsQ0FBQztRQUNELE1BQU0sU0FBUyxHQUFHLGVBQWUsYUFBZixlQUFlLGNBQWYsZUFBZSxHQUFJLFFBQVEsQ0FBQztRQUM5QyxJQUFJLFNBQVMsS0FBSyxRQUFRLElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxTQUFTLEtBQUssUUFBUSxFQUFFLENBQUM7WUFD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