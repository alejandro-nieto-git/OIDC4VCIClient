import { JWTHeader } from 'did-jwt';
import { AuthorizationResponseOpts, VerifyAuthorizationResponseOpts } from '../authorization-response';
import { IDTokenJwt, IDTokenPayload, VerifiedAuthorizationRequest, VerifiedIDToken } from '../types';
export declare class IDToken {
    private _header?;
    private _payload?;
    private _jwt?;
    private readonly _responseOpts;
    private constructor();
    static fromVerifiedAuthorizationRequest(verifiedAuthorizationRequest: VerifiedAuthorizationRequest, responseOpts: AuthorizationResponseOpts, verifyOpts?: VerifyAuthorizationResponseOpts): Promise<IDToken>;
    static fromIDToken(idTokenJwt: IDTokenJwt, verifyOpts?: VerifyAuthorizationResponseOpts): Promise<IDToken>;
    static fromIDTokenPayload(idTokenPayload: IDTokenPayload, responseOpts: AuthorizationResponseOpts, verifyOpts?: VerifyAuthorizationResponseOpts): Promise<IDToken>;
    payload(): Promise<IDTokenPayload>;
    jwt(): Promise<IDTokenJwt>;
    private parseAndVerifyJwt;
    /**
     * Verifies a SIOP ID Response JWT on the RP Side
     *
     * @param idToken ID token to be validated
     * @param verifyOpts
     */
    verify(verifyOpts: VerifyAuthorizationResponseOpts): Promise<VerifiedIDToken>;
    static verify(idTokenJwt: IDTokenJwt, verifyOpts: VerifyAuthorizationResponseOpts): Promise<VerifiedIDToken>;
    private assertValidResponseJWT;
    get header(): JWTHeader;
    get responseOpts(): AuthorizationResponseOpts;
    isSelfIssued(): Promise<boolean>;
}
