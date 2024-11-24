import { ClaimPayloadCommonOpts, RequestObjectPayloadOpts } from '../authorization-request';
import { ExternalSignature, InternalSignature, NoSignature, ObjectBy, SuppliedSignature } from '../types';
export interface RequestObjectOpts<CT extends ClaimPayloadCommonOpts> extends ObjectBy {
    payload?: RequestObjectPayloadOpts<CT>;
    signature: InternalSignature | ExternalSignature | SuppliedSignature | NoSignature;
}
