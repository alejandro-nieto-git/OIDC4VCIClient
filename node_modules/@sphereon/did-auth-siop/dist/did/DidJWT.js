"use strict";
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
exports.toSIOPRegistrationDidMethod = exports.getNetworkFromDid = exports.getMethodFromDid = exports.parseJWT = exports.getIssuerDidFromJWT = exports.isIssSelfIssued = exports.getSubDidFromPayload = exports.getAudience = exports.signRequestObjectPayload = exports.signIDTokenPayload = exports.createDidJWT = exports.verifyDidJWT = void 0;
const did_jwt_1 = require("did-jwt");
const helpers_1 = require("../helpers");
const types_1 = require("../types");
/**
 *  Verifies given JWT. If the JWT is valid, the promise returns an object including the JWT, the payload of the JWT,
 *  and the did doc of the issuer of the JWT.
 *
 *  @example
 *  verifyDidJWT('did:key:example', resolver, {audience: '5A8bRWU3F7j3REx3vkJ...', callbackUrl: 'https://...'}).then(obj => {
 *      const did = obj.did                 // DIDres of signer
 *      const payload = obj.payload
 *      const doc = obj.doc                 // DIDres Document of signer
 *      const JWT = obj.JWT                 // JWT
 *      const signerKeyId = obj.signerKeyId // ID of key in DIDres document that signed JWT
 *      ...
 *  })
 *
 *  @param    {String}            jwt                   a JSON Web Token to verify
 *  @param    {Resolvable}        resolver
 *  @param    {JWTVerifyOptions}  [options]             Options
 *  @param    {String}            options.audience      DID of the recipient of the JWT
 *  @param    {String}            options.callbackUrl   callback url in JWT
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a response object or rejects with an error
 */
function verifyDidJWT(jwt, resolver, options) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, did_jwt_1.verifyJWT)(jwt, Object.assign(Object.assign({}, options), { resolver }));
    });
}
exports.verifyDidJWT = verifyDidJWT;
/**
 *  Creates a signed JWT given an address which becomes the issuer, a signer function, and a payload for which the withSignature is over.
 *
 *  @example
 *  const signer = ES256KSigner(process.env.PRIVATE_KEY)
 *  createJWT({address: '5A8bRWU3F7j3REx3vkJ...', signer}, {key1: 'value', key2: ..., ... }).then(JWT => {
 *      ...
 *  })
 *
 *  @param    {Object}            payload               payload object
 *  @param    {Object}            [options]             an unsigned credential object
 *  @param    {String}            options.issuer        The DID of the issuer (signer) of JWT
 *  @param    {Signer}            options.signer        a `Signer` function, Please see `ES256KSigner` or `EdDSASigner`
 *  @param    {boolean}           options.canonicalize  optional flag to canonicalize header and payload before signing
 *  @param    {Object}            header                optional object to specify or customize the JWT header
 *  @return   {Promise<Object, Error>}                  a promise which resolves with a signed JSON Web Token or rejects with an error
 */
