import { WrappedVerifiablePresentation } from '@sphereon/ssi-types';
import { RevocationVerification, RevocationVerificationCallback } from '../types';
export declare const verifyRevocation: (vpToken: WrappedVerifiablePresentation, revocationVerificationCallback: RevocationVerificationCallback, revocationVerification: RevocationVerification) => Promise<void>;
