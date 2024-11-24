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
exports.RP = void 0;
const uuid_1 = require("uuid");
const authorization_request_1 = require("../authorization-request");
const Opts_1 = require("../authorization-request/Opts");
const authorization_response_1 = require("../authorization-response");
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const Opts_2 = require("./Opts");
const RPBuilder_1 = require("./RPBuilder");
class RP {
    get sessionManager() {
        return this._sessionManager;
    }
    constructor(opts) {
        var _a, _b;
        // const claims = opts.builder?.claims || opts.createRequestOpts?.payload.claims;
        this._createRequestOptions = (0, Opts_2.createRequestOptsFromBuilderOrExistingOpts)(opts);
        this._verifyResponseOptions = Object.assign({}, (0, Opts_2.createVerifyResponseOptsFromBuilderOrExistingOpts)(opts));
        this._eventEmitter = (_a = opts.builder) === null || _a === void 0 ? void 0 : _a.eventEmitter;
        this._sessionManager = (_b = opts.builder) === null || _b === void 0 ? void 0 : _b.sessionManager;
    }
    static fromRequestOpts(opts) {
        return new RP({ createRequestOpts: opts });
    }
    static builder(opts) {
        return RPBuilder_1.RPBuilder.newInstance(opts === null || opts === void 0 ? void 0 : opts.requestVersion);
    }
    createAuthorizationRequest(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizationRequestOpts = this.newAuthorizationRequestOpts(opts);
            return authorization_request_1.AuthorizationRequest.fromOpts(authorizationRequestOpts)
                .then((authorizationRequest) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_REQUEST_CREATED_SUCCESS, {
                    correlationId: opts.correlationId,
                    subject: authorizationRequest,
                });
                return authorizationRequest;
            })
                .catch((error) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_REQUEST_CREATED_FAILED, {
                    correlationId: opts.correlationId,
                    error,
                });
                throw error;
            });
        });
    }
    createAuthorizationRequestURI(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const authorizationRequestOpts = this.newAuthorizationRequestOpts(opts);
            return yield authorization_request_1.URI.fromOpts(authorizationRequestOpts)
                .then((uri) => __awaiter(this, void 0, void 0, function* () {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_REQUEST_CREATED_SUCCESS, {
                    correlationId: opts.correlationId,
                    subject: yield authorization_request_1.AuthorizationRequest.fromOpts(authorizationRequestOpts),
                });
                return uri;
            }))
                .catch((error) => {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_REQUEST_CREATED_FAILED, {
                    correlationId: opts.correlationId,
                    error,
                });
                throw error;
            });
        });
    }
    signalAuthRequestRetrieved(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.sessionManager) {
                throw Error(`Cannot signal auth request retrieval when no session manager is registered`);
            }
            const state = yield this.sessionManager.getRequestStateByCorrelationId(opts.correlationId, true);
            void this.emitEvent((opts === null || opts === void 0 ? void 0 : opts.error) ? types_1.AuthorizationEvents.ON_AUTH_REQUEST_SENT_FAILED : types_1.AuthorizationEvents.ON_AUTH_REQUEST_SENT_SUCCESS, Object.assign(Object.assign({ correlationId: opts.correlationId }, (!(opts === null || opts === void 0 ? void 0 : opts.error) ? { subject: state.request } : {})), ((opts === null || opts === void 0 ? void 0 : opts.error) ? { error: opts.error } : {})));
        });
    }
    verifyAuthorizationResponse(authorizationResponsePayload, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const state = (opts === null || opts === void 0 ? void 0 : opts.state) || this.verifyResponseOptions.state;
            let correlationId = (opts === null || opts === void 0 ? void 0 : opts.correlationId) || state;
            let authorizationResponse;
            try {
                authorizationResponse = yield authorization_response_1.AuthorizationResponse.fromPayload(authorizationResponsePayload);
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            catch (error) {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_RECEIVED_FAILED, {
                    correlationId: correlationId !== null && correlationId !== void 0 ? correlationId : (0, uuid_1.v4)(), // correlation id cannot be derived from state in payload possible, hence a uuid as fallback
                    subject: authorizationResponsePayload,
                    error,
                });
                throw error;
            }
            try {
                const verifyAuthenticationResponseOpts = yield this.newVerifyAuthorizationResponseOpts(authorizationResponse, Object.assign(Object.assign({}, opts), { correlationId }));
                correlationId = (_a = verifyAuthenticationResponseOpts.correlationId) !== null && _a !== void 0 ? _a : correlationId;
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_RECEIVED_SUCCESS, {
                    correlationId,
                    subject: authorizationResponse,
                });
                const verifiedAuthorizationResponse = yield authorizationResponse.verify(verifyAuthenticationResponseOpts);
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_VERIFIED_SUCCESS, {
                    correlationId,
                    subject: authorizationResponse,
                });
                return verifiedAuthorizationResponse;
            }
            catch (error) {
                void this.emitEvent(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_VERIFIED_FAILED, {
                    correlationId,
                    subject: authorizationResponse,
                    error,
                });
                throw error;
            }
        });
    }
    get createRequestOptions() {
        return this._createRequestOptions;
    }
    get verifyResponseOptions() {
        return this._verifyResponseOptions;
    }
    newAuthorizationRequestOpts(opts) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
        const nonceWithTarget = typeof opts.nonce === 'string'
            ? { propertyValue: opts.nonce, targets: authorization_request_1.PropertyTarget.REQUEST_OBJECT }
            : opts === null || opts === void 0 ? void 0 : opts.nonce;
        const stateWithTarget = typeof opts.state === 'string'
            ? { propertyValue: opts.state, targets: authorization_request_1.PropertyTarget.REQUEST_OBJECT }
            : opts === null || opts === void 0 ? void 0 : opts.state;
        const claimsWithTarget = (opts === null || opts === void 0 ? void 0 : opts.claims) && !('propertyValue' in opts.claims)
            ? { propertyValue: opts.claims, targets: authorization_request_1.PropertyTarget.REQUEST_OBJECT }
            : opts === null || opts === void 0 ? void 0 : opts.claims;
        const version = (_a = opts === null || opts === void 0 ? void 0 : opts.version) !== null && _a !== void 0 ? _a : this._createRequestOptions.version;
        if (!version) {
            throw Error(types_1.SIOPErrors.NO_REQUEST_VERSION);
        }
        const referenceURI = (_b = opts.requestByReferenceURI) !== null && _b !== void 0 ? _b : (_d = (_c = this._createRequestOptions) === null || _c === void 0 ? void 0 : _c.requestObject) === null || _d === void 0 ? void 0 : _d.reference_uri;
        let responseURIType = opts === null || opts === void 0 ? void 0 : opts.responseURIType;
        let responseURI = (_f = (_e = this._createRequestOptions.requestObject.payload) === null || _e === void 0 ? void 0 : _e.redirect_uri) !== null && _f !== void 0 ? _f : (_g = this._createRequestOptions.payload) === null || _g === void 0 ? void 0 : _g.redirect_uri;
        if (responseURI) {
            responseURIType = 'redirect_uri';
        }
        else {
            responseURI =
                (_k = (_h = opts.responseURI) !== null && _h !== void 0 ? _h : (_j = this._createRequestOptions.requestObject.payload) === null || _j === void 0 ? void 0 : _j.response_uri) !== null && _k !== void 0 ? _k : (_l = this._createRequestOptions.payload) === null || _l === void 0 ? void 0 : _l.response_uri;
            responseURIType = (_m = opts === null || opts === void 0 ? void 0 : opts.responseURIType) !== null && _m !== void 0 ? _m : 'response_uri';
        }
        if (!responseURI) {
            throw Error(`A response or redirect URI is required at this point`);
        }
        else {
            if (responseURIType === 'redirect_uri') {
                if ((_p = (_o = this._createRequestOptions) === null || _o === void 0 ? void 0 : _o.requestObject) === null || _p === void 0 ? void 0 : _p.payload) {
                    this._createRequestOptions.requestObject.payload.redirect_uri = responseURI;
                }
                if (!referenceURI && !((_q = this._createRequestOptions.payload) === null || _q === void 0 ? void 0 : _q.redirect_uri)) {
                    this._createRequestOptions.payload.redirect_uri = responseURI;
                }
            }
            else if (responseURIType === 'response_uri') {
                if ((_s = (_r = this._createRequestOptions) === null || _r === void 0 ? void 0 : _r.requestObject) === null || _s === void 0 ? void 0 : _s.payload) {
                    this._createRequestOptions.requestObject.payload.response_uri = responseURI;
                }
                if (!referenceURI && !((_t = this._createRequestOptions.payload) === null || _t === void 0 ? void 0 : _t.response_uri)) {
                    this._createRequestOptions.payload.response_uri = responseURI;
                }
            }
        }
        const newOpts = Object.assign(Object.assign({}, this._createRequestOptions), { version });
        newOpts.requestObject.payload = (_u = newOpts.requestObject.payload) !== null && _u !== void 0 ? _u : {};
        newOpts.payload = (_v = newOpts.payload) !== null && _v !== void 0 ? _v : {};
        if (referenceURI) {
            if (newOpts.requestObject.passBy && newOpts.requestObject.passBy !== types_1.PassBy.REFERENCE) {
                throw Error(`Cannot pass by reference with uri ${referenceURI} when mode is ${newOpts.requestObject.passBy}`);
            }
            newOpts.requestObject.reference_uri = referenceURI;
            newOpts.requestObject.passBy = types_1.PassBy.REFERENCE;
        }
        const state = (0, helpers_1.getState)(stateWithTarget.propertyValue);
        if (stateWithTarget.propertyValue) {
            if ((0, Opts_2.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.AUTHORIZATION_REQUEST, stateWithTarget.targets)) {
                newOpts.payload.state = state;
            }
            if ((0, Opts_2.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.REQUEST_OBJECT, stateWithTarget.targets)) {
                newOpts.requestObject.payload.state = state;
            }
        }
        const nonce = (0, helpers_1.getNonce)(state, nonceWithTarget.propertyValue);
        if (nonceWithTarget.propertyValue) {
            if ((0, Opts_2.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.AUTHORIZATION_REQUEST, nonceWithTarget.targets)) {
                newOpts.payload.nonce = nonce;
            }
            if ((0, Opts_2.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.REQUEST_OBJECT, nonceWithTarget.targets)) {
                newOpts.requestObject.payload.nonce = nonce;
            }
        }
        if (claimsWithTarget === null || claimsWithTarget === void 0 ? void 0 : claimsWithTarget.propertyValue) {
            if ((0, Opts_2.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.AUTHORIZATION_REQUEST, claimsWithTarget.targets)) {
                newOpts.payload.claims = Object.assign(Object.assign({}, newOpts.payload.claims), claimsWithTarget.propertyValue);
            }
            if ((0, Opts_2.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.REQUEST_OBJECT, claimsWithTarget.targets)) {
                newOpts.requestObject.payload.claims = Object.assign(Object.assign({}, newOpts.requestObject.payload.claims), claimsWithTarget.propertyValue);
            }
        }
        return newOpts;
    }
    newVerifyAuthorizationResponseOpts(authorizationResponse, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            let correlationId = (_a = opts === null || opts === void 0 ? void 0 : opts.correlationId) !== null && _a !== void 0 ? _a : this._verifyResponseOptions.correlationId;
            let state = (_b = opts === null || opts === void 0 ? void 0 : opts.state) !== null && _b !== void 0 ? _b : this._verifyResponseOptions.state;
            let nonce = (_c = opts === null || opts === void 0 ? void 0 : opts.nonce) !== null && _c !== void 0 ? _c : this._verifyResponseOptions.nonce;
            if (this.sessionManager) {
                const resNonce = (yield authorizationResponse.getMergedProperty('nonce', {
                    consistencyCheck: false,
                    hasher: (_d = opts.hasher) !== null && _d !== void 0 ? _d : this._verifyResponseOptions.hasher,
                }));
                const resState = (yield authorizationResponse.getMergedProperty('state', {
                    consistencyCheck: false,
                    hasher: (_e = opts.hasher) !== null && _e !== void 0 ? _e : this._verifyResponseOptions.hasher,
                }));
                if (resNonce && !correlationId) {
                    correlationId = yield this.sessionManager.getCorrelationIdByNonce(resNonce, false);
                }
                if (!correlationId) {
                    correlationId = yield this.sessionManager.getCorrelationIdByState(resState, false);
                }
                if (!correlationId) {
                    correlationId = nonce;
                }
                const requestState = yield this.sessionManager.getRequestStateByCorrelationId(correlationId, false);
                if (requestState) {
                    const reqNonce = yield requestState.request.getMergedProperty('nonce');
                    const reqState = yield requestState.request.getMergedProperty('state');
                    nonce = nonce !== null && nonce !== void 0 ? nonce : reqNonce;
                    state = state !== null && state !== void 0 ? state : reqState;
                }
            }
            return Object.assign(Object.assign(Object.assign({}, this._verifyResponseOptions), opts), { correlationId, audience: (_h = (_g = (_f = opts === null || opts === void 0 ? void 0 : opts.audience) !== null && _f !== void 0 ? _f : this._verifyResponseOptions.audience) !== null && _g !== void 0 ? _g : this._verifyResponseOptions.verification.resolveOpts.jwtVerifyOpts.audience) !== null && _h !== void 0 ? _h : this._createRequestOptions.payload.client_id, state,
                nonce, verification: (0, Opts_1.mergeVerificationOpts)(this._verifyResponseOptions, opts), presentationDefinitions: (_j = opts === null || opts === void 0 ? void 0 : opts.presentationDefinitions) !== null && _j !== void 0 ? _j : this._verifyResponseOptions.presentationDefinitions });
        });
    }
    emitEvent(type, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._eventEmitter) {
                try {
                    this._eventEmitter.emit(type, new types_1.AuthorizationEvent(payload));
                }
                catch (e) {
                    //Let's make sure events do not cause control flow issues
                    console.log(`Could not emit event ${type} for ${payload.correlationId} initial error if any: ${payload === null || payload === void 0 ? void 0 : payload.error}`);
                }
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
}
exports.RP = RP;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUlAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcnAvUlAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBR0EsK0JBQW9DO0FBRXBDLG9FQVFrQztBQUNsQyx3REFBc0U7QUFDdEUsc0VBQXVJO0FBQ3ZJLHdDQUFnRDtBQUNoRCxvQ0Fha0I7QUFFbEIsaUNBQTRJO0FBQzVJLDJDQUF3QztBQUd4QyxNQUFhLEVBQUU7SUFDYixJQUFJLGNBQWM7UUFDaEIsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDO0lBQzlCLENBQUM7SUFPRCxZQUFvQixJQUluQjs7UUFDQyxpRkFBaUY7UUFDakYsSUFBSSxDQUFDLHFCQUFxQixHQUFHLElBQUEsaURBQTBDLEVBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLHNCQUFzQixxQkFBUSxJQUFBLHdEQUFpRCxFQUFDLElBQUksQ0FBQyxDQUFFLENBQUM7UUFDN0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFBLElBQUksQ0FBQyxPQUFPLDBDQUFFLFlBQVksQ0FBQztRQUNoRCxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsY0FBYyxDQUFDO0lBQ3RELENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQW9DO1FBQ2hFLE9BQU8sSUFBSSxFQUFFLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxNQUFNLENBQUMsT0FBTyxDQUFDLElBQTRDO1FBQ2hFLE9BQU8scUJBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFWSwwQkFBMEIsQ0FBQyxJQVN2Qzs7WUFDQyxNQUFNLHdCQUF3QixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RSxPQUFPLDRD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