function createDidJWT(payload_1, _a, header_1) {
    return __awaiter(this, arguments, void 0, function* (payload, { issuer, signer, expiresIn, canonicalize }, header) {
        return (0, did_jwt_1.createJWT)(payload, { issuer, signer, expiresIn, canonicalize }, header);
    });
}
exports.createDidJWT = createDidJWT;
function signIDTokenPayload(payload, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!payload.sub) {
            payload.sub = opts.signature.did;
        }
        const issuer = opts.registration.issuer || payload.iss;
        if (!issuer || !(issuer.includes(types_1.ResponseIss.SELF_ISSUED_V2) || issuer === payload.sub)) {
            throw new Error(types_1.SIOPErrors.NO_SELFISSUED_ISS);
        }
        if (!payload.iss) {
            payload.iss = issuer;
        }
        if ((0, types_1.isInternalSignature)(opts.signature)) {
            return signDidJwtInternal(payload, issuer, opts.signature.hexPrivateKey, opts.signature.alg, opts.signature.kid, opts.signature.customJwtSigner);
        }
        else if ((0, types_1.isExternalSignature)(opts.signature)) {
            return signDidJwtExternal(payload, opts.signature.signatureUri, opts.signature.authZToken, opts.signature.alg, opts.signature.kid);
        }
        else if ((0, types_1.isSuppliedSignature)(opts.signature)) {
            return signDidJwtSupplied(payload, issuer, opts.signature.signature, opts.signature.alg, opts.signature.kid);
        }
        else {
            throw new Error(types_1.SIOPErrors.BAD_SIGNATURE_PARAMS);
        }
    });
}
exports.signIDTokenPayload = signIDTokenPayload;
function signRequestObjectPayload(payload, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        let issuer = payload.iss;
        if (!issuer) {
            issuer = opts.signature.did;
        }
        if (!issuer) {
            throw Error('No issuer supplied to sign the JWT');
        }
        if (!payload.iss) {
            payload.iss = issuer;
        }
        if (!payload.sub) {
            payload.sub = opts.signature.did;
        }
        if ((0, types_1.isInternalSignature)(opts.signature)) {
            return signDidJwtInternal(payload, issuer, opts.signature.hexPrivateKey, opts.signature.alg, opts.signature.kid, opts.signature.customJwtSigner);
        }
        else if ((0, types_1.isExternalSignature)(opts.signature)) {
            return signDidJwtExternal(payload, opts.signature.signatureUri, opts.signature.authZToken, opts.signature.alg, opts.signature.kid);
        }
        else if ((0, types_1.isSuppliedSignature)(opts.signature)) {
            return signDidJwtSupplied(payload, issuer, opts.signature.signature, opts.signature.alg, opts.signature.kid);
        }
        else {
            throw new Error(types_1.SIOPErrors.BAD_SIGNATURE_PARAMS);
        }
    });
}
exports.signRequestObjectPayload = signRequestObjectPayload;
function signDidJwtInternal(payload, issuer, hexPrivateKey, alg, kid, customJwtSigner) {
    return __awaiter(this, void 0, void 0, function* () {
        const signer = determineSigner(alg, hexPrivateKey, customJwtSigner);
        const header = {
            alg,
            kid,
        };
        const options = {
            issuer,
            signer,
            expiresIn: types_1.DEFAULT_EXPIRATION_TIME,
        };
        return yield createDidJWT(Object.assign({}, payload), options, header);
    });
}
function signDidJwtExternal(payload, signatureUri, authZToken, alg, kid) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {
            issuer: payload.iss && payload.iss.includes('did:') ? payload.iss : payload.sub,
            payload,
            expiresIn: types_1.DEFAULT_EXPIRATION_TIME,
            alg,
            selfIssued: payload.iss.includes(types_1.ResponseIss.SELF_ISSUED_V2) ? payload.iss : undefined,
            kid,
        };
        const response = yield (0, helpers_1.post)(signatureUri, JSON.stringify(body), { bearerToken: authZToken });
        return response.successBody.jws;
    });
}
function signDidJwtSupplied(payload, issuer, signer, alg, kid) {
    return __awaiter(this, void 0, void 0, function* () {
        const header = {
            alg,
            kid,
        };
        const options = {
            issuer,
            signer,
            expiresIn: types_1.DEFAULT_EXPIRATION_TIME,
        };
        return yield createDidJWT(Object.assign({}, payload), options, header);
    });
}
const determineSigner = (alg, hexPrivateKey, customSigner) => {
    if (customSigner) {
        return customSigner;
    }
    else if (!hexPrivateKey) {
        throw new Error('no private key provided');
    }
    const privateKey = (0, did_jwt_1.hexToBytes)(hexPrivateKey.replace('0x', ''));
    switch (alg) {
        case types_1.SigningAlgo.EDDSA:
            return (0, did_jwt_1.EdDSASigner)(privateKey);
        case types_1.SigningAlgo.ES256:
            return (0, did_jwt_1.ES256Signer)(privateKey);
        case types_1.SigningAlgo.ES256K:
            return (0, did_jwt_1.ES256KSigner)(privateKey);
        case types_1.SigningAlgo.PS256:
            throw Error('PS256 is not supported yet. Please provide a custom signer');
        case types_1.SigningAlgo.RS256:
            throw Error('RS256 is not supported yet. Please provide a custom signer');
    }
};
function getAudience(jwt) {
    const { payload } = (0, did_jwt_1.decodeJWT)(jwt);
    if (!payload) {
        throw new Error(types_1.SIOPErrors.NO_AUDIENCE);
    }
    else if (!payload.aud) {
        return undefined;
    }
    else if (Array.isArray(payload.aud)) {
        throw new Error(types_1.SIOPErrors.INVALID_AUDIENCE);
    }
    return payload.aud;
}
exports.getAudience = getAudience;
//TODO To enable automatic registration, it cannot be a did, but HTTPS URL
function assertIssSelfIssuedOrDid(payload) {
    if (!payload.sub || !payload.sub.startsWith('did:') || !payload.iss || !isIssSelfIssued(payload)) {
        throw new Error(types_1.SIOPErrors.NO_ISS_DID);
    }
}
function getSubDidFromPayload(payload, header) {
    assertIssSelfIssuedOrDid(payload);
    if (isIssSelfIssued(payload)) {
        let did;
        if (payload.sub && payload.sub.startsWith('did:')) {
            did = payload.sub;
        }
        if (!did && header && header.kid && header.kid.startsWith('did:')) {
            did = header.kid.split('#')[0];
        }
        if (did) {
            return did;
        }
    }
    return payload.sub;
}
exports.getSubDidFromPayload = getSubDidFromPayload;
function isIssSelfIssued(payload) {
    return payload.iss.includes(types_1.ResponseIss.SELF_ISSUED_V1) || payload.iss.includes(types_1.ResponseIss.SELF_ISSUED_V2) || payload.iss === payload.sub;
}
exports.isIssSelfIssued = isIssSelfIssued;
function getIssuerDidFromJWT(jwt) {
    const { payload } = parseJWT(jwt);
    return getSubDidFromPayload(payload);
}
exports.getIssuerDidFromJWT = getIssuerDidFromJWT;
function parseJWT(jwt) {
    const decodedJWT = (0, did_jwt_1.decodeJWT)(jwt);
    const { payload, header } = decodedJWT;
    if (!payload || !header) {
        throw new Error(types_1.SIOPErrors.NO_JWT);
    }
    return decodedJWT;
}
exports.parseJWT = parseJWT;
function getMethodFromDid(did) {
    if (!did) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    const split = did.split(':');
    if (split.length == 1 && did.length > 0) {
        return did;
    }
    else if (!did.startsWith('did:') || split.length < 2) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    return split[1];
}
exports.getMethodFromDid = getMethodFromDid;
function getNetworkFromDid(did) {
    const network = 'mainnet'; // default
    const split = did.split(':');
    if (!did.startsWith('did:') || split.length < 2) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    if (split.length === 4) {
        return split[2];
    }
    else if (split.length > 4) {
        return `${split[2]}:${split[3]}`;
    }
    return network;
}
exports.getNetworkFromDid = getNetworkFromDid;
/**
 * Since the OIDC SIOP spec incorrectly uses 'did:<method>:' and calls that a method, we have to fix it
 * @param didOrMethod
 */
