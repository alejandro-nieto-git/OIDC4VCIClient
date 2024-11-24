import { Format, PresentationDefinitionV1, PresentationDefinitionV2 } from '@sphereon/pex-models';
import { AdditionalClaims, CompactSdJwtVc, IPresentation, IVerifiablePresentation, PresentationSubmission, W3CVerifiableCredential, W3CVerifiablePresentation, WrappedVerifiablePresentation } from '@sphereon/ssi-types';
import { VerifyCallback as WellknownDIDVerifyCallback } from '@sphereon/wellknown-dids-client';
import { Signer } from 'did-jwt';
import { DIDResolutionResult, VerificationMethod } from 'did-resolver';
import { AuthorizationRequest, CreateAuthorizationRequestOpts, PropertyTargets, VerifyAuthorizationRequestOpts } from '../authorization-request';
import { AuthorizationResponse, AuthorizationResponseOpts, PresentationDefinitionWithLocation, PresentationVerificationCallback, VerifyAuthorizationResponseOpts } from '../authorization-response';
import { RequestObject, RequestObjectOpts } from '../request-object';
import { IRPSessionManager } from '../rp';
import { EcdsaSignature, JWTPayload, ResolveOpts, VerifiedJWT } from './index';
export declare const DEFAULT_EXPIRATION_TIME: number;
export interface RequestObjectPayload extends RequestCommonPayload, JWTPayload {
    scope: string;
    response_type: ResponseType | string;
    client_id: string;
    client_id_scheme?: ClientIdScheme;
    redirect_uri?: string;
    response_uri?: string;
    nonce: string;
    state: string;
}
export type RequestObjectJwt = string;
export interface AuthorizationRequestCommonPayload extends RequestCommonPayload, JWTPayload {
    request?: string;
    request_uri?: string;
}
export interface RequestCommonPayload extends JWTPayload {
    scope?: string;
    response_type?: ResponseType | string;
    client_id?: string;
    redirect_uri?: string;
    id_token_hint?: string;
    nonce?: string;
    state?: string;
    response_mode?: ResponseMode;
}
export interface AuthorizationRequestPayloadVID1 extends AuthorizationRequestCommonPayload, RequestRegistrationPayloadProperties {
    claims?: ClaimPayloadVID1;
}
export interface AuthorizationRequestPayloadVD11 extends AuthorizationRequestCommonPayload, RequestClientMetadataPayloadProperties, RequestIdTokenPayloadProperties {
    claims?: ClaimPayloadCommon;
    presentation_definition?: PresentationDefinitionV1 | PresentationDefinitionV2 | PresentationDefinitionV1[] | PresentationDefinitionV2[];
    presentation_definition_uri?: string;
}
export interface AuthorizationRequestPayloadVD12OID4VPD18 extends AuthorizationRequestCommonPayload, RequestClientMetadataPayloadProperties, RequestIdTokenPayloadProperties {
    claims?: ClaimPayloadCommon;
    presentation_definition?: PresentationDefinitionV1 | PresentationDefinitionV2 | PresentationDefinitionV1[] | PresentationDefinitionV2[];
    presentation_definition_uri?: string;
    client_id_scheme?: ClientIdScheme;
    response_uri?: string;
}
export type ClientIdScheme = 'pre-registered' | 'redirect_uri' | 'entity_id' | 'did';
export type AuthorizationRequestPayload = AuthorizationRequestPayloadVID1 | AuthorizationRequestPayloadVD11 | AuthorizationRequestPayloadVD12OID4VPD18;
export type JWTVcPresentationProfileAuthenticationRequestPayload = RequestIdTokenPayloadProperties;
export interface RequestIdTokenPayloadProperties {
    id_token_type?: string;
}
export interface RequestClientMetadataPayloadProperties {
    client_metadata?: RPRegistrationMetadataPayload;
    client_metadata_uri?: string;
}
export interface RequestRegistrationPayloadProperties {
    registration?: RPRegistrationMetadataPayload;
    registration_uri?: string;
}
export type ResponseURIType = 'response_uri' | 'redirect_uri';
export interface VerifiedAuthorizationRequest extends Partial<VerifiedJWT> {
    responseURIType: ResponseURIType;
    responseURI?: string;
    clientIdScheme?: string;
    correlationId: string;
    authorizationRequest: AuthorizationRequest;
    authorizationRequestPayload: AuthorizationRequestPayload;
    requestObject?: RequestObject;
    registrationMetadataPayload: RPRegistrationMetadataPayload;
    presentationDefinitions?: PresentationDefinitionWithLocation[];
    verifyOpts: VerifyAuthorizationRequestOpts;
    versions: SupportedVersion[];
}
export type IDTokenJwt = string;
export interface IDTokenPayload extends JWTPayload {
    iss?: ResponseIss.SELF_ISSUED_V2 | string;
    sub?: string;
    aud?: string;
    iat?: number;
    exp?: number;
    auth_time?: number;
    nonce?: string;
    _vp_token?: {
        presentation_submission: PresentationSubmission;
    };
}
export interface AuthorizationResponsePayload {
    access_token?: string;
    token_type?: string;
    refresh_token?: string;
    expires_in?: number;
    state?: string;
    id_token?: string;
    vp_token?: Array<W3CVerifiablePresentation | CompactSdJwtVc> | W3CVerifiablePresentation | CompactSdJwtVc;
    presentation_submission?: PresentationSubmission;
    verifiedData?: IPresentation | AdditionalClaims;
    [x: string]: any;
}
export interface PresentationDefinitionPayload {
    presentation_definition: PresentationDefinitionV1 | PresentationDefinitionV2;
}
export interface IdTokenClaimPayload {
    [x: string]: any;
}
export interface VpTokenClaimPayload {
    presentation_definition?: PresentationDefinitionV1 | PresentationDefinitionV2;
    presentation_definition_uri?: string;
}
export interface ClaimPayloadCommon {
    [x: string]: any;
}
export interface ClaimPayloadVID1 extends ClaimPayloadCommon {
    id_token?: IdTokenClaimPayload;
    vp_token?: VpTokenClaimPayload;
}
/**
 * A wrapper for verifiablePresentation
 *
 */
