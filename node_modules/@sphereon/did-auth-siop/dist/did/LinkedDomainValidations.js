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
exports.validateLinkedDomainWithDid = void 0;
const wellknown_dids_client_1 = require("@sphereon/wellknown-dids-client");
const types_1 = require("../types");
const DIDResolution_1 = require("./DIDResolution");
const DidJWT_1 = require("./DidJWT");
function getValidationErrorMessages(validationResult) {
    const messages = [];
    if (validationResult.message) {
        messages.push(validationResult.message);
    }
    if (validationResult === null || validationResult === void 0 ? void 0 : validationResult.endpointDescriptors.length) {
        for (const endpointDescriptor of validationResult.endpointDescriptors) {
            if (endpointDescriptor.message) {
                messages.push(endpointDescriptor.message);
            }
            if (endpointDescriptor.resources) {
                for (const resource of endpointDescriptor.resources) {
                    if (resource.message) {
                        messages.push(resource.message);
                    }
                }
            }
        }
    }
    return messages;
}
/**
 * @param validationErrorMessages
 * @return returns false if the messages received from wellknown-dids-client makes this invalid for CheckLinkedDomain.IF_PRESENT plus the message itself
 *                  and true for when we can move on
 */
function checkInvalidMessages(validationErrorMessages) {
    if (!validationErrorMessages || !validationErrorMessages.length) {
        return { status: false, message: 'linked domain is invalid.' };
    }
    const validMessages = [
        wellknown_dids_client_1.WDCErrors.PROPERTY_LINKED_DIDS_DOES_NOT_CONTAIN_ANY_DOMAIN_LINK_CREDENTIALS.valueOf(),
        wellknown_dids_client_1.WDCErrors.PROPERTY_LINKED_DIDS_NOT_PRESENT.valueOf(),
        wellknown_dids_client_1.WDCErrors.PROPERTY_TYPE_NOT_CONTAIN_VALID_LINKED_DOMAIN.valueOf(),
        wellknown_dids_client_1.WDCErrors.PROPERTY_SERVICE_NOT_PRESENT.valueOf(),
    ];
    for (const validationErrorMessage of validationErrorMessages) {
        if (!validMessages.filter((vm) => validationErrorMessage.includes(vm)).pop()) {
            return { status: false, message: validationErrorMessage };
        }
    }
    return { status: true };
}
function validateLinkedDomainWithDid(did, verification) {
    return __awaiter(this, void 0, void 0, function* () {
        const { checkLinkedDomain, resolveOpts, wellknownDIDVerifyCallback } = verification;
        if (checkLinkedDomain === types_1.CheckLinkedDomain.NEVER) {
            return;
        }
        const didDocument = yield (0, DIDResolution_1.resolveDidDocument)(did, Object.assign(Object.assign({}, resolveOpts), { subjectSyntaxTypesSupported: [(0, DidJWT_1.toSIOPRegistrationDidMethod)((0, DidJWT_1.getMethodFromDid)(did))] }));
        if (!didDocument) {
            throw Error(`Could not resolve DID: ${did}`);
        }
        if ((!didDocument.service || !didDocument.service.find((s) => s.type === 'LinkedDomains')) && checkLinkedDomain === types_1.CheckLinkedDomain.IF_PRESENT) {
            // No linked domains in DID document and it was optional. Let's cut it short here.
            return;
        }
        try {
            const validationResult = yield checkWellKnownDid({ didDocument, verifyCallback: wellknownDIDVerifyCallback });
            if (validationResult.status === wellknown_dids_client_1.ValidationStatusEnum.INVALID) {
                const validationErrorMessages = getValidationErrorMessages(validationResult);
                const messageCondition = checkInvalidMessages(validationErrorMessages);
                if (checkLinkedDomain === types_1.CheckLinkedDomain.ALWAYS || (checkLinkedDomain === types_1.CheckLinkedDomain.IF_PRESENT && !messageCondition.status)) {
                    throw new Error(messageCondition.message ? messageCondition.message : validationErrorMessages[0]);
                }
            }
        }
        catch (err) {
            const messageCondition = checkInvalidMessages([err.message]);
            if (checkLinkedDomain === types_1.CheckLinkedDomain.ALWAYS || (checkLinkedDomain === types_1.CheckLinkedDomain.IF_PRESENT && !messageCondition.status)) {
                throw new Error(err.message);
            }
        }
    });
}
exports.validateLinkedDomainWithDid = validateLinkedDomainWithDid;
function checkWellKnownDid(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const verifier = new wellknown_dids_client_1.WellKnownDidVerifier({
            verifySignatureCallback: args.verifyCallback,
            onlyVerifyServiceDid: false,
        });
        return yield verifier.verifyDomainLinkage({ didDocument: args.didDocument });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlua2VkRG9tYWluVmFsaWRhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGlkL0xpbmtlZERvbWFpblZhbGlkYXRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLDJFQUFrSjtBQUVsSixvQ0FBc0c7QUFFdEcsbURBQXFEO0FBQ3JELHFDQUF5RTtBQUV6RSxTQUFTLDBCQUEwQixDQUFDLGdCQUEwQztJQUM1RSxNQUFNLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDcEIsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUM3QixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFDRCxJQUFJLGdCQUFnQixhQUFoQixnQkFBZ0IsdUJBQWhCLGdCQUFnQixDQUFFLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pELEtBQUssTUFBTSxrQkFBa0IsSUFBSSxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3RFLElBQUksa0JBQWtCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQy9CLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUMsQ0FBQztZQUNELElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2pDLEtBQUssTUFBTSxRQUFRLElBQUksa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQ3BELElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO3dCQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDbEMsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFTLG9CQUFvQixD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