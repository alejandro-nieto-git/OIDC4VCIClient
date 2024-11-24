import { ClaimPayloadCommonOpts, ClaimPayloadOptsVID1, CreateAuthorizationRequestOpts } from '../authorization-request';
import { AuthorizationRequestPayload, RequestObjectJwt, RequestObjectPayload } from '../types';
import { RequestObjectOpts } from './types';
export declare class RequestObject {
    private payload;
    private jwt;
    private readonly opts;
    private constructor();
    /**
     * Create a request object that typically is used as a JWT on RP side, typically this method is called automatically when creating an Authorization Request, but you could use it directly!
     *
     * @param authorizationRequestOpts Request Object options to build a Request Object
     * @remarks This method is used to generate a SIOP request Object.
     * First it generates the request object payload, and then it a signed JWT can be accessed on request.
     *
     * Normally you will want to use the Authorization Request class. That class creates a URI that includes the JWT from this class in the URI
     * If you do use this class directly, you can call the `convertRequestObjectToURI` afterwards to get the URI.
     * Please note that the Authorization Request allows you to differentiate between OAuth2 and OpenID parameters that become
     * part of the URI and which become part of the Request Object. If you generate a URI based upon the result of this class,
     * the URI will be constructed based on the Request Object only!
     */
    static fromOpts(authorizationRequestOpts: CreateAuthorizationRequestOpts): Promise<RequestObject>;
    static fromJwt(requestObjectJwt: RequestObjectJwt): Promise<RequestObject>;
    static fromPayload(requestObjectPayload: RequestObjectPayload, authorizationRequestOpts: CreateAuthorizationRequestOpts): Promise<RequestObject>;
    static fromAuthorizationRequestPayload(payload: AuthorizationRequestPayload): Promise<RequestObject | undefined>;
    toJwt(): Promise<RequestObjectJwt | undefined>;
    getPayload(): Promise<RequestObjectPayload | undefined>;
    assertValid(): Promise<void>;
    get options(): RequestObjectOpts<ClaimPayloadCommonOpts | ClaimPayloadOptsVID1> | undefined;
    private removeRequestProperties;
    private static mergeOAuth2AndOpenIdProperties;
}
