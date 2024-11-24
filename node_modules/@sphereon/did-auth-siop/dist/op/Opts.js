"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVerifyRequestOptsFromBuilderOrExistingOpts = exports.createResponseOptsFromBuilderOrExistingOpts = void 0;
const did_1 = require("../did");
const helpers_1 = require("../helpers");
const schemas_1 = require("../schemas");
const types_1 = require("../types");
const createResponseOptsFromBuilderOrExistingOpts = (opts) => {
    var _a, _b, _c;
    if (((_a = opts === null || opts === void 0 ? void 0 : opts.builder) === null || _a === void 0 ? void 0 : _a.resolvers.size) && ((_c = (_b = opts.builder) === null || _b === void 0 ? void 0 : _b.responseRegistration) === null || _c === void 0 ? void 0 : _c.subject_syntax_types_supported)) {
        opts.builder.responseRegistration.subject_syntax_types_supported = (0, did_1.mergeAllDidMethods)(opts.builder.responseRegistration.subject_syntax_types_supported, opts.builder.resolvers);
    }
    let responseOpts;
    if (opts.builder) {
        responseOpts = Object.assign({ registration: Object.assign({ issuer: opts.builder.issuer }, opts.builder.responseRegistration), expiresIn: opts.builder.expiresIn, signature: opts.builder.signature, responseMode: opts.builder.responseMode }, ((responseOpts === null || responseOpts === void 0 ? void 0 : responseOpts.version)
            ? { version: responseOpts.version }
            : Array.isArray(opts.builder.supportedVersions) && opts.builder.supportedVersions.length > 0
                ? { version: opts.builder.supportedVersions[0] }
                : {}));
        if (!responseOpts.registration.passBy) {
            responseOpts.registration.passBy = types_1.PassBy.VALUE;
        }
        const languageTagEnabledFieldsNames = ['clientName', 'clientPurpose'];
        const languageTaggedFields = helpers_1.LanguageTagUtils.getLanguageTaggedProperties(opts.builder.responseRegistration, languageTagEnabledFieldsNames);
        languageTaggedFields.forEach((value, key) => {
            responseOpts.registration[key] = value;
        });
    }
    else {
        responseOpts = Object.assign({}, opts.responseOpts);
    }
    const valid = (0, schemas_1.AuthorizationResponseOptsSchema)(responseOpts);
    if (!valid) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        throw new Error('OP builder validation error: ' + JSON.stringify(schemas_1.AuthorizationResponseOptsSchema.errors));
    }
    return responseOpts;
};
exports.createResponseOptsFromBuilderOrExistingOpts = createResponseOptsFromBuilderOrExistingOpts;
const createVerifyRequestOptsFromBuilderOrExistingOpts = (opts) => {
    var _a, _b;
    if (((_a = opts === null || opts === void 0 ? void 0 : opts.builder) === null || _a === void 0 ? void 0 : _a.resolvers.size) && ((_b = opts.builder) === null || _b === void 0 ? void 0 : _b.responseRegistration)) {
        opts.builder.responseRegistration.subject_syntax_types_supported = (0, did_1.mergeAllDidMethods)(opts.builder.responseRegistration.subject_syntax_types_supported, opts.builder.resolvers);
    }
    let resolver;
    if (opts.builder) {
        resolver = (0, did_1.getResolverUnion)(opts.builder.customResolver, opts.builder.responseRegistration.subject_syntax_types_supported, opts.builder.resolvers);
    }
    return opts.builder
        ? {
            hasher: opts.builder.hasher,
            verification: {
                mode: types_1.VerificationMode.INTERNAL,
                checkLinkedDomain: opts.builder.checkLinkedDomain,
                wellknownDIDVerifyCallback: opts.builder.wellknownDIDVerifyCallback,
                resolveOpts: {
                    subjectSyntaxTypesSupported: opts.builder.responseRegistration.subject_syntax_types_supported,
                    resolver: resolver,
                },
            },
            supportedVersions: opts.builder.supportedVersions,
            correlationId: undefined,
        }
        : opts.verifyOpts;
};
exports.createVerifyRequestOptsFromBuilderOrExistingOpts = createVerifyRequestOptsFromBuilderOrExistingOpts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vcC9PcHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLGdDQUE4RDtBQUM5RCx3Q0FBOEM7QUFDOUMsd0NBQTZEO0FBQzdELG9DQUFvRztBQUk3RixNQUFNLDJDQUEyQyxHQUFHLENBQUMsSUFHM0QsRUFBNkIsRUFBRTs7SUFDOUIsSUFBSSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sMENBQUUsU0FBUyxDQUFDLElBQUksTUFBSSxNQUFBLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsb0JBQW9CLDBDQUFFLDhCQUE4QixDQUFBLEVBQUUsQ0FBQztRQUN4RyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLDhCQUE4QixHQUFHLElBQUEsd0JBQWtCLEVBQ25GLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsOEJBQThCLEVBQ2hFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUN2QixDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksWUFBdUMsQ0FBQztJQUM1QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixZQUFZLG1CQUNWLFlBQVksa0JBQ1YsTUFBTSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFpRCxHQUVwRSxTQUFTLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQ2pDLFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFDakMsWUFBWSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUNwQyxDQUFDLENBQUEsWUFBWSxhQUFaLFlBQVksdUJBQVosWUFBWSxDQUFFLE9BQU87WUFDdkIsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxPQUFPLEVBQUU7WUFDbkMsQ0FB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