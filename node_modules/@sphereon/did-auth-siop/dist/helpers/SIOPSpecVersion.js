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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSIOPSpecVersionSupported = exports.authorizationRequestVersionDiscovery = void 0;
const schemas_1 = require("../schemas");
const schemaValidation_1 = require("../schemas/validation/schemaValidation");
const types_1 = require("../types");
const Errors_1 = __importDefault(require("../types/Errors"));
const validateJWTVCPresentationProfile = schemas_1.AuthorizationRequestPayloadVID1Schema;
function isJWTVC1Payload(authorizationRequest) {
    return (authorizationRequest.scope &&
        authorizationRequest.scope.toLowerCase().includes('openid') &&
        authorizationRequest.response_type &&
        authorizationRequest.response_type.toLowerCase().includes('id_token') &&
        authorizationRequest.response_mode &&
        authorizationRequest.response_mode.toLowerCase() === 'post' &&
        authorizationRequest.client_id &&
        authorizationRequest.client_id.toLowerCase().startsWith('did:') &&
        authorizationRequest.redirect_uri &&
        (authorizationRequest.registration_uri || authorizationRequest.registration) &&
        authorizationRequest.claims &&
        'vp_token' in authorizationRequest.claims);
}
function isID1Payload(authorizationRequest) {
    return (!authorizationRequest.client_metadata_uri &&
        !authorizationRequest.client_metadata &&
        !authorizationRequest.presentation_definition &&
        !authorizationRequest.presentation_definition_uri);
}
const authorizationRequestVersionDiscovery = (authorizationRequest) => {
    const versions = [];
    const authorizationRequestCopy = JSON.parse(JSON.stringify(authorizationRequest));
    // todo: We could use v11 validation for v12 for now, as we do not differentiate in the schema at this point\
    const vd12Validation = (0, schemaValidation_1.AuthorizationRequestPayloadVD12OID4VPD18Schema)(authorizationRequestCopy);
    if (vd12Validation) {
        if (!authorizationRequestCopy.registration_uri &&
            !authorizationRequestCopy.registration &&
            !(authorizationRequestCopy.claims && 'vp_token' in authorizationRequestCopy.claims) &&
            authorizationRequestCopy.response_mode !== types_1.ResponseMode.POST // Post has been replaced by direct post
        ) {
            versions.push(types_1.SupportedVersion.SIOPv2_D12_OID4VP_D18);
        }
    }
    const vd11Validation = (0, schemas_1.AuthorizationRequestPayloadVD11Schema)(authorizationRequestCopy);
    if (vd11Validation) {
        if (!authorizationRequestCopy.registration_uri &&
            !authorizationRequestCopy.registration &&
            !(authorizationRequestCopy.claims && 'vp_token' in authorizationRequestCopy.claims) &&
            !authorizationRequestCopy.client_id_scheme && // introduced after v11
            !authorizationRequestCopy.response_uri &&
            authorizationRequestCopy.response_mode !== types_1.ResponseMode.DIRECT_POST // Direct post was used before v12 oid4vp18
        ) {
            versions.push(types_1.SupportedVersion.SIOPv2_D11);
        }
    }
    const jwtVC1Validation = validateJWTVCPresentationProfile(authorizationRequestCopy);
    if (jwtVC1Validation && isJWTVC1Payload(authorizationRequest)) {
        versions.push(types_1.SupportedVersion.JWT_VC_PRESENTATION_PROFILE_v1);
    }
    const vid1Validation = (0, schemas_1.AuthorizationRequestPayloadVID1Schema)(authorizationRequestCopy);
    if (vid1Validation && isID1Payload(authorizationRequest)) {
        versions.push(types_1.SupportedVersion.SIOPv2_ID1);
    }
    if (versions.length === 0) {
        throw new Error(Errors_1.default.SIOP_VERSION_NOT_SUPPORTED);
    }
    return versions;
};
exports.authorizationRequestVersionDiscovery = authorizationRequestVersionDiscovery;
const checkSIOPSpecVersionSupported = (payload, supportedVersions) => __awaiter(void 0, void 0, void 0, function* () {
    const versions = (0, exports.authorizationRequestVersionDiscovery)(payload);
    if (!supportedVersions || supportedVersions.length === 0) {
        return versions;
    }
    return supportedVersions.filter((version) => versions.includes(version));
});
exports.checkSIOPSpecVersionSupported = checkSIOPSpecVersionSupported;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lPUFNwZWNWZXJzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvU0lPUFNwZWNWZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHdDQUEwRztBQUMxRyw2RUFBd0c7QUFDeEcsb0NBQXVGO0FBQ3ZGLDZEQUFxQztBQUVyQyxNQUFNLGdDQUFnQyxHQUFHLCtDQUFxQyxDQUFDO0FBRS9FLFNBQVMsZUFBZSxDQUFDLG9CQUFpRDtJQUN4RSxPQUFPLENBQ0wsb0JBQW9CLENBQUMsS0FBSztRQUMxQixvQkFBb0IsQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztRQUMzRCxvQkFBb0IsQ0FBQyxhQUFhO1FBQ2xDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO1FBQ3JFLG9CQUFvQixDQUFDLGFBQWE7UUFDbEMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLE1BQU07UUFDM0Qsb0JBQW9CLENBQUMsU0FBUztRQUM5QixvQkFBb0IsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQztRQUMvRCxvQkFBb0IsQ0FBQyxZQUFZO1FBQ2pDLENBQUMsb0JBQW9CLENBQUMsZ0JBQWdCLElBQUksb0JBQW9CLENBQUMsWUFBWSxDQUFDO1FBQzVFLG9CQUFvQixDQUFDLE1BQU07UUFDM0IsVUFBVSxJQUFJLG9CQUFvQixDQUFDLE1BQU0sQ0FDMUMsQ0FBQztBQUNKLENBQUM7QUFDRCxTQUFTLFlBQVksQ0FBQyxvQkFBaUQ7SUFDckUsT0FBTyxDQUNMLENBQUMsb0JBQW9CLENBQUMsbUJBQW1CO1FBQ3pDLENBQUMsb0JBQW9CLENBQUMsZUFBZTtRQUNyQyxDQUFDLG9CQUFvQixDQUFDLHVCQUF1QjtRQUM3QyxDQUFDLG9CQUFvQixD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