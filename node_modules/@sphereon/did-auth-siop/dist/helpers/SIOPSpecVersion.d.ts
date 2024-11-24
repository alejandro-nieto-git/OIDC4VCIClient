import { AuthorizationRequestPayload, SupportedVersion } from '../types';
export declare const authorizationRequestVersionDiscovery: (authorizationRequest: AuthorizationRequestPayload) => SupportedVersion[];
export declare const checkSIOPSpecVersionSupported: (payload: AuthorizationRequestPayload, supportedVersions: SupportedVersion[]) => Promise<SupportedVersion[]>;
