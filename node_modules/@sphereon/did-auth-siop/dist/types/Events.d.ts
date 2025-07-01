export declare enum AuthorizationEvents {
    ON_AUTH_REQUEST_CREATED_SUCCESS = "onAuthRequestCreatedSuccess",
    ON_AUTH_REQUEST_CREATED_FAILED = "onAuthRequestCreatedFailed",
    ON_AUTH_REQUEST_SENT_SUCCESS = "onAuthRequestSentSuccess",
    ON_AUTH_REQUEST_SENT_FAILED = "onAuthRequestSentFailed",
    ON_AUTH_REQUEST_RECEIVED_SUCCESS = "onAuthRequestReceivedSuccess",
    ON_AUTH_REQUEST_RECEIVED_FAILED = "onAuthRequestReceivedFailed",
    ON_AUTH_REQUEST_VERIFIED_SUCCESS = "onAuthRequestVerifiedSuccess",
    ON_AUTH_REQUEST_VERIFIED_FAILED = "onAuthRequestVerifiedFailed",
    ON_AUTH_RESPONSE_CREATE_SUCCESS = "onAuthResponseCreateSuccess",
    ON_AUTH_RESPONSE_CREATE_FAILED = "onAuthResponseCreateFailed",
    ON_AUTH_RESPONSE_SENT_SUCCESS = "onAuthResponseSentSuccess",
    ON_AUTH_RESPONSE_SENT_FAILED = "onAuthResponseSentFailed",
    ON_AUTH_RESPONSE_RECEIVED_SUCCESS = "onAuthResponseReceivedSuccess",
    ON_AUTH_RESPONSE_RECEIVED_FAILED = "onAuthResponseReceivedFailed",
    ON_AUTH_RESPONSE_VERIFIED_SUCCESS = "onAuthResponseVerifiedSuccess",
    ON_AUTH_RESPONSE_VERIFIED_FAILED = "onAuthResponseVerifiedFailed"
}
export declare class AuthorizationEvent<T> {
    private readonly _subject;
    private readonly _error?;
    private readonly _timestamp;
    private readonly _correlationId;
    constructor(args: {
        correlationId: string;
        subject?: T;
        error?: Error;
    });
    get subject(): T;
    get timestamp(): number;
    get error(): Error;
    hasError(): boolean;
    get correlationId(): string;
}
export interface RegisterEventListener {
    event: AuthorizationEvents | AuthorizationEvents[];
    listener: (...args: any[]) => void;
}