export interface VerifiablePresentationWithFormat {
    format: VerifiablePresentationTypeFormat;
    presentation: W3CVerifiablePresentation;
}
export interface RequestStateInfo {
    client_id: string;
    nonce: string;
    state: string;
    iat: number;
}
/**
 *
 */
export interface AuthorizationResponseResult {
    idToken: string;
    nonce: string;
    state: string;
    idTokenPayload: IDTokenPayload;
    responsePayload: AuthorizationResponsePayload;
    verifyOpts?: VerifyAuthorizationRequestOpts;
    responseOpts: AuthorizationResponseOpts;
}
interface DiscoveryMetadataCommonOpts {
    authorizationEndpoint?: Schema | string;
    issuer?: ResponseIss | string;
    responseTypesSupported?: ResponseType[] | ResponseType;
    scopesSupported?: Scope[] | Scope;
    subjectTypesSupported?: SubjectType[] | SubjectType;
    idTokenSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    requestObjectSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    subject_syntax_types_supported?: string[];
    tokenEndpoint?: string;
    userinfoEndpoint?: string;
    jwksUri?: string;
    registrationEndpoint?: string;
    responseModesSupported?: ResponseMode[] | ResponseMode;
    grantTypesSupported?: GrantType[] | GrantType;
    acrValuesSupported?: AuthenticationContextReferences[] | AuthenticationContextReferences;
    idTokenEncryptionAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    idTokenEncryptionEncValuesSupported?: string[] | string;
    userinfoSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    userinfoEncryptionAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    userinfoEncryptionEncValuesSupported?: string[] | string;
    requestObjectEncryptionAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    requestObjectEncryptionEncValuesSupported?: string[] | string;
    tokenEndpointAuthMethodsSupported?: TokenEndpointAuthMethod[] | TokenEndpointAuthMethod;
    tokenEndpointAuthSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    displayValuesSupported?: string[] | string;
    claimTypesSupported?: ClaimType[] | ClaimType;
    claimsSupported?: string[] | string;
    serviceDocumentation?: string;
    claimsLocalesSupported?: string[] | string;
    uiLocalesSupported?: string[] | string;
    claimsParameterSupported?: boolean;
    requestParameterSupported?: boolean;
    requestUriParameterSupported?: boolean;
    requireRequestUriRegistration?: boolean;
    opPolicyUri?: string;
    opTosUri?: string;
    [x: string]: any;
}
interface DiscoveryMetadataOptsVID1 extends DiscoveryMetadataCommonOpts {
    client_id?: string;
    redirectUris?: string[] | string;
    clientName?: string;
    tokenEndpointAuthMethod?: string;
    applicationType?: string;
    responseTypes?: string;
    grantTypes?: string;
    vpFormats?: Format;
}
interface JWT_VCDiscoveryMetadataOpts extends DiscoveryMetadataOptsVID1 {
    logo_uri?: string;
    clientPurpose?: string;
}
interface DiscoveryMetadataOptsVD11 extends DiscoveryMetadataCommonOpts {
    idTokenTypesSupported?: IdTokenType[] | IdTokenType;
    vpFormatsSupported?: Format;
}
interface DiscoveryMetadataCommonPayload {
    authorization_endpoint?: Schema | string;
    issuer?: ResponseIss | string;
    response_types_supported?: ResponseType[] | ResponseType;
    scopes_supported?: Scope[] | Scope;
    subject_types_supported?: SubjectType[] | SubjectType;
    id_token_signing_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    request_object_signing_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    subject_syntax_types_supported?: string[];
    token_endpoint?: string;
    userinfo_endpoint?: string;
    jwks_uri?: string;
    registration_endpoint?: string;
    response_modes_supported?: ResponseMode[] | ResponseMode;
    grant_types_supported?: GrantType[] | GrantType;
    acr_values_supported?: AuthenticationContextReferences[] | AuthenticationContextReferences;
    id_token_encryption_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    /**
     * OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT].
     */
    id_token_encryption_enc_values_supported?: string[] | string;
    userinfo_signing_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    userinfo_encryption_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    /**
     * OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT [JWT].
     */
    userinfo_encryption_enc_values_supported?: string[] | string;
    request_object_encryption_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    /**
     * OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference.
     */
    request_object_encryption_enc_values_supported?: string[] | string;
    token_endpoint_auth_methods_supported?: TokenEndpointAuthMethod[] | TokenEndpointAuthMethod;
    token_endpoint_auth_signing_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    /**
     * OPTIONAL. JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core].
     */
    display_values_supported?: unknown[] | unknown;
    /**
     * OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims.
     */
    claim_types_supported?: ClaimType[] | ClaimType;
    /**
     * RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list.
     */
    claims_supported?: string[] | string;
    service_documentation?: string;
    claims_locales_supported?: string[] | string;
    ui_locales_supported?: string[] | string;
    claims_parameter_supported?: boolean;
    request_parameter_supported?: boolean;
    request_uri_parameter_supported?: boolean;
    require_request_uri_registration?: boolean;
    op_policy_uri?: string;
    op_tos_uri?: string;
    [x: string]: any;
}
interface DiscoveryMetadataPayloadVID1 extends DiscoveryMetadataCommonPayload {
    client_id?: string;
    redirect_uris?: string[];
    client_name?: string;
    token_endpoint_auth_method?: string;
    application_type?: string;
    response_types?: string;
    grant_types?: string;
    vp_formats?: Format;
}
interface JWT_VCDiscoveryMetadataPayload extends DiscoveryMetadataPayloadVID1 {
    logo_uri?: string;
    client_purpose?: string;
}
interface DiscoveryMetadataPayloadVD11 extends DiscoveryMetadataCommonPayload {
    id_token_types_supported?: IdTokenType[] | IdTokenType;
    vp_formats_supported?: Format;
}
export type DiscoveryMetadataPayload = DiscoveryMetadataPayloadVID1 | JWT_VCDiscoveryMetadataPayload | DiscoveryMetadataPayloadVD11;
export type DiscoveryMetadataOpts = (JWT_VCDiscoveryMetadataOpts | DiscoveryMetadataOptsVID1 | DiscoveryMetadataOptsVD11) & DiscoveryMetadataCommonOpts;
export type ClientMetadataOpts = RPRegistrationMetadataOpts & ClientMetadataProperties;
export type ResponseRegistrationOpts = DiscoveryMetadataOpts & ClientMetadataProperties;
export type RPRegistrationMetadataOpts = Partial<Pick<DiscoveryMetadataOpts, 'client_id' | 'idTokenSigningAlgValuesSupported' | 'requestObjectSigningAlgValuesSupported' | 'responseTypesSupported' | 'scopesSupported' | 'subjectTypesSupported' | 'subject_syntax_types_supported' | 'vpFormatsSupported' | 'clientName' | 'logo_uri' | 'tos_uri' | 'clientPurpose'>> & {
    [x: string]: any;
};
export type RPRegistrationMetadataPayload = Pick<DiscoveryMetadataPayload, 'client_id' | 'id_token_signing_alg_values_supported' | 'request_object_signing_alg_values_supported' | 'response_types_supported' | 'scopes_supported' | 'subject_types_supported' | 'subject_syntax_types_supported' | 'vp_formats' | 'client_name' | 'logo_uri' | 'client_purpose'> & {
    [x: string]: any;
};
export interface CommonSupportedMetadata {
    subject_syntax_types_supported?: string[];
    vp_formats: Format;
}
export interface ObjectBy {
    passBy: PassBy;
    reference_uri?: string;
    targets?: PropertyTargets;
}
export declare enum AuthenticationContextReferences {
    PHR = "phr",
    PHRH = "phrh"
}
export declare enum ClaimType {
    NORMAL = "normal",
    AGGREGATED = "aggregated",
    DISTRIBUTED = "distributed"
}
export declare enum IdTokenType {
    SUBJECT_SIGNED = "subject_signed",
    ATTESTER_SIGNED = "attester_signed"
}
export interface ClientMetadataProperties extends ObjectBy {
    id_token_encrypted_response_alg?: EncKeyAlgorithm;
    id_token_encrypted_response_enc?: EncSymmetricAlgorithmCode;
}
export declare enum VerifiablePresentationTypeFormat {
    JWT_VP = "jwt_vp",
    LDP_VP = "ldp_vp",
    SD_JWT_VC = "vc+sd-jwt"
}
export declare enum VerifiableCredentialTypeFormat {
    LDP_VC = "ldp_vc",
    JWT_VC = "jwt_vc",
    SD_JWT_VC = "vc+sd-jwt"
}
export declare enum EncSymmetricAlgorithmCode {
    XC20P = "XC20P"
}
export declare enum EncKeyAlgorithm {
    ECDH_ES = "ECDH-ES"
}
export declare enum PassBy {
    NONE = "NONE",
    REFERENCE = "REFERENCE",
    VALUE = "VALUE"
}
export declare enum ResponseContext {
    RP = "rp",
    OP = "op"
}
export declare enum CheckLinkedDomain {
    NEVER = "never",// We don't want to verify Linked domains
    IF_PRESENT = "if_present",// If present, did-auth-siop will check the linked domain, if exist and not valid, throws an exception
    ALWAYS = "always"
}
export interface InternalSignature {
    hexPrivateKey: string;
    did: string;
    alg: SigningAlgo;
    kid?: string;
    customJwtSigner?: Signer;
}
export interface SuppliedSignature {
    signature: (data: string | Uint8Array) => Promise<EcdsaSignature | string>;
    alg: SigningAlgo;
    did: string;
    kid: string;
}
export interface NoSignature {
    hexPublicKey: string;
    did: string;
    kid?: string;
}
export interface ExternalSignature {
    signatureUri: string;
    did: string;
    authZToken?: string;
    hexPublicKey?: string;
    alg: SigningAlgo;
    kid?: string;
}
export declare enum VerificationMode {
    INTERNAL = 0,
    EXTERNAL = 1
}
export interface Verification {
    checkLinkedDomain?: CheckLinkedDomain;
    wellknownDIDVerifyCallback?: WellknownDIDVerifyCallback;
    presentationVerificationCallback?: PresentationVerificationCallback;
    mode: VerificationMode;
    resolveOpts: ResolveOpts;
    revocationOpts?: RevocationOpts;
    replayRegistry?: IRPSessionManager;
}
export type InternalVerification = Verification;
export interface ExternalVerification extends Verification {
    verifyUri: string;
    authZToken?: string;
}
export interface ResponseClaims {
    verified_claims?: string;
    encryption_key?: JsonWebKey;
}
export interface DidAuthValidationResponse {
    signatureValidation: boolean;
    signer: VerificationMethod;
    payload: JWTPayload;
}
export interface VerifiedIDToken {
    jwt: string;
    didResolutionResult: DIDResolutionResult;
    signer: VerificationMethod;
    issuer: string;
    payload: IDTokenPayload;
    verifyOpts: VerifyAuthorizationResponseOpts;
}
export interface VerifiedOpenID4VPSubmission {
    submissionData: PresentationSubmission;
    presentationDefinitions: PresentationDefinitionWithLocation[];
    presentations: WrappedVerifiablePresentation[];
    nonce: string;
}
export interface VerifiedAuthorizationResponse {
    correlationId: string;
    authorizationResponse: AuthorizationResponse;
    oid4vpSubmission?: VerifiedOpenID4VPSubmission;
    nonce?: string;
    state: string;
    idToken?: VerifiedIDToken;
    verifyOpts?: VerifyAuthorizationResponseOpts;
}
export declare enum GrantType {
    AUTHORIZATION_CODE = "authorization_code",
    IMPLICIT = "implicit"
}
export declare enum ResponseMode {
    FRAGMENT = "fragment",
    FORM_POST = "form_post",
    POST = "post",// Used in OID4VP spec <= version 17
    DIRECT_POST = "direct_post",
    QUERY = "query"
}
export declare enum ProtocolFlow {
    SAME_DEVICE = "same_device",
    CROSS_DEVICE = "cross_device"
}
export interface SignatureResponse {
    jws: string;
}
export declare enum UrlEncodingFormat {
    FORM_URL_ENCODED = "application/x-www-form-urlencoded"
}
export type SIOPURI = {
    encodedUri: string;
    encodingFormat: UrlEncodingFormat;
};
export interface UriResponse extends SIOPURI {
    responseMode?: ResponseMode;
    bodyEncoded?: string;
}
export interface AuthorizationRequestURI extends SIOPURI {
    scheme: string;
    requestObjectBy: ObjectBy;
    authorizationRequestPayload: AuthorizationRequestPayload;
    requestObjectJwt?: RequestObjectJwt;
}
export interface ParsedAuthorizationRequestURI extends SIOPURI {
    scheme: string;
    requestObjectJwt?: RequestObjectJwt;
    authorizationRequestPayload: AuthorizationRequestPayload;
    registration: RPRegistrationMetadataPayload;
}
export declare enum KeyType {
    EC = "EC"
}
export declare enum KeyCurve {
    SECP256k1 = "secp256k1",
    ED25519 = "ed25519"
}
export declare enum TokenEndpointAuthMethod {
    CLIENT_SECRET_POST = "client_secret_post",
    CLIENT_SECRET_BASIC = "client_secret_basic",
    CLIENT_SECRET_JWT = "client_secret_jwt",
    PRIVATE_KEY_JWT = "private_key_jwt"
}
export declare enum SigningAlgo {
    EDDSA = "EdDSA",
    RS256 = "RS256",
    PS256 = "PS256",
    ES256 = "ES256",
    ES256K = "ES256K"
}
export declare enum Scope {
    OPENID = "openid",
    OPENID_DIDAUTHN = "openid did_authn",
    PROFILE = "profile",
    EMAIL = "email",
    ADDRESS = "address",
    PHONE = "phone"
}
export declare enum ResponseType {
    ID_TOKEN = "id_token",
    VP_TOKEN = "vp_token"
}
export declare enum SubjectIdentifierType {
    JKT = "jkt",
    DID = "did"
}
export declare enum SubjectSyntaxTypesSupportedValues {
    DID = "did",
    JWK_THUMBPRINT = "urn:ietf:params:oauth:jwk-thumbprint"
}
export declare enum CredentialFormat {
    JSON_LD = "w3cvc-jsonld",
    JWT = "jwt"
}
export declare enum SubjectType {
    PUBLIC = "public",
    PAIRWISE = "pairwise"
}
export declare enum Schema {
    OPENID = "openid:",
    OPENID_VC = "openid-vc:"
}
export declare enum ResponseIss {
    SELF_ISSUED_V1 = "https://self-issued.me",
    SELF_ISSUED_V2 = "https://self-issued.me/v2",
    JWT_VC_PRESENTATION_V1 = "https://self-issued.me/v2/openid-vc"
}
export declare const isInternalSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is InternalSignature;
export declare const isExternalSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is ExternalSignature;
export declare const isSuppliedSignature: (object: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature) => object is SuppliedSignature;
export declare const isNoSignature: (object: InternalSignature | ExternalSignature | NoSignature) => object is NoSignature;
export declare const isRequestOpts: (object: CreateAuthorizationRequestOpts | AuthorizationResponseOpts) => object is CreateAuthorizationRequestOpts;
export declare const isResponseOpts: (object: RequestObjectOpts<RequestCommonPayload> | AuthorizationResponseOpts) => object is RequestObjectOpts<RequestCommonPayload>;
export declare const isRequestPayload: (object: AuthorizationRequestPayload | RequestObjectPayload | AuthorizationResponsePayload | IDTokenPayload) => object is AuthorizationRequestPayload;
export declare const isResponsePayload: (object: RequestObjectPayload | IDTokenPayload) => object is IDTokenPayload;
export declare const isInternalVerification: (object: InternalVerification | ExternalVerification) => object is Verification;
export declare const isExternalVerification: (object: InternalVerification | ExternalVerification) => object is ExternalVerification;
export declare const isVP: (object: IVerifiablePresentation | IPresentation) => object is IVerifiablePresentation;
export declare const isPresentation: (object: IVerifiablePresentation | IPresentation) => object is IPresentation;
export declare enum RevocationStatus {
    VALID = "valid",
    INVALID = "invalid"
}
export interface IRevocationVerificationStatus {
    status: RevocationStatus;
    error?: string;
}
export type RevocationVerificationCallback = (vc: W3CVerifiableCredential, type: VerifiableCredentialTypeFormat) => Promise<IRevocationVerificationStatus>;
export declare enum RevocationVerification {
    NEVER = "never",// We don't want to verify revocation
    IF_PRESENT = "if_present",// If credentialStatus is present, did-auth-siop will verify revocation. If present and not valid an exception is thrown
    ALWAYS = "always"
}
export interface RevocationOpts {
    revocationVerification: RevocationVerification;
    revocationVerificationCallback?: RevocationVerificationCallback;
}
export declare enum SupportedVersion {
    SIOPv2_ID1 = 70,
    SIOPv2_D11 = 110,
    SIOPv2_D12_OID4VP_D18 = 180,
    JWT_VC_PRESENTATION_PROFILE_v1 = 71
}
export interface SIOPResonse<T> {
    origResponse: Response;
    successBody?: T;
    errorBody?: ErrorResponse;
}
export interface ErrorResponse extends Response {
    error: string;
    error_description?: string;
    error_uri?: string;
    state?: string;
}
export declare enum ContentType {
    FORM_URL_ENCODED = "application/x-www-form-urlencoded",
    UTF_8 = "UTF-8"
}
export {};
