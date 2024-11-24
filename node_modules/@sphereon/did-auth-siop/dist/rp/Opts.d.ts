import { CreateAuthorizationRequestOpts, PropertyTarget, PropertyTargets, RequestPropertyWithTargets } from '../authorization-request';
import { VerifyAuthorizationResponseOpts } from '../authorization-response';
import { RPBuilder } from './RPBuilder';
export declare const createRequestOptsFromBuilderOrExistingOpts: (opts: {
    builder?: RPBuilder;
    createRequestOpts?: CreateAuthorizationRequestOpts;
}) => CreateAuthorizationRequestOpts;
export declare const createVerifyResponseOptsFromBuilderOrExistingOpts: (opts: {
    builder?: RPBuilder;
    verifyOpts?: VerifyAuthorizationResponseOpts;
}) => VerifyAuthorizationResponseOpts | {
    hasher: import("@sphereon/ssi-types").Hasher;
    verification: import("../types").Verification;
    audience: any;
};
export declare const isTargetOrNoTargets: (searchTarget: PropertyTarget, targets?: PropertyTargets) => boolean;
export declare const isTarget: (searchTarget: PropertyTarget, targets: PropertyTargets) => boolean;
export declare const assignIfAuth: <T>(opt: RequestPropertyWithTargets<T>, isDefaultTarget?: boolean) => T;
export declare const assignIfRequestObject: <T>(opt: RequestPropertyWithTargets<T>, isDefaultTarget?: boolean) => T;
