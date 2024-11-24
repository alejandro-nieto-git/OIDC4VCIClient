import { Hasher } from '@sphereon/ssi-types';
import { AuthorizationRequest, ClaimPayloadCommonOpts, CreateAuthorizationRequestOpts, RequestPropertyWithTargets, URI } from '../authorization-request';
import { PresentationDefinitionWithLocation, VerifyAuthorizationResponseOpts } from '../authorization-response';
import { AuthorizationResponsePayload, ExternalVerification, InternalVerification, RegisterEventListener, ResponseURIType, SupportedVersion, VerifiedAuthorizationResponse } from '../types';
import { RPBuilder } from './RPBuilder';
import { IRPSessionManager } from './types';
export declare class RP {
    get sessionManager(): IRPSessionManager;
    private readonly _createRequestOptions;
    private readonly _verifyResponseOptions;
    private readonly _eventEmitter?;
    private readonly _sessionManager?;
    private constructor();
    static fromRequestOpts(opts: CreateAuthorizationRequestOpts): RP;
    static builder(opts?: {
        requestVersion?: SupportedVersion;
    }): RPBuilder;
    createAuthorizationRequest(opts: {
        correlationId: string;
        nonce: string | RequestPropertyWithTargets<string>;
        state: string | RequestPropertyWithTargets<string>;
        claims?: ClaimPayloadCommonOpts | RequestPropertyWithTargets<ClaimPayloadCommonOpts>;
        version?: SupportedVersion;
        requestByReferenceURI?: string;
        responseURI?: string;
        responseURIType?: ResponseURIType;
    }): Promise<AuthorizationRequest>;
    createAuthorizationRequestURI(opts: {
        correlationId: string;
        nonce: string | RequestPropertyWithTargets<string>;
        state: string | RequestPropertyWithTargets<string>;
        claims?: ClaimPayloadCommonOpts | RequestPropertyWithTargets<ClaimPayloadCommonOpts>;
        version?: SupportedVersion;
        requestByReferenceURI?: string;
        responseURI?: string;
        responseURIType?: ResponseURIType;
    }): Promise<URI>;
    signalAuthRequestRetrieved(opts: {
        correlationId: string;
        error?: Error;
    }): Promise<void>;
    verifyAuthorizationResponse(authorizationResponsePayload: AuthorizationResponsePayload, opts?: {
        correlationId?: string;
        hasher?: Hasher;
        audience?: string;
        state?: string;
        nonce?: string;
        verification?: InternalVerification | ExternalVerification;
        presentationDefinitions?: PresentationDefinitionWithLocation | PresentationDefinitionWithLocation[];
    }): Promise<VerifiedAuthorizationResponse>;
    get createRequestOptions(): CreateAuthorizationRequestOpts;
    get verifyResponseOptions(): Partial<VerifyAuthorizationResponseOpts>;
    private newAuthorizationRequestOpts;
    private newVerifyAuthorizationResponseOpts;
    private emitEvent;
    addEventListener(register: RegisterEventListener): void;
}
