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
exports.OP = void 0;
const uuid_1 = require("uuid");
const authorization_request_1 = require("../authorization-request");
const Opts_1 = require("../authorization-request/Opts");
const authorization_response_1 = require("../authorization-response");
const helpers_1 = require("../helpers");
const SIOPSpecVersion_1 = require("../helpers/SIOPSpecVersion");
const types_1 = require("../types");
const OPBuilder_1 = require("./OPBuilder");
const Opts_2 = require("./Opts");
// The OP publishes the formats it supports using the vp_formats_supported metadata parameter as defined above in its "openid-configuration".
class OP {
    constructor(opts) {
        var _a;
        this._createResponseOptions = Object.assign({}, (0, Opts_2.createResponseOptsFromBuilderOrExistingOpts)(opts));
        this._verifyRequestOptions = Object.assign({}, (0, Opts_2.createVerifyRequestOptsFromBuilderOrExistingOpts)(opts));
        this._eventEmitter = (_a = opts.builder) === null || _a === void 0 ? void 0 : _a.eventEmitter;
    }
    /**
     * This method tries to infer the SIOP specs version based on the request payload.
     * If the version cannot be inferred or is not supported it throws an exception.
     * This method needs to be called to ensure the OP can handle the request
     * @param requestJwtOrUri
     * @param requestOpts
     */
    verifyAuthorizationRequest(requestJwtOrUri, requestOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            const correlationId = (requestOpts === null || requestOpts === void 0 ? void 0 : requestOpts.correlationId) || (0, uuid_1.v4)();
            const authorizationRequest = yield authorization_request_1.AuthorizationRequest.fromUriOrJwt(requestJwtOrUri)
                .then((result) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_REQUEST_RECEIVED_SUCCESS, { correlationId, subject: result });
                return result;
            })
                .catch((error) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_REQUEST_RECEIVED_FAILED, {
                    correlationId,
                    subject: requestJwtOrUri,
                    error,
                });
                throw error;
            });
            return authorizationRequest
                .verify(this.newVerifyAuthorizationRequestOpts(Object.assign(Object.assign({}, requestOpts), { correlationId })))
                .then((verifiedAuthorizationRequest) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_REQUEST_VERIFIED_SUCCESS, {
                    correlationId,
                    subject: verifiedAuthorizationRequest.authorizationRequest,
                });
                return verifiedAuthorizationRequest;
            })
                .catch((error) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_REQUEST_VERIFIED_FAILED, {
                    correlationId,
                    subject: authorizationRequest,
                    error,
                });
                throw error;
            });
        });
    }
    createAuthorizationResponse(verifiedAuthorizationRequest, responseOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (verifiedAuthorizationRequest.correlationId &&
                (responseOpts === null || responseOpts === void 0 ? void 0 : responseOpts.correlationId) &&
                verifiedAuthorizationRequest.correlationId !== responseOpts.correlationId) {
                throw new Error(`Request correlation id ${verifiedAuthorizationRequest.correlationId} is different from option correlation id ${responseOpts.correlationId}`);
            }
            let version = responseOpts === null || responseOpts === void 0 ? void 0 : responseOpts.version;
            const rpSupportedVersions = (0, SIOPSpecVersion_1.authorizationRequestVersionDiscovery)(yield verifiedAuthorizationRequest.authorizationRequest.mergedPayloads());
            if (version && rpSupportedVersions.length > 0 && !rpSupportedVersions.includes(version)) {
                throw Error(`RP does not support spec version ${version}, supported versions: ${rpSupportedVersions.toString()}`);
            }
            else if (!version) {
                version = rpSupportedVersions.reduce((previous, current) => (current.valueOf() > previous.valueOf() ? current : previous), types_1.SupportedVersion.SIOPv2_ID1);
            }
            const correlationId = (_b = (_a = responseOpts === null || responseOpts === void 0 ? void 0 : responseOpts.correlationId) !== null && _a !== void 0 ? _a : verifiedAuthorizationRequest.correlationId) !== null && _b !== void 0 ? _b : (0, uuid_1.v4)();
            try {
                // IF using DIRECT_POST, the response_uri takes precedence over the redirect_uri
                let responseUri = verifiedAuthorizationRequest.responseURI;
                if (verifiedAuthorizationRequest.authorizationRequestPayload.response_mode === types_1.ResponseMode.DIRECT_POST) {
                    responseUri = (_c = verifiedAuthorizationRequest.authorizationRequestPayload.response_uri) !== null && _c !== void 0 ? _c : responseUri;
                }
                const response = yield authorization_response_1.AuthorizationResponse.fromVerifiedAuthorizationRequest(verifiedAuthorizationRequest, this.newAuthorizationResponseOpts(Object.assign(Object.assign({}, responseOpts), { version,
                    correlationId })), verifiedAuthorizationRequest.verifyOpts);
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_CREATE_SUCCESS, {
                    correlationId,
                    subject: response,
                });
                return { correlationId, response, responseURI: responseUri };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (error) {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_CREATE_FAILED, {
                    correlationId,
                    subject: verifiedAuthorizationRequest.authorizationRequest,
                    error,
                });
                throw error;
            }
        });
    }
    // TODO SK Can you please put some documentation on it?
    submitAuthorizationResponse(authorizationResponse) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            const { correlationId, response } = authorizationResponse;
            if (!correlationId) {
                throw Error('No correlation Id provided');
            }
            if (!response ||
                (((_a = response.options) === null || _a === void 0 ? void 0 : _a.responseMode) &&
                    !(response.options.responseMode === types_1.ResponseMode.POST ||
                        response.options.responseMode === types_1.ResponseMode.FORM_POST ||
                        response.options.responseMode === types_1.ResponseMode.DIRECT_POST))) {
                throw new Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            const payload = response.payload;
            const idToken = yield ((_b = response.idToken) === null || _b === void 0 ? void 0 : _b.payload());
            const responseUri = (_c = authorizationResponse.responseURI) !== null && _c !== void 0 ? _c : idToken === null || idToken === void 0 ? void 0 : idToken.aud;
            if (!responseUri) {
                throw Error('No response URI present');
            }
            const authResponseAsURI = (0, helpers_1.encodeJsonAsURI)(payload, { arraysWithIndex: ['presentation_submission', 'vp_token'] });
            return (0, helpers_1.post)(responseUri, authResponseAsURI, { contentType: types_1.ContentType.FORM_URL_ENCODED, exceptionOnHttpErrorStatus: true })
                .then((result) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_SENT_SUCCESS, { correlationId, subject: response });
                return result.origResponse;
            })
                .catch((error) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_SENT_FAILED, { correlationId, subject: response, error });
                throw error;
            });
        });
    }
    /**
     * Create an Authentication Request Payload from a URI string
     *
     * @param encodedUri
     */
    parseAuthorizationRequestURI(encodedUri) {
        return __awaiter(this, void 0, void 0, function* () {
            const { scheme, requestObjectJwt, authorizationRequestPayload, registrationMetadata } = yield authorization_request_1.URI.parseAndResolve(encodedUri);
            return {
                encodedUri,
                encodingFormat: types_1.UrlEncodingFormat.FORM_URL_ENCODED,
                scheme: scheme,
                requestObjectJwt,
                authorizationRequestPayload,
                registration: registrationMetadata,
            };
        });
    }
    newAuthorizationResponseOpts(opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const version = (_a = opts.version) !== null && _a !== void 0 ? _a : this._createResponseOptions.version;
        let issuer = (_b = opts.issuer) !== null && _b !== void 0 ? _b : (_d = (_c = this._createResponseOptions) === null || _c === void 0 ? void 0 : _c.registration) === null || _d === void 0 ? void 0 : _d.issuer;
        if (version === types_1.SupportedVersion.JWT_VC_PRESENTATION_PROFILE_v1) {
            issuer = types_1.ResponseIss.JWT_VC_PRESENTATION_V1;
        }
        else if (version === types_1.SupportedVersion.SIOPv2_ID1) {
            issuer = types_1.ResponseIss.SELF_ISSUED_V2;
        }
        if (!issuer) {
            throw Error(`No issuer value present. Either use IDv1, JWT VC Presentation profile version, or provide a DID as issuer value`);
        }
        // We are taking the whole presentationExchange object from a certain location
        const presentationExchange = (_e = opts.presentationExchange) !== null && _e !== void 0 ? _e : this._createResponseOptions.presentationExchange;
        const responseURI = (_f = opts.audience) !== null && _f !== void 0 ? _f : this._createResponseOptions.responseURI;
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, this._createResponseOptions), opts), { signature: Object.assign(Object.assign({}, (_g = this._createResponseOptions) === null || _g === void 0 ? void 0 : _g.signature), opts.signature) }), (presentationExchange && { presentationExchange })), { registration: Object.assign(Object.assign({}, (_h = this._createResponseOptions) === null || _h === void 0 ? void 0 : _h.registration), { issuer }), responseURI, responseURIType: (_j = this._createResponseOptions.responseURIType) !== null && _j !== void 0 ? _j : (version < types_1.SupportedVersion.SIOPv2_D12_OID4VP_D18 && responseURI ? 'redirect_uri' : undefined) });
    }
    newVerifyAuthorizationRequestOpts(requestOpts) {
        const verification = Object.assign(Object.assign(Object.assign({}, this._verifyRequestOptions), requestOpts), { verification: (0, Opts_1.mergeVerificationOpts)(this._verifyRequestOptions, requestOpts), correlationId: requestOpts.correlationId });
        return verification;
    }
    emitEvent(type, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._eventEmitter) {
                this._eventEmitter.emit(type, new types_1.AuthorizationEvent(payload));
            }
        });
    }
    addEventListener(register) {
        if (!this._eventEmitter) {
            throw Error('Cannot add listeners if no event emitter is available');
        }
        const events = Array.isArray(register.event) ? register.event : [register.event];
        for (const event of events) {
            this._eventEmitter.addListener(event, register.listener);
        }
    }
    static fromOpts(responseOpts, verifyOpts) {
        return new OP({ responseOpts, verifyOpts });
    }
    static builder() {
        return new OPBuilder_1.OPBuilder();
    }
    get createResponseOptions() {
        return this._createResponseOptions;
    }
    get verifyRequestOptions() {
        return this._verifyRequestOptions;
    }
}
exports.OP = OP;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1AuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvb3AvT1AudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0EsK0JBQW9DO0FBRXBDLG9FQUFxRztBQUNyRyx3REFBc0U7QUFDdEUsc0VBS21DO0FBQ25DLHdDQUFtRDtBQUNuRCxnRUFBa0Y7QUFDbEYsb0NBa0JrQjtBQUVsQiwyQ0FBd0M7QUFDeEMsaUNBQXVIO0FBRXZILDZJQUE2STtBQUM3SSxNQUFhLEVBQUU7SUFLYixZQUFvQixJQUFvSDs7UUFDdEksSUFBSSxDQUFDLHNCQUFzQixxQkFBUSxJQUFBLGtEQUEyQyxFQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFDdkYsSUFBSSxDQUFDLHFCQUFxQixxQkFBUSxJQUFBLHVEQUFnRCxFQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFDM0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFlBQVksQ0FBQztJQUNsRCxDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBRVUsMEJBQTBCLENBQ3JDLGVBQTZCLEVBQzdCLFdBQW9HOztZQUVwRyxNQUFNLGFBQWEsR0FBRyxDQUFBLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxhQUFhLEtBQUksSUFBQSxTQUFNLEdBQUUsQ0FBQztZQUM3RCxNQUFNLG9CQUFvQixHQUFHLE1BQU0sNENBQW9CLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQztpQkFDbEYsSUFBSSxDQUFDLENBQUMsTUFBNEIsRUFBRSxFQUFFO2dCQUNyQyxLQUFLLElBQUksQ0FBQyxTQUFTLENBQUMsMkJBQW1CLENBQUMsZ0NBQWdDLEVBQUUsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBQzlHLE9BQU8sTUFBTSxDQUFDO1lBQ2hCLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRTtnQkFDdEIs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