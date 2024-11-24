"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignIfRequestObject = exports.assignIfAuth = exports.isTarget = exports.isTargetOrNoTargets = exports.createVerifyResponseOptsFromBuilderOrExistingOpts = exports.createRequestOptsFromBuilderOrExistingOpts = void 0;
const authorization_request_1 = require("../authorization-request");
const did_1 = require("../did");
// import { CreateAuthorizationRequestOptsSchema } from '../schemas';
const types_1 = require("../types");
const createRequestOptsFromBuilderOrExistingOpts = (opts) => {
    var _a, _b;
    const version = opts.builder ? opts.builder.getSupportedRequestVersion() : opts.createRequestOpts.version;
    if (!version) {
        throw Error(types_1.SIOPErrors.NO_REQUEST_VERSION);
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const createRequestOpts = opts.builder
        ? {
            version,
            payload: Object.assign({}, opts.builder.authorizationRequestPayload),
            requestObject: Object.assign(Object.assign({}, opts.builder.requestObjectBy), { payload: Object.assign(Object.assign({}, opts.builder.requestObjectPayload), { subject_types_supported: (_a = opts.builder.clientMetadata) === null || _a === void 0 ? void 0 : _a.subjectTypesSupported, request_object_signing_alg_values_supported: (_b = opts.builder.clientMetadata) === null || _b === void 0 ? void 0 : _b.requestObjectSigningAlgValuesSupported }), signature: opts.builder.signature }),
            clientMetadata: opts.builder.clientMetadata,
        }
        : opts.createRequestOpts;
    /*const valid = true; // fixme: re-enable schema: CreateAuthorizationRequestOptsSchema(createRequestOpts);
    if (!valid) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      throw new Error('RP builder validation error: ' + JSON.stringify(CreateAuthorizationRequestOptsSchema.errors));
    }*/
    return createRequestOpts;
};
exports.createRequestOptsFromBuilderOrExistingOpts = createRequestOptsFromBuilderOrExistingOpts;
const createVerifyResponseOptsFromBuilderOrExistingOpts = (opts) => {
    var _a, _b, _c;
    if (((_a = opts === null || opts === void 0 ? void 0 : opts.builder) === null || _a === void 0 ? void 0 : _a.resolvers.size) && ((_b = opts.builder) === null || _b === void 0 ? void 0 : _b.clientMetadata)) {
        opts.builder.clientMetadata.subject_syntax_types_supported = (0, did_1.mergeAllDidMethods)(opts.builder.clientMetadata.subject_syntax_types_supported, opts.builder.resolvers);
    }
    let resolver;
    if (opts.builder) {
        resolver = (0, did_1.getResolverUnion)(opts.builder.customResolver, opts.builder.clientMetadata.subject_syntax_types_supported, opts.builder.resolvers);
    }
    return opts.builder
        ? {
            hasher: opts.builder.hasher,
            verification: {
                mode: types_1.VerificationMode.INTERNAL,
                checkLinkedDomain: opts.builder.checkLinkedDomain,
                wellknownDIDVerifyCallback: opts.builder.wellknownDIDVerifyCallback,
                presentationVerificationCallback: opts.builder.presentationVerificationCallback,
                resolveOpts: {
                    subjectSyntaxTypesSupported: opts.builder.clientMetadata.subject_syntax_types_supported,
                    resolver: resolver,
                },
                supportedVersions: opts.builder.supportedVersions,
                revocationOpts: {
                    revocationVerification: opts.builder.revocationVerification,
                    revocationVerificationCallback: opts.builder.revocationVerificationCallback,
                },
                replayRegistry: opts.builder.sessionManager,
            },
            audience: opts.builder.clientId || ((_c = opts.builder.clientMetadata) === null || _c === void 0 ? void 0 : _c.client_id),
        }
        : opts.verifyOpts;
};
exports.createVerifyResponseOptsFromBuilderOrExistingOpts = createVerifyResponseOptsFromBuilderOrExistingOpts;
const isTargetOrNoTargets = (searchTarget, targets) => {
    if (!targets) {
        return true;
    }
    return (0, exports.isTarget)(searchTarget, targets);
};
exports.isTargetOrNoTargets = isTargetOrNoTargets;
const isTarget = (searchTarget, targets) => {
    return Array.isArray(targets) ? targets.includes(searchTarget) : targets === searchTarget;
};
exports.isTarget = isTarget;
const assignIfAuth = (opt, isDefaultTarget) => {
    if (isDefaultTarget
        ? (0, exports.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.AUTHORIZATION_REQUEST, opt.targets)
        : (0, exports.isTarget)(authorization_request_1.PropertyTarget.AUTHORIZATION_REQUEST, opt.targets)) {
        return opt.propertyValue;
    }
    return undefined;
};
exports.assignIfAuth = assignIfAuth;
const assignIfRequestObject = (opt, isDefaultTarget) => {
    if (isDefaultTarget ? (0, exports.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.REQUEST_OBJECT, opt.targets) : (0, exports.isTarget)(authorization_request_1.PropertyTarget.REQUEST_OBJECT, opt.targets)) {
        return opt.propertyValue;
    }
    return undefined;
};
exports.assignIfRequestObject = assignIfRequestObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ycC9PcHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLG9FQUF1STtBQUV2SSxnQ0FBOEQ7QUFDOUQscUVBQXFFO0FBQ3JFLG9DQUF3SDtBQUlqSCxNQUFNLDBDQUEwQyxHQUFHLENBQUMsSUFBaUYsRUFBRSxFQUFFOztJQUM5SSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDBCQUEwQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7SUFDMUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2IsTUFBTSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw2REFBNkQ7SUFDN0QsYUFBYTtJQUNiLE1BQU0saUJBQWlCLEdBQW1DLElBQUksQ0FBQyxPQUFPO1FBQ3BFLENBQUMsQ0FBQztZQUNFLE9BQU87WUFDUCxPQUFPLG9CQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBTTVDO1lBQ0QsYUFBYSxrQ0FDUixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsS0FDL0IsT0FBTyxrQ0FDRCxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUE2QyxLQUM5RCx1QkFBdUIsRUFBRSxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYywwQ0FBRSxxQkFBcUIsRUFDM0UsMkNBQTJDLEVBQUUsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsMENBQUUsc0NBQXNDLEtBRWxILFNBQVMsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FDbEM7WUFDRCxjQUFjLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFvQztTQUNsRTtRQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFF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