"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertValidRequestObjectOpts = void 0;
const types_1 = require("../types");
const assertValidRequestObjectOpts = (opts, checkRequestObject) => {
    if (!opts) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    else if (opts.passBy !== types_1.PassBy.REFERENCE && opts.passBy !== types_1.PassBy.VALUE) {
        throw new Error(types_1.SIOPErrors.REQUEST_OBJECT_TYPE_NOT_SET);
    }
    else if (opts.passBy === types_1.PassBy.REFERENCE && !opts.reference_uri) {
        throw new Error(types_1.SIOPErrors.NO_REFERENCE_URI);
    }
    else if (!opts.payload) {
        if (opts.reference_uri) {
            // reference URI, but no actual payload to host there!
            throw Error(types_1.SIOPErrors.REFERENCE_URI_NO_PAYLOAD);
        }
        else if (checkRequestObject) {
            throw Error(types_1.SIOPErrors.BAD_PARAMS);
        }
    }
    // assertValidRequestRegistrationOpts(opts['registration'] ? opts['registration'] : opts['clientMetadata']);
};
exports.assertValidRequestObjectOpts = assertValidRequestObjectOpts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXF1ZXN0LW9iamVjdC9PcHRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG9DQUE4QztBQUl2QyxNQUFNLDRCQUE0QixHQUFHLENBQUMsSUFBK0MsRUFBRSxrQkFBMkIsRUFBRSxFQUFFO0lBQzNILElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO1NBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGNBQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxjQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDMUQsQ0FBQztTQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxjQUFNLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1FBQ25FLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7U0FBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ3pCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3ZCLHNEQUFzRDtZQUN0RCxNQUFNLEtBQUssQ0FBQyxrQkFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDbkQsQ0FBQzthQUFNLElBQUksa0JBQWtCLEVBQUUsQ0FBQztZQUM5QixNQUFNLEtBQUssQ0FBQyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBQ0QsNEdBQTRHO0FBQzlHLENBQUMsQ0FBQztBQWhCVyxRQUFBLDRCQUE0QixnQ0FnQnZDIn0=