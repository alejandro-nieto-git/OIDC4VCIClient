import { URI, VerifyAuthorizationRequestOpts } from '../authorization-request';
import { AuthorizationResponseOpts, AuthorizationResponseWithCorrelationId, PresentationExchangeResponseOpts } from '../authorization-response';
import { ExternalSignature, ExternalVerification, InternalSignature, InternalVerification, ParsedAuthorizationRequestURI, RegisterEventListener, ResponseIss, SuppliedSignature, SupportedVersion, VerifiedAuthorizationRequest } from '../types';
import { OPBuilder } from './OPBuilder';
export declare class OP {
    private readonly _createResponseOptions;
    private readonly _verifyRequestOptions;
    private readonly _eventEmitter?;
    private constructor();
    /**
     * This method tries to infer the SIOP specs version based on the request payload.
     * If the version cannot be inferred or is not supported it throws an exception.
     * This method needs to be called to ensure the OP can handle the request
     * @param requestJwtOrUri
     * @param requestOpts
     */
    verifyAuthorizationRequest(requestJwtOrUri: string | URI, requestOpts?: {
        correlationId?: string;
        verification?: InternalVerification | ExternalVerification;
    }): Promise<VerifiedAuthorizationRequest>;
    createAuthorizationResponse(verifiedAuthorizationRequest: VerifiedAuthorizationRequest, responseOpts?: {
        version?: SupportedVersion;
        correlationId?: string;
        audience?: string;
        issuer?: ResponseIss | string;
        signature?: InternalSignature | ExternalSignature | SuppliedSignature;
        verification?: InternalVerification | ExternalVerification;
        presentationExchange?: PresentationExchangeResponseOpts;
    }): Promise<AuthorizationResponseWithCorrelationId>;
    submitAuthorizationResponse(authorizationResponse: AuthorizationResponseWithCorrelationId): Promise<Response>;
    /**
     * Create an Authentication Request Payload from a URI string
     *
     * @param encodedUri
     */
    parseAuthorizationRequestURI(encodedUri: string): Promise<ParsedAuthorizationRequestURI>;
    private newAuthorizationResponseOpts;
    private newVerifyAuthorizationRequestOpts;
    private emitEvent;
    addEventListener(register: RegisterEventListener): void;
    static fromOpts(responseOpts: AuthorizationResponseOpts, verifyOpts: VerifyAuthorizationRequestOpts): OP;
    static builder(): OPBuilder;
    get createResponseOptions(): AuthorizationResponseOpts;
    get verifyRequestOptions(): Partial<VerifyAuthorizationRequestOpts>;
}
