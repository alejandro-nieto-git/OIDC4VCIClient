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
exports.AuthorizationRequest = void 0;
const PresentationExchange_1 = require("../authorization-response/PresentationExchange");
const did_1 = require("../did");
const helpers_1 = require("../helpers");
const SIOPSpecVersion_1 = require("../helpers/SIOPSpecVersion");
const request_object_1 = require("../request-object");
const types_1 = require("../types");
const Opts_1 = require("./Opts");
const Payload_1 = require("./Payload");
const URI_1 = require("./URI");
class AuthorizationRequest {
    constructor(payload, requestObject, opts, uri) {
        this._options = opts;
        this._payload = (0, helpers_1.removeNullUndefined)(payload);
        this._requestObject = requestObject;
        this._uri = uri;
    }
    static fromUriOrJwt(jwtOrUri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!jwtOrUri) {
                throw Error(types_1.SIOPErrors.NO_REQUEST);
            }
            return typeof jwtOrUri === 'string' && jwtOrUri.startsWith('ey')
                ? yield AuthorizationRequest.fromJwt(jwtOrUri)
                : yield AuthorizationRequest.fromURI(jwtOrUri);
        });
    }
    static fromPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload) {
                throw Error(types_1.SIOPErrors.NO_REQUEST);
            }
            const requestObject = yield request_object_1.RequestObject.fromAuthorizationRequestPayload(payload);
            return new AuthorizationRequest(payload, requestObject);
        });
    }
    static fromOpts(opts, requestObject) {
        return __awaiter(this, void 0, void 0, function* () {
            // todo: response_uri/redirect_uri is not hooked up from opts!
            if (!opts || !opts.requestObject) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            (0, Opts_1.assertValidAuthorizationRequestOpts)(opts);
            const requestObjectArg = opts.requestObject.passBy !== types_1.PassBy.NONE ? (requestObject ? requestObject : yield request_object_1.RequestObject.fromOpts(opts)) : undefined;
            const requestPayload = (opts === null || opts === void 0 ? void 0 : opts.payload) ? yield (0, Payload_1.createAuthorizationRequestPayload)(opts, requestObjectArg) : undefined;
            return new AuthorizationRequest(requestPayload, requestObjectArg, opts);
        });
    }
    get payload() {
        return this._payload;
    }
    get requestObject() {
        return this._requestObject;
    }
    get options() {
        return this._options;
    }
    hasRequestObject() {
        return this.requestObject !== undefined;
    }
    getSupportedVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.version) {
                return this.options.version;
            }
            else if (((_c = (_b = this._uri) === null || _b === void 0 ? void 0 : _b.encodedUri) === null || _c === void 0 ? void 0 : _c.startsWith(types_1.Schema.OPENID_VC)) || ((_e = (_d = this._uri) === null || _d === void 0 ? void 0 : _d.scheme) === null || _e === void 0 ? void 0 : _e.startsWith(types_1.Schema.OPENID_VC))) {
                return types_1.SupportedVersion.JWT_VC_PRESENTATION_PROFILE_v1;
            }
            return (yield this.getSupportedVersionsFromPayload())[0];
        });
    }
    getSupportedVersionsFromPayload() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const mergedPayload = Object.assign(Object.assign({}, this.payload), (yield ((_a = this.requestObject) === null || _a === void 0 ? void 0 : _a.getPayload())));
            return (0, SIOPSpecVersion_1.authorizationRequestVersionDiscovery)(mergedPayload);
        });
    }
    uri() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._uri) {
                this._uri = yield URI_1.URI.fromAuthorizationRequest(this);
            }
            return this._uri;
        });
    }
    /**
     * Verifies a SIOP Request JWT on OP side
     *
     * @param opts
     */
    verify(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            (0, Opts_1.assertValidVerifyAuthorizationRequestOpts)(opts);
            let requestObjectPayload;
            let verifiedJwt;
            const jwt = yield this.requestObjectJwt();
            if (jwt) {
                const parsedJWT = (0, did_1.parseJWT)(jwt);
                const payload = parsedJWT.payload;
                const audience = (0, did_1.getAudience)(jwt);
                const resolver = (0, did_1.getResolver)(opts.verification.resolveOpts);
                const options = Object.assign(Object.assign({}, (_b = (_a = opts.verification) === null || _a === void 0 ? void 0 : _a.resolveOpts) === null || _b === void 0 ? void 0 : _b.jwtVerifyOpts), { resolver,
                    audience });
                if (((_c = payload.client_id) === null || _c === void 0 ? void 0 : _c.startsWith('http')) && payload.iss.startsWith('http') && payload.iss === payload.client_id) {
                    console.error(`FIXME: The client_id and iss are not DIDs. We do not verify the signature in this case yet! ${payload.iss}`);
                    verifiedJwt = { payload, jwt, issuer: payload.iss };
                }
                else {
                    verifiedJwt = yield (0, did_1.verifyDidJWT)(jwt, resolver, options);
                }
                if (!verifiedJwt || !verifiedJwt.payload) {
                    throw Error(types_1.SIOPErrors.ERROR_VERIFYING_SIGNATURE);
                }
                requestObjectPayload = verifiedJwt.payload;
                if (this.hasRequestObject() && !this.payload.request_uri) {
                    // Put back the request object as that won't be present yet
                    this.payload.request = jwt;
                }
            }
            // AuthorizationRequest.assertValidRequestObject(origAuthenticationRequest);
            // We use the orig request for default values, but the JWT payload contains signed request object properties
            const mergedPayload = Object.assign(Object.assign({}, this.payload), requestObjectPayload);
            if (opts.state && mergedPayload.state !== opts.state) {
                throw new Error(`${types_1.SIOPErrors.BAD_STATE} payload: ${mergedPayload.state}, supplied: ${opts.state}`);
            }
            else if (opts.nonce && mergedPayload.nonce !== opts.nonce) {
                throw new Error(`${types_1.SIOPErrors.BAD_NONCE} payload: ${mergedPayload.nonce}, supplied: ${opts.nonce}`);
            }
            const registrationPropertyKey = mergedPayload['registration'] || mergedPayload['registration_uri'] ? 'registration' : 'client_metadata';
            let registrationMetadataPayload;
            if (mergedPayload[registrationPropertyKey] || mergedPayload[`${registrationPropertyKey}_uri`]) {
                registrationMetadataPayload = yield (0, helpers_1.fetchByReferenceOrUseByValue)(mergedPayload[`${registrationPropertyKey}_uri`], mergedPayload[registrationPropertyKey]);
                (0, Payload_1.assertValidRPRegistrationMedataPayload)(registrationMetadataPayload);
                // TODO: We need to do something with the metadata probably
            }
            // When the response_uri parameter is present, the redirect_uri Authorization Request parameter MUST NOT be present. If the redirect_uri Authorization Request parameter is present when the Response Mode is direct_post, the Wallet MUST return an invalid_request Authorization Response error.
            let responseURIType;
            let responseURI;
            if (mergedPayload.redirect_uri && mergedPayload.response_uri) {
                throw new Error(`${types_1.SIOPErrors.INVALID_REQUEST}, redirect_uri cannot be used together with response_uri`);
            }
            else if (mergedPayload.redirect_uri) {
                responseURIType = 'redirect_uri';
                responseURI = mergedPayload.redirect_uri;
            }
            else if (mergedPayload.response_uri) {
                responseURIType = 'response_uri';
                responseURI = mergedPayload.response_uri;
            }
            else if (mergedPayload.client_id_scheme === 'redirect_uri' && mergedPayload.client_id) {
                responseURIType = 'redirect_uri';
                responseURI = mergedPayload.client_id;
            }
            else {
                throw new Error(`${types_1.SIOPErrors.INVALID_REQUEST}, redirect_uri or response_uri is needed`);
            }
            yield (0, Payload_1.checkWellknownDIDFromRequest)(mergedPayload, opts);
            // TODO: we need to verify somewhere that if response_mode is direct_post, that the response_uri may be present,
            // BUT not both redirect_uri and response_uri. What is the best place to do this?
            const presentationDefinitions = yield PresentationExchange_1.PresentationExchange.findValidPresentationDefinitions(mergedPayload, yield this.getSupportedVersion());
            return Object.assign(Object.assign({}, verifiedJwt), { responseURIType,
                responseURI, clientIdScheme: mergedPayload.client_id_scheme, correlationId: opts.correlationId, authorizationRequest: this, verifyOpts: opts, presentationDefinitions,
                registrationMetadataPayload, requestObject: this.requestObject, authorizationRequestPayload: this.payload, versions: yield this.getSupportedVersionsFromPayload() });
        });
    }
    static verify(requestOrUri, verifyOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, Opts_1.assertValidVerifyAuthorizationRequestOpts)(verifyOpts);
            const authorizationRequest = yield AuthorizationRequest.fromUriOrJwt(requestOrUri);
            return yield authorizationRequest.verify(verifyOpts);
        });
    }
    requestObjectJwt() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            return yield ((_a = this.requestObject) === null || _a === void 0 ? void 0 : _a.toJwt());
        });
    }
    static fromJwt(jwt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!jwt) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            const requestObject = yield request_object_1.RequestObject.fromJwt(jwt);
            const payload = Object.assign({}, (yield requestObject.getPayload()));
            // Although this was a RequestObject we instantiate it as AuthzRequest and then copy in the JWT as the request Object
            payload.request = jwt;
            return new AuthorizationRequest(Object.assign({}, payload), requestObject);
        });
    }
    static fromURI(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            const uriObject = typeof uri === 'string' ? yield URI_1.URI.fromUri(uri) : uri;
            const requestObject = yield request_object_1.RequestObject.fromJwt(uriObject.requestObjectJwt);
            return new AuthorizationRequest(uriObject.authorizationRequestPayload, requestObject, undefined, uriObject);
        });
    }
    toStateInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const requestObject = yield this.requestObject.getPayload();
            return {
                client_id: this.options.clientMetadata.client_id,
                iat: (_a = requestObject.iat) !== null && _a !== void 0 ? _a : this.payload.iat,
                nonce: (_b = requestObject.nonce) !== null && _b !== void 0 ? _b : this.payload.nonce,
                state: this.payload.state,
            };
        });
    }
    containsResponseType(singleType) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseType = yield this.getMergedProperty('response_type');
            return (responseType === null || responseType === void 0 ? void 0 : responseType.includes(singleType)) === true;
        });
    }
    getMergedProperty(key) {
        return __awaiter(this, void 0, void 0, function* () {
            const merged = yield this.mergedPayloads();
            return merged[key];
        });
    }
    mergedPayloads() {
        return __awaiter(this, void 0, void 0, function* () {
            return Object.assign(Object.assign({}, this.payload), (this.requestObject && (yield this.requestObject.getPayload())));
        });
    }
    getPresentationDefinitions(version) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield PresentationExchange_1.PresentationExchange.findValidPresentationDefinitions(yield this.mergedPayloads(), version);
        });
    }
}
exports.AuthorizationRequest = AuthorizationRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aG9yaXphdGlvblJlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aG9yaXphdGlvbi1yZXF1ZXN0L0F1dGhvcml6YXRpb25SZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLHlGQUFzRjtBQUN0RixnQ0FBMEU7QUFDMUUsd0NBQStFO0FBQy9FLGdFQUFrRjtBQUNsRixzREFBa0Q7QUFDbEQsb0NBY2tCO0FBRWxCLGlDQUF3RztBQUN4Ryx1Q0FBb0k7QUFDcEksK0JBQTRCO0FBRzVCLE1BQWEsb0JBQW9CO0lBTS9CLFlBQW9CLE9BQW9DLEVBQUUsYUFBNkIsRUFBRSxJQUFxQyxFQUFFLEdBQVM7UUFDdkksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFBLDZCQUFtQixFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0lBQ2xCLENBQUM7SUFFTSxNQUFNLENBQU8sWUFBWSxDQUFDLFFBQXNCOztZQUNyRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ2QsTUFBTSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBQ0QsT0FBTyxPQUFPLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7Z0JBQzlELENBQUMsQ0FBQyxNQUFNLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxNQUFNLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFTSxNQUFNLENBQU8sV0FBVyxDQUFDLE9BQW9DOztZQUNsRSxJQUFJLENBQUMsT0FBTyxFQUFF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