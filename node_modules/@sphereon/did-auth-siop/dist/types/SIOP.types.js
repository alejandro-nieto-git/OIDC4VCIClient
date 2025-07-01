"use strict";
// noinspection JSUnusedGlobalSymbols
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentType = exports.SupportedVersion = exports.RevocationVerification = exports.RevocationStatus = exports.isPresentation = exports.isVP = exports.isExternalVerification = exports.isInternalVerification = exports.isResponsePayload = exports.isRequestPayload = exports.isResponseOpts = exports.isRequestOpts = exports.isNoSignature = exports.isSuppliedSignature = exports.isExternalSignature = exports.isInternalSignature = exports.ResponseIss = exports.Schema = exports.SubjectType = exports.CredentialFormat = exports.SubjectSyntaxTypesSupportedValues = exports.SubjectIdentifierType = exports.ResponseType = exports.Scope = exports.SigningAlgo = exports.TokenEndpointAuthMethod = exports.KeyCurve = exports.KeyType = exports.UrlEncodingFormat = exports.ProtocolFlow = exports.ResponseMode = exports.GrantType = exports.VerificationMode = exports.CheckLinkedDomain = exports.ResponseContext = exports.PassBy = exports.EncKeyAlgorithm = exports.EncSymmetricAlgorithmCode = exports.VerifiableCredentialTypeFormat = exports.VerifiablePresentationTypeFormat = exports.IdTokenType = exports.ClaimType = exports.AuthenticationContextReferences = exports.DEFAULT_EXPIRATION_TIME = void 0;
exports.DEFAULT_EXPIRATION_TIME = 10 * 60;
var AuthenticationContextReferences;
(function (AuthenticationContextReferences) {
    AuthenticationContextReferences["PHR"] = "phr";
    AuthenticationContextReferences["PHRH"] = "phrh";
})(AuthenticationContextReferences || (exports.AuthenticationContextReferences = AuthenticationContextReferences = {}));
var ClaimType;
(function (ClaimType) {
    ClaimType["NORMAL"] = "normal";
    ClaimType["AGGREGATED"] = "aggregated";
    ClaimType["DISTRIBUTED"] = "distributed";
})(ClaimType || (exports.ClaimType = ClaimType = {}));
var IdTokenType;
(function (IdTokenType) {
    IdTokenType["SUBJECT_SIGNED"] = "subject_signed";
    IdTokenType["ATTESTER_SIGNED"] = "attester_signed";
})(IdTokenType || (exports.IdTokenType = IdTokenType = {}));
var VerifiablePresentationTypeFormat;
(function (VerifiablePresentationTypeFormat) {
    VerifiablePresentationTypeFormat["JWT_VP"] = "jwt_vp";
    VerifiablePresentationTypeFormat["LDP_VP"] = "ldp_vp";
    VerifiablePresentationTypeFormat["SD_JWT_VC"] = "vc+sd-jwt";
})(VerifiablePresentationTypeFormat || (exports.VerifiablePresentationTypeFormat = VerifiablePresentationTypeFormat = {}));
var VerifiableCredentialTypeFormat;
(function (VerifiableCredentialTypeFormat) {
    VerifiableCredentialTypeFormat["LDP_VC"] = "ldp_vc";
    VerifiableCredentialTypeFormat["JWT_VC"] = "jwt_vc";
    VerifiableCredentialTypeFormat["SD_JWT_VC"] = "vc+sd-jwt";
})(VerifiableCredentialTypeFormat || (exports.VerifiableCredentialTypeFormat = VerifiableCredentialTypeFormat = {}));
var EncSymmetricAlgorithmCode;
(function (EncSymmetricAlgorithmCode) {
    EncSymmetricAlgorithmCode["XC20P"] = "XC20P";
})(EncSymmetricAlgorithmCode || (exports.EncSymmetricAlgorithmCode = EncSymmetricAlgorithmCode = {}));
var EncKeyAlgorithm;
(function (EncKeyAlgorithm) {
    EncKeyAlgorithm["ECDH_ES"] = "ECDH-ES";
})(EncKeyAlgorithm || (exports.EncKeyAlgorithm = EncKeyAlgorithm = {}));
var PassBy;
(function (PassBy) {
    PassBy["NONE"] = "NONE";
    PassBy["REFERENCE"] = "REFERENCE";
    PassBy["VALUE"] = "VALUE";
})(PassBy || (exports.PassBy = PassBy = {}));
var ResponseContext;
(function (ResponseContext) {
    ResponseContext["RP"] = "rp";
    ResponseContext["OP"] = "op";
})(ResponseContext || (exports.ResponseContext = ResponseContext = {}));
var CheckLinkedDomain;
(function (CheckLinkedDomain) {
    CheckLinkedDomain["NEVER"] = "never";
    CheckLinkedDomain["IF_PRESENT"] = "if_present";
    CheckLinkedDomain["ALWAYS"] = "always";
})(CheckLinkedDomain || (exports.CheckLinkedDomain = CheckLinkedDomain = {}));
var VerificationMode;
(function (VerificationMode) {
    VerificationMode[VerificationMode["INTERNAL"] = 0] = "INTERNAL";
    VerificationMode[VerificationMode["EXTERNAL"] = 1] = "EXTERNAL";
})(VerificationMode || (exports.VerificationMode = VerificationMode = {}));
var GrantType;
(function (GrantType) {
    GrantType["AUTHORIZATION_CODE"] = "authorization_code";
    GrantType["IMPLICIT"] = "implicit";
})(GrantType || (exports.GrantType = GrantType = {}));
var ResponseMode;
(function (ResponseMode) {
    ResponseMode["FRAGMENT"] = "fragment";
    ResponseMode["FORM_POST"] = "form_post";
    ResponseMode["POST"] = "post";
    // Defined in openid4vp spec > 17 and replaces POST above
    // See https://openid.net/specs/openid-4-verifiable-presentations-1_0.html#name-response-mode-direct_post
    ResponseMode["DIRECT_POST"] = "direct_post";
    ResponseMode["QUERY"] = "query";
})(ResponseMode || (exports.ResponseMode = ResponseMode = {}));
var ProtocolFlow;
(function (ProtocolFlow) {
    ProtocolFlow["SAME_DEVICE"] = "same_device";
    ProtocolFlow["CROSS_DEVICE"] = "cross_device";
})(ProtocolFlow || (exports.ProtocolFlow = ProtocolFlow = {}));
var UrlEncodingFormat;
(function (UrlEncodingFormat) {
    UrlEncodingFormat["FORM_URL_ENCODED"] = "application/x-www-form-urlencoded";
})(UrlEncodingFormat || (exports.UrlEncodingFormat = UrlEncodingFormat = {}));
var KeyType;
(function (KeyType) {
    KeyType["EC"] = "EC";
})(KeyType || (exports.KeyType = KeyType = {}));
var KeyCurve;
(function (KeyCurve) {
    KeyCurve["SECP256k1"] = "secp256k1";
    KeyCurve["ED25519"] = "ed25519";
})(KeyCurve || (exports.KeyCurve = KeyCurve = {}));
var TokenEndpointAuthMethod;
(function (TokenEndpointAuthMethod) {
    TokenEndpointAuthMethod["CLIENT_SECRET_POST"] = "client_secret_post";
    TokenEndpointAuthMethod["CLIENT_SECRET_BASIC"] = "client_secret_basic";
    TokenEndpointAuthMethod["CLIENT_SECRET_JWT"] = "client_secret_jwt";
    TokenEndpointAuthMethod["PRIVATE_KEY_JWT"] = "private_key_jwt";
})(TokenEndpointAuthMethod || (exports.TokenEndpointAuthMethod = TokenEndpointAuthMethod = {}));
var SigningAlgo;
(function (SigningAlgo) {
    SigningAlgo["EDDSA"] = "EdDSA";
    SigningAlgo["RS256"] = "RS256";
    SigningAlgo["PS256"] = "PS256";
    SigningAlgo["ES256"] = "ES256";
    SigningAlgo["ES256K"] = "ES256K";
})(SigningAlgo || (exports.SigningAlgo = SigningAlgo = {}));
var Scope;
(function (Scope) {
    Scope["OPENID"] = "openid";
    Scope["OPENID_DIDAUTHN"] = "openid did_authn";
    //added based on the https://openid.net/specs/openid-connect-implicit-1_0.html#SelfIssuedDiscovery
    Scope["PROFILE"] = "profile";
    Scope["EMAIL"] = "email";
    Scope["ADDRESS"] = "address";
    Scope["PHONE"] = "phone";
})(Scope || (exports.Scope = Scope = {}));
var ResponseType;
(function (ResponseType) {
    ResponseType["ID_TOKEN"] = "id_token";
    ResponseType["VP_TOKEN"] = "vp_token";
})(ResponseType || (exports.ResponseType = ResponseType = {}));
var SubjectIdentifierType;
(function (SubjectIdentifierType) {
    SubjectIdentifierType["JKT"] = "jkt";
    SubjectIdentifierType["DID"] = "did";
})(SubjectIdentifierType || (exports.SubjectIdentifierType = SubjectIdentifierType = {}));
var SubjectSyntaxTypesSupportedValues;
(function (SubjectSyntaxTypesSupportedValues) {
    SubjectSyntaxTypesSupportedValues["DID"] = "did";
    SubjectSyntaxTypesSupportedValues["JWK_THUMBPRINT"] = "urn:ietf:params:oauth:jwk-thumbprint";
})(SubjectSyntaxTypesSupportedValues || (exports.SubjectSyntaxTypesSupportedValues = SubjectSyntaxTypesSupportedValues = {}));
var CredentialFormat;
(function (CredentialFormat) {
    CredentialFormat["JSON_LD"] = "w3cvc-jsonld";
    CredentialFormat["JWT"] = "jwt";
})(CredentialFormat || (exports.CredentialFormat = CredentialFormat = {}));
var SubjectType;
(function (SubjectType) {
    SubjectType["PUBLIC"] = "public";
    SubjectType["PAIRWISE"] = "pairwise";
})(SubjectType || (exports.SubjectType = SubjectType = {}));
var Schema;
(function (Schema) {
    Schema["OPENID"] = "openid:";
    Schema["OPENID_VC"] = "openid-vc:";
})(Schema || (exports.Schema = Schema = {}));
var ResponseIss;
(function (ResponseIss) {
    ResponseIss["SELF_ISSUED_V1"] = "https://self-issued.me";
    ResponseIss["SELF_ISSUED_V2"] = "https://self-issued.me/v2";
    ResponseIss["JWT_VC_PRESENTATION_V1"] = "https://self-issued.me/v2/openid-vc";
})(ResponseIss || (exports.ResponseIss = ResponseIss = {}));
const isInternalSignature = (object) => 'hexPrivateKey' in object && 'did' in object;
exports.isInternalSignature = isInternalSignature;
const isExternalSignature = (object) => 'signatureUri' in object && 'did' in object;
exports.isExternalSignature = isExternalSignature;
const isSuppliedSignature = (object) => 'signature' in object;
exports.isSuppliedSignature = isSuppliedSignature;
const isNoSignature = (object) => 'hexPublicKey' in object && 'did' in object;
exports.isNoSignature = isNoSignature;
const isRequestOpts = (object) => 'requestBy' in object;
exports.isRequestOpts = isRequestOpts;
const isResponseOpts = (object) => 'did' in object;
exports.isResponseOpts = isResponseOpts;
const isRequestPayload = (object) => 'response_mode' in object && 'response_type' in object;
exports.isRequestPayload = isRequestPayload;
const isResponsePayload = (object) => 'iss' in object && 'aud' in object;
exports.isResponsePayload = isResponsePayload;
const isInternalVerification = (object) => object.mode === VerificationMode.INTERNAL; /* && !isExternalVerification(object)*/
exports.isInternalVerification = isInternalVerification;
const isExternalVerification = (object) => object.mode === VerificationMode.EXTERNAL; /*&& 'verifyUri' in object || 'authZToken' in object*/
exports.isExternalVerification = isExternalVerification;
const isVP = (object) => 'presentation' in object;
exports.isVP = isVP;
const isPresentation = (object) => 'presentation_submission' in object;
exports.isPresentation = isPresentation;
var RevocationStatus;
(function (RevocationStatus) {
    RevocationStatus["VALID"] = "valid";
    RevocationStatus["INVALID"] = "invalid";
})(RevocationStatus || (exports.RevocationStatus = RevocationStatus = {}));
var RevocationVerification;
(function (RevocationVerification) {
    RevocationVerification["NEVER"] = "never";
    RevocationVerification["IF_PRESENT"] = "if_present";
    RevocationVerification["ALWAYS"] = "always";
})(RevocationVerification || (exports.RevocationVerification = RevocationVerification = {}));
var SupportedVersion;
(function (SupportedVersion) {
    SupportedVersion[SupportedVersion["SIOPv2_ID1"] = 70] = "SIOPv2_ID1";
    SupportedVersion[SupportedVersion["SIOPv2_D11"] = 110] = "SIOPv2_D11";
    SupportedVersion[SupportedVersion["SIOPv2_D12_OID4VP_D18"] = 180] = "SIOPv2_D12_OID4VP_D18";
    SupportedVersion[SupportedVersion["JWT_VC_PRESENTATION_PROFILE_v1"] = 71] = "JWT_VC_PRESENTATION_PROFILE_v1";
})(SupportedVersion || (exports.SupportedVersion = SupportedVersion = {}));
var ContentType;
(function (ContentType) {
    ContentType["FORM_URL_ENCODED"] = "application/x-www-form-urlencoded";
    ContentType["UTF_8"] = "UTF-8";
})(ContentType || (exports.ContentType = ContentType = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0lPUC50eXBlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90eXBlcy9TSU9QLnR5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxxQ0FBcUM7OztBQTZCeEIsUUFBQSx1QkFBdUIsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBc1ovQyxJQUFZLCtCQUdYO0FBSEQsV0FBWSwrQkFBK0I7SUFDekMsOENBQVcsQ0FBQTtJQUNYLGdEQUFhLENBQUE7QUFDZixDQUFDLEVBSFcsK0JBQStCLCtDQUEvQiwrQkFBK0IsUUFHMUM7QUFFRCxJQUFZLFNBSVg7QUFKRCxXQUFZLFNBQVM7SUFDbkIsOEJBQWlCLENBQUE7SUFDakIsc0NBQXlCLENBQUE7SUFDekIsd0NBQTJCLENBQUE7QUFDN0IsQ0FBQyxFQUpXLFNBQVMseUJBQVQsU0FBUyxRQUlwQjtBQUVELElBQVksV0FHWDtBQUhELFdBQVksV0FBVztJQUNyQixnREFBaUMsQ0FBQTtJQUNqQyxrREFBbUMsQ0FBQTtBQUNyQyxDQUFDLEVBSFcsV0FBVywyQkFBWCxXQUFXLFFBR3RCO0FBT0QsSUFBWSxnQ0FJWDtBQUpELFdBQVksZ0NBQWdDO0lBQzFDLHFEQUFpQixDQUFBO0lBQ2pCLHFEQUFpQixDQUFBO0lBQ2pCLDJEQUF1QixDQUFBO0FBQ3pCLENBQUMsRUFKVyxnQ0FBZ0MsZ0RBQWhDLGdDQUFnQyxRQUkzQztBQUVELElBQVksOEJBSVg7QUFKRCxXQUFZLDhCQUE4QjtJQUN4QyxtREFBaUIsQ0FBQTtJQUNqQixtREFBaUIsQ0FBQTtJQUNqQix5REFBdUIsQ0FBQTtBQUN6QixDQUFDLEVBSlcsOEJBQThCLDhDQUE5Qiw4QkFBOEIsUUFJekM7QUFFRCxJQUFZLHlCQUVYO0FBRkQsV0FBWSx5QkFBeUI7SUFDbkMsNENBQWUsQ0FBQTtBQUNqQixDQUFDLEVBRlcseUJBQXlCLHlDQUF6Qix5QkFBeUIsUUFFcEM7QUFFRCxJQUFZLGVBRVg7QUFGRCxXQUFZLGVBQWU7SUFD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