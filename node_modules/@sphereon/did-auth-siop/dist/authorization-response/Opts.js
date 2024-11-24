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
exports.assertValidVerifyOpts = exports.assertValidResponseOpts = void 0;
const types_1 = require("../types");
const assertValidResponseOpts = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(opts === null || opts === void 0 ? void 0 : opts.signature)) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    else if (!((0, types_1.isInternalSignature)(opts.signature) || (0, types_1.isExternalSignature)(opts.signature) || (0, types_1.isSuppliedSignature)(opts.signature))) {
        throw new Error(types_1.SIOPErrors.SIGNATURE_OBJECT_TYPE_NOT_SET);
    }
});
exports.assertValidResponseOpts = assertValidResponseOpts;
const assertValidVerifyOpts = (opts) => {
    if (!(opts === null || opts === void 0 ? void 0 : opts.verification) || (!(0, types_1.isExternalVerification)(opts.verification) && !(0, types_1.isInternalVerification)(opts.verification))) {
        throw new Error(types_1.SIOPErrors.VERIFY_BAD_PARAMS);
    }
};
exports.assertValidVerifyOpts = assertValidVerifyOpts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRob3JpemF0aW9uLXJlc3BvbnNlL09wdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsb0NBQXFKO0FBSTlJLE1BQU0sdUJBQXVCLEdBQUcsQ0FBTyxJQUErQixFQUFpQixFQUFFO0lBQzlGLElBQUksQ0FBQyxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxTQUFTLENBQUEsRUFBRSxDQUFDO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO1NBQU0sSUFBSSxDQUFDLENBQUMsSUFBQSwyQkFBbUIsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBQSwyQkFBbUIsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBQSwyQkFBbUIsRUFBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ2hJLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQzVELENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQU5XLFFBQUEsdUJBQXVCLDJCQU1sQztBQUVLLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxJQUFxQyxFQUFFLEVBQUU7SUFDN0UsSUFBSSxDQUFDLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFlBQVksQ0FBQSxJQUFJLENBQUMsQ0FBQyxJQUFBLDhCQUFzQixFQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUEsOEJBQXNCLEVBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN0SCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0FBQ0gsQ0FBQyxDQUFDO0FBSlcsUUFBQSxxQkFBcUIseUJBSWhDIn0=