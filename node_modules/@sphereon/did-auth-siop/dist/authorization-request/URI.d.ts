import { RequestObject } from '../request-object';
import { AuthorizationRequestPayload, AuthorizationRequestURI, ObjectBy, RequestObjectJwt, RPRegistrationMetadataPayload, UrlEncodingFormat } from '../types';
import { AuthorizationRequest } from './AuthorizationRequest';
import { CreateAuthorizationRequestOpts } from './types';
export declare class URI implements AuthorizationRequestURI {
    private readonly _scheme;
    private readonly _requestObjectJwt;
    private readonly _authorizationRequestPayload;
    private readonly _encodedUri;
    private readonly _encodingFormat;
    private _registrationMetadataPayload;
    private constructor();
    static fromUri(uri: string): Promise<URI>;
    /**
     * Create a signed URL encoded URI with a signed SIOP request token on RP side
     *
     * @param opts Request input data to build a  SIOP Request Token
     * @remarks This method is used to generate a SIOP request with info provided by the RP.
     * First it generates the request payload and then it creates the signed JWT, which is returned as a URI
     *
     * Normally you will want to use this method to create the request.
     */
    static fromOpts(opts: CreateAuthorizationRequestOpts): Promise<URI>;
    toAuthorizationRequest(): Promise<AuthorizationRequest>;
    get requestObjectBy(): ObjectBy;
    get metadataObjectBy(): ObjectBy;
    /**
     * Create a URI from the request object, typically you will want to use the createURI version!
     *
     * @remarks This method is used to generate a SIOP request Object with info provided by the RP.
     * First it generates the request object payload, and then it creates the signed JWT.
     *
     * Please note that the createURI method allows you to differentiate between OAuth2 and OpenID parameters that become
     * part of the URI and which become part of the Request Object. If you generate a URI based upon the result of this method,
     * the URI will be constructed based on the Request Object only!
     */
    static fromRequestObject(requestObject: RequestObject): Promise<URI>;
    static fromAuthorizationRequest(authorizationRequest: AuthorizationRequest): Promise<URI>;
    /**
     * Creates an URI Request
     * @param opts Options to define the Uri Request
     * @param authorizationRequestPayload
     *
     */
    private static fromAuthorizationRequestPayload;
    /**
     * Create a Authentication Request Payload from a URI string
     *
     * @param uri
     */
    static parse(uri: string): {
        scheme: string;
        authorizationRequestPayload: AuthorizationRequestPayload;
    };
    static parseAndResolve(uri: string): Promise<{
        scheme: string;
        authorizationRequestPayload: AuthorizationRequestPayload;
        requestObjectJwt: string;
        registrationMetadata: RPRegistrationMetadataPayload;
    }>;
    get encodingFormat(): UrlEncodingFormat;
    get encodedUri(): string;
    get authorizationRequestPayload(): AuthorizationRequestPayload;
    get requestObjectJwt(): RequestObjectJwt | undefined;
    get scheme(): string;
    get registrationMetadataPayload(): RPRegistrationMetadataPayload;
}
