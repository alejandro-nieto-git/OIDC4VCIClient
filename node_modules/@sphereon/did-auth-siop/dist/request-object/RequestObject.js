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
exports.RequestObject = void 0;
const did_jwt_1 = require("did-jwt");
const Opts_1 = require("../authorization-request/Opts");
const did_1 = require("../did");
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const Opts_2 = require("./Opts");
const Payload_1 = require("./Payload");
class RequestObject {
    constructor(opts, payload, jwt) {
        this.opts = opts ? RequestObject.mergeOAuth2AndOpenIdProperties(opts) : undefined;
        this.payload = payload;
        this.jwt = jwt;
    }
    /**
     * Create a request object that typically is used as a JWT on RP side, typically this method is called automatically when creating an Authorization Request, but you could use it directly!
     *
     * @param authorizationRequestOpts Request Object options to build a Request Object
     * @remarks This method is used to generate a SIOP request Object.
     * First it generates the request object payload, and then it a signed JWT can be accessed on request.
     *
     * Normally you will want to use the Authorization Request class. That class creates a URI that includes the JWT from this class in the URI
     * If you do use this class directly, you can call the `convertRequestObjectToURI` afterwards to get the URI.
     * Please note that the Authorization Request allows you to differentiate between OAuth2 and OpenID parameters that become
     * part of the URI and which become part of the Request Object. If you generate a URI based upon the result of this class,
     * the URI will be constructed based on the Request Object only!
     */
    static fromOpts(authorizationRequestOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, Opts_1.assertValidAuthorizationRequestOpts)(authorizationRequestOpts);
            const signature = authorizationRequestOpts.requestObject.signature; // We copy the signature separately as it can contain a function, which would be removed in the merge function below
            const requestObjectOpts = RequestObject.mergeOAuth2AndOpenIdProperties(authorizationRequestOpts);
            const mergedOpts = Object.assign(Object.assign({}, authorizationRequestOpts), { requestObject: Object.assign(Object.assign(Object.assign({}, authorizationRequestOpts.requestObject), requestObjectOpts), { signature }) });
            return new RequestObject(mergedOpts, yield (0, Payload_1.createRequestObjectPayload)(mergedOpts));
        });
    }
    static fromJwt(requestObjectJwt) {
        return __awaiter(this, void 0, void 0, function* () {
            return requestObjectJwt ? new RequestObject(undefined, undefined, requestObjectJwt) : undefined;
        });
    }
    static fromPayload(requestObjectPayload, authorizationRequestOpts) {
        return __awaiter(this, void 0, void 0, function* () {
            return new RequestObject(authorizationRequestOpts, requestObjectPayload);
        });
    }
    static fromAuthorizationRequestPayload(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestObjectJwt = payload.request || payload.request_uri ? yield (0, helpers_1.fetchByReferenceOrUseByValue)(payload.request_uri, payload.request, true) : undefined;
            return requestObjectJwt ? yield RequestObject.fromJwt(requestObjectJwt) : undefined;
        });
    }
    toJwt() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.jwt) {
                if (!this.opts) {
                    throw Error(types_1.SIOPErrors.BAD_PARAMS);
                }
                else if (!this.payload) {
                    return undefined;
                }
                this.removeRequestProperties();
                if (this.payload.registration_uri) {
                    delete this.payload.registration;
                }
                (0, Payload_1.assertValidRequestObjectPayload)(this.payload);
                this.jwt = yield (0, did_1.signRequestObjectPayload)(this.payload, this.opts);
            }
            return this.jwt;
        });
    }
    getPayload() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.payload) {
                if (!this.jwt) {
                    return undefined;
                }
                this.payload = (0, helpers_1.removeNullUndefined)((0, did_jwt_1.decodeJWT)(this.jwt).payload);
                this.removeRequestProperties();
                if (this.payload.registration_uri) {
                    delete this.payload.registration;
                }
                else if (this.payload.registration) {
                    delete this.payload.registration_uri;
                }
            }
            (0, Payload_1.assertValidRequestObjectPayload)(this.payload);
            return this.payload;
        });
    }
    assertValid() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options) {
                (0, Opts_2.assertValidRequestObjectOpts)(this.options, false);
            }
            (0, Payload_1.assertValidRequestObjectPayload)(yield this.getPayload());
        });
    }
    get options() {
        return this.opts;
    }
    removeRequestProperties() {
        if (this.payload) {
            // https://openid.net/specs/openid-connect-core-1_0.html#RequestObject
            // request and request_uri parameters MUST NOT be included in Request Objects.
            delete this.payload.request;
            delete this.payload.request_uri;
        }
    }
    static mergeOAuth2AndOpenIdProperties(opts) {
        var _a, _b, _c;
        if (!opts) {
            throw Error(types_1.SIOPErrors.BAD_PARAMS);
        }
        const isAuthReq = opts['requestObject'] !== undefined;
        const mergedOpts = JSON.parse(JSON.stringify(opts));
        const signature = (_b = (_a = opts['requestObject']) === null || _a === void 0 ? void 0 : _a.signature) === null || _b === void 0 ? void 0 : _b.signature;
        if (signature && mergedOpts.requestObject.signature) {
            mergedOpts.requestObject.signature.signature = signature;
        }
        (_c = mergedOpts === null || mergedOpts === void 0 ? void 0 : mergedOpts.request) === null || _c === void 0 ? true : delete _c.requestObject;
        return isAuthReq ? mergedOpts.requestObject : mergedOpts;
    }
}
exports.RequestObject = RequestObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdE9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXF1ZXN0LW9iamVjdC9SZXF1ZXN0T2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUFvQztBQUdwQyx3REFBb0Y7QUFDcEYsZ0NBQWtEO0FBQ2xELHdDQUErRTtBQUMvRSxvQ0FBMkc7QUFFM0csaUNBQXNEO0FBQ3RELHVDQUF3RjtBQUd4RixNQUFhLGFBQWE7SUFLeEIsWUFDRSxJQUF3RyxFQUN4RyxPQUE4QixFQUM5QixHQUFZO1FBRVosSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSSxNQUFNLENBQU8sUUFBUSxDQUFDLHdCQUF3RDs7WUFDbkYsSUFBQSwwQ0FBbUMsRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzlELE1BQU0sU0FBUyxHQUFHLHdCQUF3QixDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxvSEFBb0g7WUFDeEwsTUFBTSxpQkFBaUIsR0FBRyxhQUFhLENBQUMsOEJBQThCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUNqRyxNQUFNLFVBQVUsbUNBQ1gsd0JBQXdCLEtBQzNCLGFBQWEsZ0RBQU8sd0JBQXdCLENBQUMsYUFBYSxHQUFLLGlCQUFpQixLQUFFLFNBQVMsTUFDNUYsQ0FBQztZQUNGLE9BQU8sSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFLE1BQU0sSUFBQSxvQ0FBMEIsRUFBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7S0FBQTtJQUVNLE1BQU0sQ0FB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