function toSIOPRegistrationDidMethod(didOrMethod) {
    let prefix = didOrMethod;
    if (!didOrMethod.startsWith('did:')) {
        prefix = 'did:' + didOrMethod;
    }
    const split = prefix.split(':');
    return `${split[0]}:${split[1]}`;
}
exports.toSIOPRegistrationDidMethod = toSIOPRegistrationDidMethod;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlkSldULmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2RpZC9EaWRKV1QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBYWlCO0FBTWpCLHdDQUFrQztBQUVsQyxvQ0Fha0I7QUFFbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsU0FBc0IsWUFBWSxDQUFDLEdBQVcsRUFBRSxRQUFvQixFQUFFLE9BQXlCOztRQUM3RixPQUFPLElBQUEsbUJBQVMsRUFBQyxHQUFHLGtDQUFPLE9BQU8sS0FBRSxRQUFRLElBQUcsQ0FBQztJQUNsRCxDQUFDO0NBQUE7QUFGRCxvQ0FFQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsU0FBc0IsWUFBWTt5REFDaEMsT0FBNEIsRUFDNUIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQWMsRUFDdkQsTUFBMEI7UUFFMUIsT0FBTyxJQUFBLG1CQUFTLEVBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakYsQ0FBQztDQUFBO0FBTkQsb0NBTUM7QUFFRCxTQUFzQixrQkFBa0IsQ0FBQyxPQUF1QixFQUFFLElBQStCOztRQUMvRixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7UUFDbkMsQ0FBQztRQUVELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUM7UUFDdkQsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxtQkFBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLE1BQU0sS0FBSyxPQUFPLENBQUMsR0FB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