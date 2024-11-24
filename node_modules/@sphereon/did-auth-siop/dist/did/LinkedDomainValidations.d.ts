import { ExternalVerification, InternalVerification } from '../types';
export declare function validateLinkedDomainWithDid(did: string, verification: InternalVerification | ExternalVerification): Promise<void>;
