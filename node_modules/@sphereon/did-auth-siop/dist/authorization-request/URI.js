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
exports.URI = void 0;
const did_jwt_1 = require("did-jwt");
const PresentationExchange_1 = require("../authorization-response/PresentationExchange");
const helpers_1 = require("../helpers");
const request_object_1 = require("../request-object");
const types_1 = require("../types");
const AuthorizationRequest_1 = require("./AuthorizationRequest");
const Payload_1 = require("./Payload");
class URI {
    constructor({ scheme, encodedUri, encodingFormat, authorizationRequestPayload, requestObjectJwt }) {
        this._scheme = scheme;
        this._encodedUri = encodedUri;
        this._encodingFormat = encodingFormat;
        this._authorizationRequestPayload = authorizationRequestPayload;
        this._requestObjectJwt = requestObjectJwt;
    }
    static fromUri(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uri) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            const { scheme, requestObjectJwt, authorizationRequestPayload, registrationMetadata } = yield URI.parseAndResolve(uri);
            const requestObjectPayload = requestObjectJwt ? (0, did_jwt_1.decodeJWT)(requestObjectJwt).payload : undefined;
            if (requestObjectPayload) {
                (0, request_object_1.assertValidRequestObjectPayload)(requestObjectPayload);
            }
            const result = new URI({
                scheme,
                encodingFormat: types_1.UrlEncodingFormat.FORM_URL_ENCODED,
                encodedUri: uri,
                authorizationRequestPayload,
                requestObjectJwt,
            });
            result._registrationMetadataPayload = registrationMetadata;
            return result;
        });
    }
    /**
     * Create a signed URL encoded URI with a signed SIOP request token on RP side
     *
     * @param opts Request input data to build a  SIOP Request Token
     * @remarks This method is used to generate a SIOP request with info provided by the RP.
     * First it generates the request payload and then it creates the signed JWT, which is returned as a URI
     *
     * Normally you will want to use this method to create the request.
     */
    static fromOpts(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!opts) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            const authorizationRequest = yield AuthorizationRequest_1.AuthorizationRequest.fromOpts(opts);
            return yield URI.fromAuthorizationRequest(authorizationRequest);
        });
    }
    toAuthorizationRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield AuthorizationRequest_1.AuthorizationRequest.fromUriOrJwt(this);
        });
    }
    get requestObjectBy() {
        if (!this.requestObjectJwt) {
            return { passBy: types_1.PassBy.NONE };
        }
        if (this.authorizationRequestPayload.request_uri) {
            return { passBy: types_1.PassBy.REFERENCE, reference_uri: this.authorizationRequestPayload.request_uri };
        }
        return { passBy: types_1.PassBy.VALUE };
    }
    get metadataObjectBy() {
        if (!this.authorizationRequestPayload.registration_uri && !this.authorizationRequestPayload.registration) {
            return { passBy: types_1.PassBy.NONE };
        }
        if (this.authorizationRequestPayload.registration_uri) {
            return { passBy: types_1.PassBy.REFERENCE, reference_uri: this.authorizationRequestPayload.registration_uri };
        }
        return { passBy: types_1.PassBy.VALUE };
    }
    /**
     * Create a URI from the request object, typically you will want to use the createURI version!
     *
     * @remarks This method is used to generate a SIOP request Object with info provided by the RP.
     * First it generates the request object payload, and then it creates the signed JWT.
     *
     * Please note that the createURI method allows you to differentiate between OAuth2 and OpenID parameters that become
     * part of the URI and which become part of the Request Object. If you generate a URI based upon the result of this method,
     * the URI will be constructed based on the Request Object only!
     */
    static fromRequestObject(requestObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!requestObject) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            return yield URI.fromAuthorizationRequestPayload(requestObject.options, yield AuthorizationRequest_1.AuthorizationRequest.fromUriOrJwt(yield requestObject.toJwt()));
        });
    }
    static fromAuthorizationRequest(authorizationRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!authorizationRequest) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            return yield URI.fromAuthorizationRequestPayload(Object.assign(Object.assign({}, authorizationRequest.options.requestObject), { version: authorizationRequest.options.version, uriScheme: authorizationRequest.options.uriScheme }), authorizationRequest.payload, authorizationRequest.requestObject);
        });
    }
    /**
     * Creates an URI Request
     * @param opts Options to define the Uri Request
     * @param authorizationRequestPayload
     *
     */
    static fromAuthorizationRequestPayload(opts, authorizationRequestPayload, requestObject) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!authorizationRequestPayload) {
                if (!requestObject || !(yield requestObject.getPayload())) {
                    throw Error(types_1.SIOPErrors.BAD_PARAMS);
                }
                authorizationRequestPayload = {}; // No auth request payload, so the eventual URI will contain a `request_uri` or `request` value only
            }
            const isJwt = typeof authorizationRequestPayload === 'string';
            const requestObjectJwt = requestObject
                ? yield requestObject.toJwt()
                : typeof authorizationRequestPayload === 'string'
                    ? authorizationRequestPayload
                    : authorizationRequestPayload.request;
            if (isJwt && (!requestObjectJwt || !requestObjectJwt.startsWith('ey'))) {
                throw Error(types_1.SIOPErrors.NO_JWT);
            }
            const requestObjectPayload = requestObjectJwt ? (0, did_jwt_1.decodeJWT)(requestObjectJwt).payload : undefined;
            if (requestObjectPayload) {
                // Only used to validate if the request object contains presentation definition(s)
                yield PresentationExchange_1.PresentationExchange.findValidPresentationDefinitions(Object.assign(Object.assign({}, authorizationRequestPayload), requestObjectPayload));
                (0, request_object_1.assertValidRequestObjectPayload)(requestObjectPayload);
                if (requestObjectPayload.registration) {
                    (0, Payload_1.assertValidRPRegistrationMedataPayload)(requestObjectPayload.registration);
                }
            }
            const uniformAuthorizationRequestPayload = typeof authorizationRequestPayload === 'string' ? requestObjectPayload : authorizationRequestPayload;
            if (!uniformAuthorizationRequestPayload) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            const type = opts.passBy;
            if (!type) {
                throw new Error(types_1.SIOPErrors.REQUEST_OBJECT_TYPE_NOT_SET);
            }
            const authorizationRequest = yield AuthorizationRequest_1.AuthorizationRequest.fromUriOrJwt(requestObjectJwt);
            let scheme;
            if (opts.uriScheme) {
                scheme = opts.uriScheme.endsWith('://') ? opts.uriScheme : `${opts.uriScheme}://`;
            }
            else if (opts.version) {
                if (opts.version === types_1.SupportedVersion.JWT_VC_PRESENTATION_PROFILE_v1) {
                    scheme = 'openid-vc://';
                }
                else {
                    scheme = 'openid://';
                }
            }
            else {
                try {
                    scheme =
                        (yield authorizationRequest.getSupportedVersion()) === types_1.SupportedVersion.JWT_VC_PRESENTATION_PROFILE_v1 ? 'openid-vc://' : 'openid://';
                }
                catch (error) {
                    scheme = 'openid://';
                }
            }
            if (type === types_1.PassBy.REFERENCE) {
                if (!opts.reference_uri) {
                    throw new Error(types_1.SIOPErrors.NO_REFERENCE_URI);
                }
                uniformAuthorizationRequestPayload.request_uri = opts.reference_uri;
                delete uniformAuthorizationRequestPayload.request;
            }
            else if (type === types_1.PassBy.VALUE) {
                uniformAuthorizationRequestPayload.request = requestObjectJwt;
                delete uniformAuthorizationRequestPayload.request_uri;
            }
            return new URI({
                scheme,
                encodedUri: `${scheme}?${(0, helpers_1.encodeJsonAsURI)(uniformAuthorizationRequestPayload)}`,
                encodingFormat: types_1.UrlEncodingFormat.FORM_URL_ENCODED,
                // requestObjectBy: opts.requestBy,
                authorizationRequestPayload: uniformAuthorizationRequestPayload,
                requestObjectJwt: requestObjectJwt,
            });
        });
    }
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param uri
     */
    static parse(uri) {
        if (!uri) {
            throw Error(types_1.SIOPErrors.BAD_PARAMS);
        }
        // We strip the uri scheme before passing it to the decode function
        const scheme = uri.match(/^([a-zA-Z][a-zA-Z0-9-_]*:\/\/)/g)[0];
        const authorizationRequestPayload = (0, helpers_1.decodeUriAsJson)(uri);
        return { scheme, authorizationRequestPayload };
    }
    static parseAndResolve(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!uri) {
                throw Error(types_1.SIOPErrors.BAD_PARAMS);
            }
            const { authorizationRequestPayload, scheme } = this.parse(uri);
            const requestObjectJwt = yield (0, helpers_1.fetchByReferenceOrUseByValue)(authorizationRequestPayload.request_uri, authorizationRequestPayload.request, true);
            const registrationMetadata = yield (0, helpers_1.fetchByReferenceOrUseByValue)((_a = authorizationRequestPayload['client_metadata_uri']) !== null && _a !== void 0 ? _a : authorizationRequestPayload['registration_uri'], (_b = authorizationRequestPayload['client_metadata']) !== null && _b !== void 0 ? _b : authorizationRequestPayload['registration']);
            (0, Payload_1.assertValidRPRegistrationMedataPayload)(registrationMetadata);
            return { scheme, authorizationRequestPayload, requestObjectJwt, registrationMetadata };
        });
    }
    get encodingFormat() {
        return this._encodingFormat;
    }
    get encodedUri() {
        return this._encodedUri;
    }
    get authorizationRequestPayload() {
        return this._authorizationRequestPayload;
    }
    get requestObjectJwt() {
        return this._requestObjectJwt;
    }
    get scheme() {
        return this._scheme;
    }
    get registrationMetadataPayload() {
        return this._registrationMetadataPayload;
    }
}
exports.URI = URI;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVJJLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2F1dGhvcml6YXRpb24tcmVxdWVzdC9VUkkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQW9DO0FBRXBDLHlGQUFzRjtBQUN0Rix3Q0FBNEY7QUFDNUYsc0RBQW1GO0FBQ25GLG9DQVdrQjtBQUVsQixpRUFBOEQ7QUFDOUQsdUNBQW1FO0FBR25FLE1BQWEsR0FBRztJQVVkLFlBQW9CLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsMkJBQTJCLEVBQUUsZ0JBQWdCLEVBQW9DO1FBQ3pJLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLElBQUksQ0FBQyw0QkFBNEIsR0FBRywyQkFBMkIsQ0FBQztRQUNoRSxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7SUFDNUMsQ0FBQztJQUVNLE1BQU0sQ0FBTyxPQUFPLENBQUMsR0FBVzs7WUFDckMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUNULE1BQU0sS0FBSyxDQUFDLGtCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNELE1BQU0sRUFBRSxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsMkJBQTJCLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkgsTUFBTSxvQkFBb0IsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUUsSUFBQSxtQkFBUyxFQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBZ0MsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQzFILElBQUksb0JBQW9CLEVBQUUsQ0FBQztnQkFDekIsSUFBQSxnREFBK0IsRUFBQyxvQkFB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