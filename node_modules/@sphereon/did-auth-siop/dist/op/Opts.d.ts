import { VerifyAuthorizationRequestOpts } from '../authorization-request';
import { AuthorizationResponseOpts } from '../authorization-response';
import { OPBuilder } from './OPBuilder';
export declare const createResponseOptsFromBuilderOrExistingOpts: (opts: {
    builder?: OPBuilder;
    responseOpts?: AuthorizationResponseOpts;
}) => AuthorizationResponseOpts;
export declare const createVerifyRequestOptsFromBuilderOrExistingOpts: (opts: {
    builder?: OPBuilder;
    verifyOpts?: VerifyAuthorizationRequestOpts;
}) => VerifyAuthorizationRequestOpts;
