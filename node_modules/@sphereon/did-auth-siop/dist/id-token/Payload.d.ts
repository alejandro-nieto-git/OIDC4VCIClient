import { AuthorizationResponseOpts } from '../authorization-response';
import { IDTokenPayload, VerifiedAuthorizationRequest } from '../types';
export declare const createIDTokenPayload: (verifiedAuthorizationRequest: VerifiedAuthorizationRequest, responseOpts: AuthorizationResponseOpts) => Promise<IDTokenPayload>;
