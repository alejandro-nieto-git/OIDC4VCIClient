import { EvaluationResults, IPresentationDefinition, PEX, SelectResults, VerifiablePresentationFromOpts, VerifiablePresentationResult } from '@sphereon/pex';
import { Format, PresentationSubmission } from '@sphereon/pex-models';
import { Hasher, OriginalVerifiableCredential, OriginalVerifiablePresentation, WrappedVerifiablePresentation } from '@sphereon/ssi-types';
import { AuthorizationRequestPayload, SupportedVersion } from '../types';
import { PresentationDefinitionWithLocation, PresentationSignCallback, PresentationVerificationCallback } from './types';
export declare class PresentationExchange {
    readonly pex: PEX;
    readonly allVerifiableCredentials: OriginalVerifiableCredential[];
    readonly allDIDs: any;
    constructor(opts: {
        allDIDs?: string[];
        allVerifiableCredentials: OriginalVerifiableCredential[];
        hasher?: Hasher;
    });
    /**
     * Construct presentation submission from selected credentials
     * @param presentationDefinition payload object received by the OP from the RP
     * @param selectedCredentials
     * @param presentationSignCallback
     * @param options
     */
    createVerifiablePresentation(presentationDefinition: IPresentationDefinition, selectedCredentials: OriginalVerifiableCredential[], presentationSignCallback: PresentationSignCallback, options?: VerifiablePresentationFromOpts): Promise<VerifiablePresentationResult>;
    /**
     * This method will be called from the OP when we are certain that we have a
     * PresentationDefinition object inside our requestPayload
     * Finds a set of `VerifiableCredential`s from a list supplied to this class during construction,
     * matching presentationDefinition object found in the requestPayload
     * if requestPayload doesn't contain any valid presentationDefinition throws an error
     * if PEX library returns any error in the process, throws the error
     * returns the SelectResults object if successful
     * @param presentationDefinition object received by the OP from the RP
     * @param opts
     */
    selectVerifiableCredentialsForSubmission(presentationDefinition: IPresentationDefinition, opts?: {
        holderDIDs?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
    }): Promise<SelectResults>;
    /**
     * validatePresentationAgainstDefinition function is called mainly by the RP
     * after receiving the VP from the OP
     * @param presentationDefinition object containing PD
     * @param verifiablePresentation
     * @param opts
     */
    static validatePresentationAgainstDefinition(presentationDefinition: IPresentationDefinition, verifiablePresentation: OriginalVerifiablePresentation | WrappedVerifiablePresentation, opts?: {
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
        presentationSubmission?: PresentationSubmission;
        hasher?: Hasher;
    }): Promise<EvaluationResults>;
    static assertValidPresentationSubmission(presentationSubmission: PresentationSubmission): void;
    /**
     * Finds a valid PresentationDefinition inside the given AuthenticationRequestPayload
     * throws exception if the PresentationDefinition is not valid
     * returns null if no property named "presentation_definition" is found
     * returns a PresentationDefinition if a valid instance found
     * @param authorizationRequestPayload object that can have a presentation_definition inside
     * @param version
     */
    static findValidPresentationDefinitions(authorizationRequestPayload: AuthorizationRequestPayload, version?: SupportedVersion): Promise<PresentationDefinitionWithLocation[]>;
    static assertValidPresentationDefinitionWithLocations(definitionsWithLocations: PresentationDefinitionWithLocation[]): void;
    private static assertValidPresentationDefinition;
    static validatePresentationsAgainstDefinitions(definitions: PresentationDefinitionWithLocation[], vpPayloads: WrappedVerifiablePresentation[], verifyPresentationCallback: PresentationVerificationCallback | undefined, opts?: {
        limitDisclosureSignatureSuites?: string[];
        restrictToFormats?: Format;
        restrictToDIDMethods?: string[];
        presentationSubmission?: PresentationSubmission;
        hasher?: Hasher;
    }): Promise<void>;
    private static validatePresentationsAgainstDefinition;
}
