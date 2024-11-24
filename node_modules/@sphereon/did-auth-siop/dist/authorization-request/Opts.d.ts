import { ExternalVerification, InternalVerification } from '../types';
import { CreateAuthorizationRequestOpts, VerifyAuthorizationRequestOpts } from './types';
export declare const assertValidVerifyAuthorizationRequestOpts: (opts: VerifyAuthorizationRequestOpts) => void;
export declare const assertValidAuthorizationRequestOpts: (opts: CreateAuthorizationRequestOpts) => void;
export declare const mergeVerificationOpts: (classOpts: {
    verification?: InternalVerification | ExternalVerification;
}, requestOpts: {
    correlationId: string;
    verification?: InternalVerification | ExternalVerification;
}) => {
    resolveOpts: {
        jwtVerifyOpts: {
            policies: {
                aud: boolean;
                now?: number;
                nbf?: boolean;
                iat?: boolean;
                exp?: boolean;
            };
            resolver: import("did-resolver").Resolvable;
            auth?: boolean;
            audience?: string;
            callbackUrl?: string;
            skewTime?: number;
            proofPurpose?: import("did-jwt/lib/JWT").ProofPurposeTypes;
        };
        resolver: import("did-resolver").Resolvable;
        resolveUrl?: string;
        noUniversalResolverFallback?: boolean;
        subjectSyntaxTypesSupported?: string[];
    };
    revocationOpts: {
        revocationVerificationCallback: import("../types").RevocationVerificationCallback;
        revocationVerification: import("../types").RevocationVerification;
    };
    replayRegistry: import("..").IRPSessionManager;
    presentationVerificationCallback: import("..").PresentationVerificationCallback;
    wellknownDIDVerifyCallback: import("@sphereon/wellknown-dids-client").VerifyCallback;
    checkLinkedDomain?: import("../types").CheckLinkedDomain;
    mode: import("../types").VerificationMode;
} | {
    resolveOpts: {
        jwtVerifyOpts: {
            policies: {
                aud: boolean;
                now?: number;
                nbf?: boolean;
                iat?: boolean;
                exp?: boolean;
            };
            resolver: import("did-resolver").Resolvable;
            auth?: boolean;
            audience?: string;
            callbackUrl?: string;
            skewTime?: number;
            proofPurpose?: import("did-jwt/lib/JWT").ProofPurposeTypes;
        };
        resolver: import("did-resolver").Resolvable;
        resolveUrl?: string;
        noUniversalResolverFallback?: boolean;
        subjectSyntaxTypesSupported?: string[];
    };
    revocationOpts: {
        revocationVerificationCallback: import("../types").RevocationVerificationCallback;
        revocationVerification: import("../types").RevocationVerification;
    };
    replayRegistry: import("..").IRPSessionManager;
    presentationVerificationCallback: import("..").PresentationVerificationCallback;
    wellknownDIDVerifyCallback: import("@sphereon/wellknown-dids-client").VerifyCallback;
    verifyUri: string;
    authZToken?: string;
    checkLinkedDomain?: import("../types").CheckLinkedDomain;
    mode: import("../types").VerificationMode;
} | {
    resolveOpts: {
        jwtVerifyOpts: {
            policies: {
                aud: boolean;
                now?: number;
                nbf?: boolean;
                iat?: boolean;
                exp?: boolean;
            };
            resolver: import("did-resolver").Resolvable;
            auth?: boolean;
            audience?: string;
            callbackUrl?: string;
            skewTime?: number;
            proofPurpose?: import("did-jwt/lib/JWT").ProofPurposeTypes;
        };
        resolver: import("did-resolver").Resolvable;
        resolveUrl?: string;
        noUniversalResolverFallback?: boolean;
        subjectSyntaxTypesSupported?: string[];
    };
    revocationOpts: {
        revocationVerificationCallback: import("../types").RevocationVerificationCallback;
        revocationVerification: import("../types").RevocationVerification;
    };
    replayRegistry: import("..").IRPSessionManager;
    presentationVerificationCallback: import("..").PresentationVerificationCallback;
    wellknownDIDVerifyCallback: import("@sphereon/wellknown-dids-client").VerifyCallback;
    checkLinkedDomain?: import("../types").CheckLinkedDomain;
    mode: import("../types").VerificationMode;
    verifyUri: string;
    authZToken?: string;
} | {
    resolveOpts: {
        jwtVerifyOpts: {
            policies: {
                aud: boolean;
                now?: number;
                nbf?: boolean;
                iat?: boolean;
                exp?: boolean;
            };
            resolver: import("did-resolver").Resolvable;
            auth?: boolean;
            audience?: string;
            callbackUrl?: string;
            skewTime?: number;
            proofPurpose?: import("did-jwt/lib/JWT").ProofPurposeTypes;
        };
        resolver: import("did-resolver").Resolvable;
        resolveUrl?: string;
        noUniversalResolverFallback?: boolean;
        subjectSyntaxTypesSupported?: string[];
    };
    revocationOpts: {
        revocationVerificationCallback: import("../types").RevocationVerificationCallback;
        revocationVerification: import("../types").RevocationVerification;
    };
    replayRegistry: import("..").IRPSessionManager;
    presentationVerificationCallback: import("..").PresentationVerificationCallback;
    wellknownDIDVerifyCallback: import("@sphereon/wellknown-dids-client").VerifyCallback;
    verifyUri: string;
    authZToken?: string;
    checkLinkedDomain?: import("../types").CheckLinkedDomain;
    mode: import("../types").VerificationMode;
};
