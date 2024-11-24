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
exports.createIDTokenPayload = void 0;
const authorization_response_1 = require("../authorization-response");
const Opts_1 = require("../authorization-response/Opts");
const SIOPSpecVersion_1 = require("../helpers/SIOPSpecVersion");
const types_1 = require("../types");
const createIDTokenPayload = (verifiedAuthorizationRequest, responseOpts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f;
    yield (0, Opts_1.assertValidResponseOpts)(responseOpts);
    const authorizationRequestPayload = yield verifiedAuthorizationRequest.authorizationRequest.mergedPayloads();
    const requestObject = verifiedAuthorizationRequest.requestObject;
    if (!authorizationRequestPayload) {
        throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
    }
    const payload = yield (0, authorization_response_1.mergeOAuth2AndOpenIdInRequestPayload)(authorizationRequestPayload, requestObject);
    const supportedDidMethods = (_c = (_b = (_a = verifiedAuthorizationRequest.registrationMetadataPayload) === null || _a === void 0 ? void 0 : _a.subject_syntax_types_supported) === null || _b === void 0 ? void 0 : _b.filter((sst) => sst.includes(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()))) !== null && _c !== void 0 ? _c : [];
    const state = payload.state;
    const nonce = payload.nonce;
    const SEC_IN_MS = 1000;
    const rpSupportedVersions = (0, SIOPSpecVersion_1.authorizationRequestVersionDiscovery)(payload);
    const maxRPVersion = rpSupportedVersions.reduce((previous, current) => (current.valueOf() > previous.valueOf() ? current : previous), types_1.SupportedVersion.SIOPv2_D12_OID4VP_D18);
    if (responseOpts.version && rpSupportedVersions.length > 0 && !rpSupportedVersions.includes(responseOpts.version)) {
        throw Error(`RP does not support spec version ${responseOpts.version}, supported versions: ${rpSupportedVersions.toString()}`);
    }
    const opVersion = (_d = responseOpts.version) !== null && _d !== void 0 ? _d : maxRPVersion;
    const idToken = Object.assign(Object.assign({ 
        // fixme: ID11 does not use this static value anymore
        iss: (_f = (_e = responseOpts === null || responseOpts === void 0 ? void 0 : responseOpts.registration) === null || _e === void 0 ? void 0 : _e.issuer) !== null && _f !== void 0 ? _f : (opVersion === types_1.SupportedVersion.JWT_VC_PRESENTATION_PROFILE_v1 ? types_1.ResponseIss.JWT_VC_PRESENTATION_V1 : types_1.ResponseIss.SELF_ISSUED_V2), aud: responseOpts.audience || payload.client_id, iat: Math.round(Date.now() / SEC_IN_MS - 60 * SEC_IN_MS), exp: Math.round(Date.now() / SEC_IN_MS + (responseOpts.expiresIn || 600)), sub: responseOpts.signature.did }, (payload.auth_time && { auth_time: payload.auth_time })), { nonce,
        state });
    if (supportedDidMethods.indexOf(types_1.SubjectSyntaxTypesSupportedValues.JWK_THUMBPRINT) != -1 && !responseOpts.signature.did) {
        const { thumbprint, subJwk } = yield createThumbprintAndJWK(responseOpts);
        idToken['sub_jwk'] = subJwk;
        idToken.sub = thumbprint;
    }
    return idToken;
});
exports.createIDTokenPayload = createIDTokenPayload;
const createThumbprintAndJWK = (resOpts) => __awaiter(void 0, void 0, void 0, function* () {
    let thumbprint;
    let subJwk;
    /*  if (isInternalSignature(resOpts.signature)) {
      thumbprint = await getThumbprint(resOpts.signature.hexPrivateKey, resOpts.signature.did);
      subJwk = getPublicJWKFromHexPrivateKey(
        resOpts.signature.hexPrivateKey,
        resOpts.signature.kid || `${resOpts.signature.did}#key-1`,
        resOpts.signature.did
      );
    } else*/ if ((0, types_1.isSuppliedSignature)(resOpts.signature)) {
        // fixme: These are uninitialized. Probably we have to extend the supplied withSignature to provide these.
        return { thumbprint, subJwk };
    }
    else {
        throw new Error(types_1.SIOPErrors.SIGNATURE_OBJECT_TYPE_NOT_SET);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pZC10b2tlbi9QYXlsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHNFQUE0RztBQUM1Ryx5REFBeUU7QUFDekUsZ0VBQWtGO0FBQ2xGLG9DQVNrQjtBQUVYLE1BQU0sb0JBQW9CLEdBQUcsQ0FDbEMsNEJBQTBELEVBQzFELFlBQXVDLEVBQ2QsRUFBRTs7SUFDM0IsTUFBTSxJQUFBLDhCQUF1QixFQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzVDLE1BQU0sMkJBQTJCLEdBQUcsTUFBTSw0QkFBNEIsQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUM3RyxNQUFNLGFBQWEsR0FBRyw0QkFBNEIsQ0FBQyxhQUFhLENBQUM7SUFDakUsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBQSw2REFBb0MsRUFBQywyQkFBMkIsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUV2RyxNQUFNLG1CQUFtQixHQUN2QixNQUFBLE1BQUEsTUFBQSw0QkFBNEIsQ0FBQywyQkFBMkIsMENBQUUsOEJBQThCLDBDQUFFLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQ3ZHLEdBQUcsQ0FBQyxRQUFRLENBQUMseUNBQWlDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQzlELG1DQUFJLEVBQUUsQ0FBQztJQUNWLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7SUFDNUIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztJQUM1QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFFdkIsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLHNEQUFvQyxFQUFD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