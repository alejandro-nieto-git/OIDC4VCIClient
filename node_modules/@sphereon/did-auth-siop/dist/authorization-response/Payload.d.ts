import { AuthorizationRequest } from '../authorization-request';
import { RequestObject } from '../request-object';
import { AuthorizationRequestPayload, AuthorizationResponsePayload, IDTokenPayload } from '../types';
import { AuthorizationResponseOpts } from './types';
export declare const createResponsePayload: (authorizationRequest: AuthorizationRequest, responseOpts: AuthorizationResponseOpts, idTokenPayload?: IDTokenPayload) => Promise<AuthorizationResponsePayload | undefined>;
/**
 * Properties can be in oAUth2 and OpenID (JWT) style. If they are in both the OpenID prop takes precedence as they are signed.
 * @param payload
 * @param requestObject
 */
export declare const mergeOAuth2AndOpenIdInRequestPayload: (payload: AuthorizationRequestPayload, requestObject?: RequestObject) => Promise<AuthorizationRequestPayload>;
