import { Hasher } from '@sphereon/ssi-types';
import { AuthorizationRequest, VerifyAuthorizationRequestOpts } from '../authorization-request';
import { IDToken } from '../id-token';
import { AuthorizationResponsePayload, VerifiedAuthorizationRequest, VerifiedAuthorizationResponse } from '../types';
import { AuthorizationResponseOpts, VerifyAuthorizationResponseOpts } from './types';
export declare class AuthorizationResponse {
    private readonly _authorizationRequest?;
    private readonly _idToken?;
    private readonly _payload;
    private readonly _options?;
    private constructor();
    /**
     * Creates a SIOP Response Object
     *
     * @param requestObject
     * @param responseOpts
     * @param verifyOpts
     */
    static fromRequestObject(requestObject: string, responseOpts: AuthorizationResponseOpts, verifyOpts: VerifyAuthorizationRequestOpts): Promise<AuthorizationResponse>;
    static fromPayload(authorizationResponsePayload: AuthorizationResponsePayload, responseOpts?: AuthorizationResponseOpts): Promise<AuthorizationResponse>;
    static fromAuthorizationRequest(authorizationRequest: AuthorizationRequest, responseOpts: AuthorizationResponseOpts, verifyOpts: VerifyAuthorizationRequestOpts): Promise<AuthorizationResponse>;
    static fromVerifiedAuthorizationRequest(verifiedAuthorizationRequest: VerifiedAuthorizationRequest, responseOpts: AuthorizationResponseOpts, verifyOpts: VerifyAuthorizationRequestOpts): Promise<AuthorizationResponse>;
    verify(verifyOpts: VerifyAuthorizationResponseOpts): Promise<VerifiedAuthorizationResponse>;
    get authorizationRequest(): AuthorizationRequest | undefined;
    get payload(): AuthorizationResponsePayload;
    get options(): AuthorizationResponseOpts | undefined;
    get idToken(): IDToken | undefined;
    getMergedProperty<T>(key: string, opts?: {
        consistencyCheck?: boolean;
        hasher?: Hasher;
    }): Promise<T | undefined>;
    mergedPayloads(opts?: {
        consistencyCheck?: boolean;
        hasher?: Hasher;
    }): Promise<AuthorizationResponsePayload>;
}
