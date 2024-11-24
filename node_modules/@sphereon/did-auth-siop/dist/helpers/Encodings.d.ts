export declare function decodeUriAsJson(uri: string): any;
export declare function encodeJsonAsURI(json: unknown, _opts?: {
    arraysWithIndex?: string[];
}): string;
export declare function base64ToHexString(input: string, encoding?: 'base64url' | 'base64'): string;
export declare function fromBase64(base64: string): string;
export declare function base64urlEncodeBuffer(buf: {
    toString: (arg0: 'base64') => string;
}): string;
