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
exports.verifyRevocation = void 0;
const ssi_types_1 = require("@sphereon/ssi-types");
const types_1 = require("../types");
const verifyRevocation = (vpToken, revocationVerificationCallback, revocationVerification) => __awaiter(void 0, void 0, void 0, function* () {
    if (!vpToken) {
        throw new Error(`VP token not provided`);
    }
    if (!revocationVerificationCallback) {
        throw new Error(`Revocation callback not provided`);
    }
    const vcs = ssi_types_1.CredentialMapper.isWrappedSdJwtVerifiablePresentation(vpToken) ? [vpToken.vcs[0]] : vpToken.presentation.verifiableCredential;
    for (const vc of vcs) {
        if (revocationVerification === types_1.RevocationVerification.ALWAYS ||
            (revocationVerification === types_1.RevocationVerification.IF_PRESENT && credentialHasStatus(vc))) {
            const result = yield revocationVerificationCallback(vc.original, originalTypeToVerifiableCredentialTypeFormat(vc.format));
            if (result.status === types_1.RevocationStatus.INVALID) {
                throw new Error(`Revocation invalid for vc. Error: ${result.error}`);
            }
        }
    }
});
exports.verifyRevocation = verifyRevocation;
function originalTypeToVerifiableCredentialTypeFormat(original) {
    const mapping = {
        'vc+sd-jwt': types_1.VerifiableCredentialTypeFormat.SD_JWT_VC,
        jwt: types_1.VerifiableCredentialTypeFormat.JWT_VC,
        jwt_vc: types_1.VerifiableCredentialTypeFormat.JWT_VC,
        ldp: types_1.VerifiableCredentialTypeFormat.LDP_VC,
        ldp_vc: types_1.VerifiableCredentialTypeFormat.LDP_VC,
    };
    return mapping[original];
}
/**
 * Checks whether a wrapped verifiable credential has a status in the credential.
 * For w3c credentials it will check the presence of `credentialStatus` property
 * For SD-JWT it will check the presence of `status` property
 */
function credentialHasStatus(wrappedVerifiableCredential) {
    if (ssi_types_1.CredentialMapper.isWrappedSdJwtVerifiableCredential(wrappedVerifiableCredential)) {
        return wrappedVerifiableCredential.decoded.status !== undefined;
    }
    else {
        return wrappedVerifiableCredential.credential.credentialStatus !== undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmV2b2NhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9oZWxwZXJzL1Jldm9jYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTRJO0FBRTVJLG9DQUFvSTtBQUU3SCxNQUFNLGdCQUFnQixHQUFHLENBQzlCLE9BQXNDLEVBQ3RDLDhCQUE4RCxFQUM5RCxzQkFBOEMsRUFDL0IsRUFBRTtJQUNqQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDYixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUNELElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsTUFBTSxHQUFHLEdBQUcsNEJBQWdCLENBQUMsb0NBQW9DLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLG9CQUFvQixDQUFDO0lBQzFJLEtBQUssTUFBTSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7UUFDckIsSUFDRSxzQkFBc0IsS0FBSyw4QkFBc0IsQ0FBQyxNQUFNO1lBQ3hELENBQUMsc0JBQXNCLEtBQUssOEJBQXNCLENBQUMsVUFBVSxJQUFJLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3pGLENBQUM7WUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLDhCQUE4QixDQUNqRCxFQUFFLENBQUMsUUFBbUMsRUFDdEMsNENBQTRDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUN4RCxDQUFDO1lBQ0YsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLHdCQUFnQixDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUMvQyxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztZQUN2RSxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQztBQTNCVyxRQUFBLGdCQUFnQixvQkEyQjNCO0FBRUYsU0FBUyw0Q0FBNEMsQ0FBQyxRQUErQztJQUNuRyxNQUFNLE9BQU8sR0FBcUY7UUFDaEcsV0FBVyxFQUFFLHNDQUE4QixDQUFDLFNBQVM7UUFDckQsR0FBRyxFQUFFLHNDQUE4QixDQUFDLE1BQU07UUFDMUMsTUFBTSxFQUFFLHNDQUE4QixDQUFDLE1BQU07UUFDN0MsR0FBRyxFQUFFLHNDQUE4QixDQUFDLE1BQU07UUFDMUMsTUFBTSxFQUFFLHNDQUE4QixDQUFDLE1BQU07S0FDOUMsQ0FBQztJQUVGLE9BQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQywyQkFBd0Q7SUFDbkYsSUFBSSw0QkFBZ0IsQ0FBQyxrQ0FBa0MsQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUM7UUFDckYsT0FBTywyQkFBMkIsQ0FBQyxPQUFPLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQztJQUNsRSxDQUFDO1NBQU0sQ0FBQztRQUNOLE9BQU8sMkJBQTJCLENBQUMsVUFBVSxDQUFDLGdCQUFnQixLQUFLLFNBQVMsQ0FBQztJQUMvRSxDQUFDO0FBQ0gsQ0FBQyJ9