import { ClientMetadataOpts, RequestClientMetadataPayloadProperties, RequestRegistrationPayloadProperties, RPRegistrationMetadataPayload } from '../types';
import { CreateAuthorizationRequestOpts } from './types';
export declare const assertValidRequestRegistrationOpts: (opts: ClientMetadataOpts) => void;
export declare const createRequestRegistration: (clientMetadataOpts: ClientMetadataOpts, createRequestOpts: CreateAuthorizationRequestOpts) => Promise<{
    payload: RequestRegistrationPayloadProperties | RequestClientMetadataPayloadProperties;
    metadata: RPRegistrationMetadataPayload;
    createRequestOpts: CreateAuthorizationRequestOpts;
    clientMetadataOpts: ClientMetadataOpts;
}>;
