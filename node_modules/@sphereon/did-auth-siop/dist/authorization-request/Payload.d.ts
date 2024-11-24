import { RequestObject } from '../request-object';
import { AuthorizationRequestPayload, ClaimPayloadVID1, RequestObjectPayload, RPRegistrationMetadataPayload } from '../types';
import { ClaimPayloadOptsVID1, CreateAuthorizationRequestOpts, VerifyAuthorizationRequestOpts } from './types';
export declare const createPresentationDefinitionClaimsProperties: (opts: ClaimPayloadOptsVID1) => ClaimPayloadVID1;
export declare const createAuthorizationRequestPayload: (opts: CreateAuthorizationRequestOpts, requestObject?: RequestObject) => Promise<AuthorizationRequestPayload>;
export declare const assertValidRPRegistrationMedataPayload: (regObj: RPRegistrationMetadataPayload) => void;
export declare const checkWellknownDIDFromRequest: (authorizationRequestPayload: RequestObjectPayload, opts: VerifyAuthorizationRequestOpts) => Promise<void>;
