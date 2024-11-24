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
exports.IDToken = void 0;
const Opts_1 = require("../authorization-response/Opts");
const did_1 = require("../did");
const types_1 = require("../types");
const Payload_1 = require("./Payload");
class IDToken {
    constructor(jwt, payload, responseOpts) {
        this._jwt = jwt;
        this._payload = payload;
        this._responseOpts = responseOpts;
    }
    static fromVerifiedAuthorizationRequest(verifiedAuthorizationRequest, responseOpts, verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizationRequestPayload = verifiedAuthorizationRequest.authorizationRequestPayload;
            if (!authorizationRequestPayload) {
                throw new Error(types_1.SIOPErrors.NO_REQUEST);
            }
            const idToken = new IDToken(null, yield (0, Payload_1.createIDTokenPayload)(verifiedAuthorizationRequest, responseOpts), responseOpts);
            if (verifyOpts) {
                yield idToken.verify(verifyOpts);
            }
            return idToken;
        });
    }
    static fromIDToken(idTokenJwt, verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!idTokenJwt) {
                throw new Error(types_1.SIOPErrors.NO_JWT);
            }
            const idToken = new IDToken(idTokenJwt, undefined);
            if (verifyOpts) {
                yield idToken.verify(verifyOpts);
            }
            return idToken;
        });
    }
    static fromIDTokenPayload(idTokenPayload, responseOpts, verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!idTokenPayload) {
                throw new Error(types_1.SIOPErrors.NO_JWT);
            }
            const idToken = new IDToken(null, idTokenPayload, responseOpts);
            if (verifyOpts) {
                yield idToken.verify(verifyOpts);
            }
            return idToken;
        });
    }
    payload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._payload) {
                if (!this._jwt) {
                    throw new Error(types_1.SIOPErrors.NO_JWT);
                }
                const { header, payload } = this.parseAndVerifyJwt();
                this._header = header;
                this._payload = payload;
            }
            return this._payload;
        });
    }
    jwt() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._jwt) {
                if (!this.responseOpts) {
                    throw Error(types_1.SIOPErrors.BAD_SIGNATURE_PARAMS);
                }
                this._jwt = yield (0, did_1.signIDTokenPayload)(this._payload, this.responseOpts);
                const { header, payload } = this.parseAndVerifyJwt();
                this._header = header;
                this._payload = payload;
            }
            return this._jwt;
        });
    }
    parseAndVerifyJwt() {
        const { header, payload } = (0, did_1.parseJWT)(this._jwt);
        this.assertValidResponseJWT({ header, payload });
        const idTokenPayload = payload;
        return { header, payload: idTokenPayload };
    }
    /**
     * Verifies a SIOP ID Response JWT on the RP Side
     *
     * @param idToken ID token to be validated
     * @param verifyOpts
     */
    verify(verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            (0, Opts_1.assertValidVerifyOpts)(verifyOpts);
            const { header, payload } = (0, did_1.parseJWT)(yield this.jwt());
            this.assertValidResponseJWT({ header, payload });
            const verifiedJWT = yield (0, did_1.verifyDidJWT)(yield this.jwt(), (0, did_1.getResolver)(verifyOpts.verification.resolveOpts), Object.assign(Object.assign({}, (_a = verifyOpts.verification.resolveOpts) === null || _a === void 0 ? void 0 : _a.jwtVerifyOpts), { audience: (_b = verifyOpts.audience) !== null && _b !== void 0 ? _b : (_d = (_c = verifyOpts.verification.resolveOpts) === null || _c === void 0 ? void 0 : _c.jwtVerifyOpts) === null || _d === void 0 ? void 0 : _d.audience }));
            const issuerDid = (0, did_1.getSubDidFromPayload)(payload);
            if (verifyOpts.verification.checkLinkedDomain && verifyOpts.verification.checkLinkedDomain !== types_1.CheckLinkedDomain.NEVER) {
                yield (0, did_1.validateLinkedDomainWithDid)(issuerDid, verifyOpts.verification);
            }
            else if (!verifyOpts.verification.checkLinkedDomain) {
                yield (0, did_1.validateLinkedDomainWithDid)(issuerDid, verifyOpts.verification);
            }
            const verPayload = verifiedJWT.payload;
            this.assertValidResponseJWT({ header, verPayload: verPayload, audience: verifyOpts.audience });
            // Enforces verifyPresentationCallback function on the RP side,
            if (!(verifyOpts === null || verifyOpts === void 0 ? void 0 : verifyOpts.verification.presentationVerificationCallback)) {
                throw new Error(types_1.SIOPErrors.VERIFIABLE_PRESENTATION_VERIFICATION_FUNCTION_MISSING);
            }
            return {
                jwt: yield this.jwt(),
                didResolutionResult: verifiedJWT.didResolutionResult,
                signer: verifiedJWT.signer,
                issuer: issuerDid,
                payload: Object.assign({}, verPayload),
                verifyOpts,
            };
        });
    }
    static verify(idTokenJwt, verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            const idToken = yield IDToken.fromIDToken(idTokenJwt, verifyOpts);
            const verifiedIdToken = yield idToken.verify(verifyOpts);
            return Object.assign({}, verifiedIdToken);
        });
    }
    assertValidResponseJWT(opts) {
        if (!opts.header) {
            throw new Error(types_1.SIOPErrors.BAD_PARAMS);
        }
        if (opts.payload) {
            if (!opts.payload.iss || !(opts.payload.iss.includes(types_1.ResponseIss.SELF_ISSUED_V2) || opts.payload.iss.startsWith('did:'))) {
                throw new Error(`${types_1.SIOPErrors.NO_SELFISSUED_ISS}, got: ${opts.payload.iss}`);
            }
        }
        if (opts.verPayload) {
            if (!opts.verPayload.nonce) {
                throw Error(types_1.SIOPErrors.NO_NONCE);
                // No need for our own expiration check. DID jwt already does that
                /*} else if (!opts.verPayload.exp || opts.verPayload.exp < Date.now() / 1000) {
                throw Error(SIOPErrors.EXPIRED);
                /!*} else if (!opts.verPayload.iat || opts.verPayload.iat > (Date.now() / 1000)) {
                                  throw Error(SIOPErrors.EXPIRED);*!/
                // todo: Add iat check
        
               */
            }
            if ((opts.verPayload.aud && !opts.audience) || (!opts.verPayload.aud && opts.audience)) {
                throw Error(types_1.SIOPErrors.NO_AUDIENCE);
            }
            else if (opts.audience && opts.audience != opts.verPayload.aud) {
                throw Error(types_1.SIOPErrors.INVALID_AUDIENCE);
            }
            else if (opts.nonce && opts.nonce != opts.verPayload.nonce) {
                throw Error(types_1.SIOPErrors.BAD_NONCE);
            }
        }
    }
    get header() {
        return this._header;
    }
    get responseOpts() {
        return this._responseOpts;
    }
    isSelfIssued() {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.payload();
            return payload.iss === types_1.ResponseIss.SELF_ISSUED_V2 || (payload.sub !== undefined && payload.sub === payload.iss);
        });
    }
}
exports.IDToken = IDToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSURUb2tlbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pZC10b2tlbi9JRFRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLHlEQUF1RTtBQUN2RSxnQ0FBb0k7QUFDcEksb0NBU2tCO0FBRWxCLHVDQUFpRDtBQUVqRCxNQUFhLE9BQU87SUFNbEIsWUFBb0IsR0FBZ0IsRUFBRSxPQUF3QixFQUFFLFlBQXdDO1FBQ3RHLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBQ2hCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxhQUFhLEdBQUcsWUFBWSxDQUFDO0lBQ3BDLENBQUM7SUFFTSxNQUFNLENBQU8sZ0NBQWdDLENBQ2xELDRCQUEwRCxFQUMxRCxZQUF1QyxFQUN2QyxVQUE0Qzs7WUFFNUMsTUFBTSwyQkFBMkIsR0FBRyw0QkFBNEIsQ0FBQywyQkFBMkIsQ0FBQztZQUM3RixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztnQkFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7WUFDRCxNQUFNLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxJQUFBLDhCQUFvQixFQUFDLDRCQUE0QixFQUFFLFlBQVksQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3hILElBQUksVUFBVSxFQUFFLENBQUM7Z0JBQ2YsTUFBTSxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ25DLENBQUM7WUFDRCxPQUFPLE9BQU8sQ0FBQztRQUNqQixDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sV0FBVyxDQUFDLFVBQXNCLEVBQUUsVUFBNEM7O1lBQ2xHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztnQkFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLE1B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