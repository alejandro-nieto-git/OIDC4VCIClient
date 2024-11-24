/// <reference types="node" />
import { EventEmitter } from 'events';
import { AuthorizationRequestState, AuthorizationResponseState } from '../types';
import { IRPSessionManager } from './types';
/**
 * Please note that this session manager is not really meant to be used in large production settings, as it stores everything in memory!
 * It also doesn't do scheduled cleanups. It runs a cleanup whenever a request or response is received. In a high-volume production setting you will want scheduled cleanups running in the background
 * Since this is a low level library we have not created a full-fledged implementation.
 * We suggest to create your own implementation using the event system of the library
 */
export declare class InMemoryRPSessionManager implements IRPSessionManager {
    private readonly authorizationRequests;
    private readonly authorizationResponses;
    private readonly nonceMapping;
    private readonly stateMapping;
    private readonly maxAgeInSeconds;
    private static getKeysForCorrelationId;
    constructor(eventEmitter: EventEmitter, opts?: {
        maxAgeInSeconds?: number;
    });
    getRequestStateByCorrelationId(correlationId: string, errorOnNotFound?: boolean): Promise<AuthorizationRequestState | undefined>;
    getRequestStateByNonce(nonce: string, errorOnNotFound?: boolean): Promise<AuthorizationRequestState | undefined>;
    getRequestStateByState(state: string, errorOnNotFound?: boolean): Promise<AuthorizationRequestState | undefined>;
    getResponseStateByCorrelationId(correlationId: string, errorOnNotFound?: boolean): Promise<AuthorizationResponseState | undefined>;
    getResponseStateByNonce(nonce: string, errorOnNotFound?: boolean): Promise<AuthorizationResponseState | undefined>;
    getResponseStateByState(state: string, errorOnNotFound?: boolean): Promise<AuthorizationResponseState | undefined>;
    private getFromMapping;
    private onAuthorizationRequestCreatedSuccess;
    private onAuthorizationRequestCreatedFailed;
    private onAuthorizationRequestSentSuccess;
    private onAuthorizationRequestSentFailed;
    private onAuthorizationResponseReceivedSuccess;
    private onAuthorizationResponseReceivedFailed;
    private onAuthorizationResponseVerifiedFailed;
    private onAuthorizationResponseVerifiedSuccess;
    getCorrelationIdByNonce(nonce: string, errorOnNotFound?: boolean): Promise<string | undefined>;
    getCorrelationIdByState(state: string, errorOnNotFound?: boolean): Promise<string | undefined>;
    private getCorrelationIdImpl;
    private updateMapping;
    private updateState;
    deleteStateForCorrelationId(correlationId: string): Promise<void>;
    private static cleanMappingForCorrelationId;
    private cleanup;
}
