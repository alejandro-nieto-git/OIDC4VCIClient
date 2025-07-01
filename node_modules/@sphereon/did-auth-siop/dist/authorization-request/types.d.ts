import { Hasher } from '@sphereon/ssi-types';
import { PresentationDefinitionPayloadOpts } from '../authorization-response';
import { RequestObjectOpts } from '../request-object';
import { ClientMetadataOpts, ExternalVerification, IdTokenClaimPayload, InternalVerification, ResponseMode, ResponseType, Schema, Scope, SigningAlgo, SubjectType, SupportedVersion } from '../types';
export interface ClaimPayloadOptsVID1 extends ClaimPayloadCommonOpts {
    id_token?: IdTokenClaimPayload;
    vp_token?: PresentationDefinitionPayloadOpts;
}
export interface ClaimPayloadCommonOpts {
    [x: string]: any;
}
export interface AuthorizationRequestPayloadOpts<CT extends ClaimPayloadCommonOpts> extends Partial<RequestObjectPayloadOpts<CT>> {
    request_uri?: string;
}
export interface RequestObjectPayloadOpts<CT extends ClaimPayloadCommonOpts> {
    scope: string;
    response_type: string;
    client_id: string;
    redirect_uri?: string;
    response_uri?: string;
    id_token_hint?: string;
    claims?: CT;
    nonce?: string;
    state?: string;
    authorization_endpoint?: string;
    response_mode?: ResponseMode;
    response_types_supported?: ResponseType[] | ResponseType;
    scopes_supported?: Scope[] | Scope;
    subject_types_supported?: SubjectType[] | SubjectType;
    request_object_signing_alg_values_supported?: SigningAlgo[] | SigningAlgo;
    [x: string]: any;
}
interface AuthorizationRequestCommonOpts<CT extends ClaimPayloadCommonOpts> {
    version: SupportedVersion;
    clientMetadata?: ClientMetadataOpts;
    payload?: AuthorizationRequestPayloadOpts<CT>;
    requestObject: RequestObjectOpts<CT>;
    uriScheme?: Schema | string;
}
export type AuthorizationRequestOptsVID1 = AuthorizationRequestCommonOpts<ClaimPayloadOptsVID1>;
export interface AuthorizationRequestOptsVD11 extends AuthorizationRequestCommonOpts<ClaimPayloadCommonOpts> {
    idTokenType?: string;
}
export type CreateAuthorizationRequestOpts = AuthorizationRequestOptsVID1 | AuthorizationRequestOptsVD11;
export interface VerifyAuthorizationRequestOpts {
    correlationId: string;
    verification: InternalVerification | ExternalVerification;
    nonce?: string;
    state?: string;
    supportedVersions?: SupportedVersion[];
    hasher?: Hasher;
}
/**
 * Determines where a property will end up. Methods that support this argument are optional. If you do not provide any value it will default to all targets.
 */
export declare enum PropertyTarget {
    AUTHORIZATION_REQUEST = "authorization-request",
    REQUEST_OBJECT = "request-object"
}
export type PropertyTargets = PropertyTarget | PropertyTarget[];
export interface RequestPropertyWithTargets<T> {
    targets?: PropertyTargets;
    propertyValue: T;
}
export {};
