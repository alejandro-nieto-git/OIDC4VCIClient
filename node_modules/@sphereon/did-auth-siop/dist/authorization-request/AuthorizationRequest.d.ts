import { PresentationDefinitionWithLocation } from '../authorization-response';
import { RequestObject } from '../request-object';
import { AuthorizationRequestPayload, RequestObjectJwt, RequestObjectPayload, RequestStateInfo, ResponseType, SupportedVersion, VerifiedAuthorizationRequest } from '../types';
import { URI } from './URI';
import { CreateAuthorizationRequestOpts, VerifyAuthorizationRequestOpts } from './types';
export declare class AuthorizationRequest {
    private readonly _requestObject?;
    private readonly _payload;
    private readonly _options;
    private _uri;
    private constructor();
    static fromUriOrJwt(jwtOrUri: string | URI): Promise<AuthorizationRequest>;
    static fromPayload(payload: AuthorizationRequestPayload): Promise<AuthorizationRequest>;
    static fromOpts(opts: CreateAuthorizationRequestOpts, requestObject?: RequestObject): Promise<AuthorizationRequest>;
    get payload(): AuthorizationRequestPayload;
    get requestObject(): RequestObject | undefined;
    get options(): CreateAuthorizationRequestOpts | undefined;
    hasRequestObject(): boolean;
    getSupportedVersion(): Promise<SupportedVersion>;
    getSupportedVersionsFromPayload(): Promise<SupportedVersion[]>;
    uri(): Promise<URI>;
    /**
     * Verifies a SIOP Request JWT on OP side
     *
     * @param opts
     */
    verify(opts: VerifyAuthorizationRequestOpts): Promise<VerifiedAuthorizationRequest>;
    static verify(requestOrUri: string, verifyOpts: VerifyAuthorizationRequestOpts): Promise<VerifiedAuthorizationRequest>;
    requestObjectJwt(): Promise<RequestObjectJwt | undefined>;
    private static fromJwt;
    private static fromURI;
    toStateInfo(): Promise<RequestStateInfo>;
    containsResponseType(singleType: ResponseType | string): Promise<boolean>;
    getMergedProperty<T>(key: string): Promise<T | undefined>;
    mergedPayloads(): Promise<RequestObjectPayload>;
    getPresentationDefinitions(version?: SupportedVersion): Promise<PresentationDefinitionWithLocation[] | undefined>;
}
