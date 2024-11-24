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
exports.checkWellknownDIDFromRequest = exports.assertValidRPRegistrationMedataPayload = exports.createAuthorizationRequestPayload = exports.createPresentationDefinitionClaimsProperties = void 0;
const pex_1 = require("@sphereon/pex");
const did_1 = require("../did");
const helpers_1 = require("../helpers");
const Opts_1 = require("../rp/Opts");
const schemas_1 = require("../schemas");
const types_1 = require("../types");
const RequestRegistration_1 = require("./RequestRegistration");
const types_2 = require("./types");
const createPresentationDefinitionClaimsProperties = (opts) => {
    if (!opts || !opts.vp_token || (!opts.vp_token.presentation_definition && !opts.vp_token.presentation_definition_uri)) {
        return undefined;
    }
    const discoveryResult = pex_1.PEX.definitionVersionDiscovery(opts.vp_token.presentation_definition);
    if (discoveryResult.error) {
        throw new Error(types_1.SIOPErrors.REQUEST_CLAIMS_PRESENTATION_DEFINITION_NOT_VALID);
    }
    return Object.assign(Object.assign({}, (opts.id_token ? { id_token: opts.id_token } : {})), ((opts.vp_token.presentation_definition || opts.vp_token.presentation_definition_uri) && {
        vp_token: Object.assign(Object.assign({}, (!opts.vp_token.presentation_definition_uri && { presentation_definition: opts.vp_token.presentation_definition })), (opts.vp_token.presentation_definition_uri && { presentation_definition_uri: opts.vp_token.presentation_definition_uri })),
    }));
};
exports.createPresentationDefinitionClaimsProperties = createPresentationDefinitionClaimsProperties;
const createAuthorizationRequestPayload = (opts, requestObject) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const payload = opts.payload;
    const state = (_a = payload === null || payload === void 0 ? void 0 : payload.state) !== null && _a !== void 0 ? _a : undefined;
    const nonce = (payload === null || payload === void 0 ? void 0 : payload.nonce) ? (0, helpers_1.getNonce)(state, payload.nonce) : undefined;
    // TODO: if opts['registration] throw Error to get rid of test code using that key
    const clientMetadata = opts['registration'] ? opts['registration'] : opts.clientMetadata;
    const registration = yield (0, RequestRegistration_1.createRequestRegistration)(clientMetadata, opts);
    const claims = opts.version >= types_1.SupportedVersion.SIOPv2_ID1 ? opts.payload.claims : (0, exports.createPresentationDefinitionClaimsProperties)(opts.payload.claims);
    const isRequestTarget = (0, Opts_1.isTargetOrNoTargets)(types_2.PropertyTarget.AUTHORIZATION_REQUEST, opts.requestObject.targets);
    const isRequestByValue = opts.requestObject.passBy === types_1.PassBy.VALUE;
    if (isRequestTarget && isRequestByValue && !requestObject) {
        throw Error(types_1.SIOPErrors.NO_JWT);
    }
    const request = isRequestByValue ? yield requestObject.toJwt() : undefined;
    const authRequestPayload = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, payload), (isRequestTarget && opts.requestObject.passBy === types_1.PassBy.REFERENCE ? { request_uri: opts.requestObject.reference_uri } : {})), (isRequestTarget && isRequestByValue && { request })), (nonce && { nonce })), (state && { state })), (registration.payload && (0, Opts_1.isTarget)(types_2.PropertyTarget.AUTHORIZATION_REQUEST, registration.clientMetadataOpts.targets) ? registration.payload : {})), (claims && { claims }));
    return (0, helpers_1.removeNullUndefined)(authRequestPayload);
});
exports.createAuthorizationRequestPayload = createAuthorizationRequestPayload;
const assertValidRPRegistrationMedataPayload = (regObj) => {
    if (regObj) {
        const valid = (0, schemas_1.RPRegistrationMetadataPayloadSchema)(regObj);
        if (!valid) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            throw new Error('Registration data validation error: ' + JSON.stringify(schemas_1.RPRegistrationMetadataPayloadSchema.errors));
        }
    }
    if ((regObj === null || regObj === void 0 ? void 0 : regObj.subject_syntax_types_supported) && regObj.subject_syntax_types_supported.length == 0) {
        throw new Error(`${types_1.SIOPErrors.VERIFY_BAD_PARAMS}`);
    }
};
exports.assertValidRPRegistrationMedataPayload = assertValidRPRegistrationMedataPayload;
const checkWellknownDIDFromRequest = (authorizationRequestPayload, opts) => __awaiter(void 0, void 0, void 0, function* () {
    if (authorizationRequestPayload.client_id.startsWith('did:')) {
        if (opts.verification.checkLinkedDomain && opts.verification.checkLinkedDomain != types_1.CheckLinkedDomain.NEVER) {
            yield (0, did_1.validateLinkedDomainWithDid)(authorizationRequestPayload.client_id, opts.verification);
        }
        else if (!opts.verification.checkLinkedDomain && opts.verification.wellknownDIDVerifyCallback) {
            yield (0, did_1.validateLinkedDomainWithDid)(authorizationRequestPayload.client_id, opts.verification);
        }
    }
});
exports.checkWellknownDIDFromRequest = checkWellknownDIDFromRequest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRob3JpemF0aW9uLXJlcXVlc3QvUGF5bG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx1Q0FBb0M7QUFFcEMsZ0NBQXFEO0FBQ3JELHdDQUEyRDtBQUUzRCxxQ0FBMkQ7QUFDM0Qsd0NBQWlFO0FBQ2pFLG9DQVVrQjtBQUVsQiwrREFBa0U7QUFDbEUsbUNBQStIO0FBRXhILE1BQU0sNENBQTRDLEdBQUcsQ0FBQyxJQUEwQixFQUFvQixFQUFFO0lBQzNHLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUM7UUFDdEgsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNELE1BQU0sZUFBZSxHQUFHLFNBQUcsQ0FBQywwQkFBMEIsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDOUYsSUFBSSxlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLGdEQUFnRCxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUVELHVDQUNLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FDbEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQXVCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQywyQkFBMkIsQ0FBQyxJQUFJO1FBQzFGLFFBQVEsa0NBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsMkJBQTJCLElBQUksRUFBRSx1QkFB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