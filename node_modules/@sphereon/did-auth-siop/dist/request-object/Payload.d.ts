import { CreateAuthorizationRequestOpts } from '../authorization-request';
import { RequestObjectPayload } from '../types';
export declare const createRequestObjectPayload: (opts: CreateAuthorizationRequestOpts) => Promise<RequestObjectPayload | undefined>;
export declare const assertValidRequestObjectPayload: (verPayload: RequestObjectPayload) => void;
