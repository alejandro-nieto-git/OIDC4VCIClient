"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDidDocument = exports.mergeAllDidMethods = exports.getResolverUnion = exports.getResolver = void 0;
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const types_1 = require("../types");
const index_1 = require("./index");
function getResolver(opts) {
    if (opts && typeof opts.resolver === 'object') {
        return opts.resolver;
    }
    if (!opts || !opts.subjectSyntaxTypesSupported) {
        if (opts === null || opts === void 0 ? void 0 : opts.noUniversalResolverFallback) {
            throw Error(`No subject syntax types nor did methods configured for DID resolution, but fallback to universal resolver has been disabled`);
        }
        console.log(`Falling back to universal resolver as no resolve opts have been provided, or no subject syntax types supported are provided. It is wise to fix this`);
        return new did_uni_client_1.UniResolver();
    }
    const uniResolvers = [];
    if (opts.subjectSyntaxTypesSupported.indexOf(types_1.SubjectIdentifierType.DID) === -1) {
        const specificDidMethods = opts.subjectSyntaxTypesSupported.filter((sst) => sst.includes('did:'));
        if (!specificDidMethods.length) {
            throw new Error(types_1.SIOPErrors.NO_DID_METHOD_FOUND);
        }
        for (const didMethod of specificDidMethods) {
            const uniResolver = (0, did_uni_client_1.getUniResolver)((0, index_1.getMethodFromDid)(didMethod), { resolveUrl: opts.resolveUrl });
            uniResolvers.push(uniResolver);
        }
        return new did_resolver_1.Resolver(...uniResolvers);
    }
    else {
        if (opts === null || opts === void 0 ? void 0 : opts.noUniversalResolverFallback) {
            throw Error(`No subject syntax types nor did methods configured for DID resolution, but fallback to universal resolver has been disabled`);
        }
        console.log(`Falling back to universal resolver as no resolve opts have been provided, or no subject syntax types supported are provided. It is wise to fix this`);
        return new did_uni_client_1.UniResolver();
    }
}
exports.getResolver = getResolver;
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
function getResolverUnion(customResolver, subjectSyntaxTypesSupported, resolverMap) {
    if (customResolver) {
        return customResolver;
    }
    const fallbackResolver = customResolver ? customResolver : new did_uni_client_1.UniResolver();
    const uniResolvers = [];
    const subjectTypes = [];
    if (subjectSyntaxTypesSupported) {
        typeof subjectSyntaxTypesSupported === 'string'
            ? subjectTypes.push(subjectSyntaxTypesSupported)
            : subjectTypes.push(...subjectSyntaxTypesSupported);
    }
    if (subjectTypes.indexOf(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) !== -1) {
        return customResolver ? customResolver : new did_uni_client_1.UniResolver();
    }
    const specificDidMethods = subjectTypes.filter((sst) => !!sst && sst.startsWith('did:'));
    specificDidMethods.forEach((dm) => {
        let methodResolver;
        if (!resolverMap.has(dm) || resolverMap.get(dm) === null) {
            methodResolver = (0, did_uni_client_1.getUniResolver)((0, index_1.getMethodFromDid)(dm));
        }
        else {
            methodResolver = resolverMap.get(dm);
        }
        uniResolvers.push(methodResolver);
    });
    return subjectTypes.indexOf(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) !== -1
        ? new did_resolver_1.Resolver(...Object.assign({ fallbackResolver }, uniResolvers))
        : new did_resolver_1.Resolver(...uniResolvers);
}
exports.getResolverUnion = getResolverUnion;
function mergeAllDidMethods(subjectSyntaxTypesSupported, resolvers) {
    if (!Array.isArray(subjectSyntaxTypesSupported)) {
        subjectSyntaxTypesSupported = [subjectSyntaxTypesSupported];
    }
    const unionSubjectSyntaxTypes = new Set();
    subjectSyntaxTypesSupported.forEach((sst) => unionSubjectSyntaxTypes.add(sst));
    resolvers.forEach((_, didMethod) => unionSubjectSyntaxTypes.add((0, index_1.toSIOPRegistrationDidMethod)(didMethod)));
    return Array.from(unionSubjectSyntaxTypes);
}
exports.mergeAllDidMethods = mergeAllDidMethods;
function resolveDidDocument(did, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        // todo: The accept is only there because did:key used by Veramo requires it. According to the spec it is optional. It should not hurt, but let's test
        const result = yield getResolver(Object.assign({}, opts)).resolve(did, { accept: 'application/did+ld+json' });
        if ((_a = result === null || result === void 0 ? void 0 : result.didResolutionMetadata) === null || _a === void 0 ? void 0 : _a.error) {
            throw Error(result.didResolutionMetadata.error);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!result.didDocument && result.id) {
            // todo: This looks like a bug. It seems that sometimes we get back a DID document directly instead of a did resolution results
            return result;
        }
        return result.didDocument;
    });
}
exports.resolveDidDocument = resolveDidDocument;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRElEUmVzb2x1dGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kaWQvRElEUmVzb2x1dGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw2REFBdUU7QUFDdkUsK0NBQTBHO0FBRTFHLG9DQUEwSDtBQUUxSCxtQ0FBd0U7QUFFeEUsU0FBZ0IsV0FBVyxDQUFDLElBQWlCO0lBQzNDLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUUsQ0FBQztRQUM5QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUNELElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUMvQyxJQUFJLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSwyQkFBMkIsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sS0FBSyxDQUFDLDZIQUE2SCxDQUFDLENBQUM7UUFDN0ksQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQ1QscUpBQXFKLENBQ3RKLENBQUM7UUFDRixPQUFPLElBQUksNEJBQVcsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxNQUFNLFlBQVksR0FFWixFQUFFLENBQUM7SUFDVCxJQUFJLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsNkJBQXFCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUMvRSxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztRQUNsRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLG1CQUFtQixDQUFDLENB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