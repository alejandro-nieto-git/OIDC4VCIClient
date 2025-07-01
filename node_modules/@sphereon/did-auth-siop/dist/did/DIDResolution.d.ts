import { Resolvable } from 'did-resolver';
import { DIDDocument, ResolveOpts } from '../types';
export declare function getResolver(opts: ResolveOpts): Resolvable;
/**
 * This method returns a resolver object in OP/RP
 * If the user of this library, configures OP/RP to have a customResolver, we will use that
 * If the user of this library configures OP/RP to use a custom resolver for any specific did method, we will use that
 * and in the end for the rest of the did methods, configured either with calling `addDidMethod` upon building OP/RP
 * (without any resolver configuration) or declaring in the subject_syntax_types_supported of the registration object
 * we will use universal resolver from Sphereon's DID Universal Resolver library
 * @param customResolver
 * @param subjectSyntaxTypesSupported
 * @param resolverMap
 */
export declare function getResolverUnion(customResolver: Resolvable, subjectSyntaxTypesSupported: string[] | string, resolverMap: Map<string, Resolvable>): Resolvable;
export declare function mergeAllDidMethods(subjectSyntaxTypesSupported: string | string[], resolvers: Map<string, Resolvable>): string[];
export declare function resolveDidDocument(did: string, opts?: ResolveOpts): Promise<DIDDocument>;
