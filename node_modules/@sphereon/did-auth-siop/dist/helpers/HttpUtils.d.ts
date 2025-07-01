import { ContentType, SIOPResonse } from '../types';
export declare const getJson: <T>(URL: string, opts?: {
    bearerToken?: string;
    contentType?: string | ContentType;
    accept?: string;
    customHeaders?: HeadersInit;
    exceptionOnHttpErrorStatus?: boolean;
}) => Promise<SIOPResonse<T>>;
export declare const formPost: <T>(url: string, body: BodyInit, opts?: {
    bearerToken?: string;
    contentType?: string | ContentType;
    accept?: string;
    customHeaders?: HeadersInit;
    exceptionOnHttpErrorStatus?: boolean;
}) => Promise<SIOPResonse<T>>;
export declare const post: <T>(url: string, body?: BodyInit, opts?: {
    bearerToken?: string;
    contentType?: string | ContentType;
    accept?: string;
    customHeaders?: HeadersInit;
    exceptionOnHttpErrorStatus?: boolean;
}) => Promise<SIOPResonse<T>>;
export declare const getWithUrl: <T>(url: string, textResponse?: boolean) => Promise<T>;
export declare const fetchByReferenceOrUseByValue: <T>(referenceURI: string, valueObject: T, textResponse?: boolean) => Promise<T>;
