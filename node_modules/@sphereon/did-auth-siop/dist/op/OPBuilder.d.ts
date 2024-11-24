/// <reference types="node" />
import { EventEmitter } from 'events';
import { Hasher, IIssuerId } from '@sphereon/ssi-types';
import { VerifyCallback } from '@sphereon/wellknown-dids-client';
import { Signer } from 'did-jwt';
import { Resolvable } from 'did-resolver';
import { PropertyTargets } from '../authorization-request';
import { PresentationSignCallback } from '../authorization-response';
import { CheckLinkedDomain, EcdsaSignature, ExternalSignature, InternalSignature, ResponseIss, ResponseMode, ResponseRegistrationOpts, SigningAlgo, SuppliedSignature, SupportedVersion } from '../types';
import { OP } from './OP';
export declare class OPBuilder {
    expiresIn?: number;
    issuer?: IIssuerId | ResponseIss;
    resolvers: Map<string, Resolvable>;
    responseMode?: ResponseMode;
    responseRegistration?: Partial<ResponseRegistrationOpts>;
    customResolver?: Resolvable;
    signature?: InternalSignature | ExternalSignature | SuppliedSignature;
    checkLinkedDomain?: CheckLinkedDomain;
    wellknownDIDVerifyCallback?: VerifyCallback;
    presentationSignCallback?: PresentationSignCallback;
    supportedVersions?: SupportedVersion[];
    eventEmitter?: EventEmitter;
    hasher?: Hasher;
    addDidMethod(didMethod: string, opts?: {
        resolveUrl?: string;
        baseUrl?: string;
    }): OPBuilder;
    withHasher(hasher: Hasher): OPBuilder;
    withIssuer(issuer: ResponseIss | string): OPBuilder;
    withCustomResolver(resolver: Resolvable): OPBuilder;
    addResolver(didMethod: string, resolver: Resolvable): OPBuilder;
    withExpiresIn(expiresIn: number): OPBuilder;
    withCheckLinkedDomain(mode: CheckLinkedDomain): OPBuilder;
    withResponseMode(responseMode: ResponseMode): OPBuilder;
    withRegistration(responseRegistration: ResponseRegistrationOpts, targets?: PropertyTargets): OPBuilder;
    withSignature(signature: InternalSignature | SuppliedSignature): OPBuilder;
    withInternalSignature(hexPrivateKey: string, did: string, kid: string, alg: SigningAlgo, customJwtSigner?: Signer): OPBuilder;
    withSuppliedSignature(signature: (data: string | Uint8Array) => Promise<EcdsaSignature | string>, did: string, kid: string, alg: SigningAlgo): OPBuilder;
    withWellknownDIDVerifyCallback(wellknownDIDVerifyCallback: VerifyCallback): OPBuilder;
    withSupportedVersions(supportedVersions: SupportedVersion[] | SupportedVersion | string[] | string): OPBuilder;
    addSupportedVersion(supportedVersion: string | SupportedVersion): OPBuilder;
    withPresentationSignCallback(presentationSignCallback: PresentationSignCallback): OPBuilder;
    withEventEmitter(eventEmitter?: EventEmitter): OPBuilder;
    build(): OP;
}
