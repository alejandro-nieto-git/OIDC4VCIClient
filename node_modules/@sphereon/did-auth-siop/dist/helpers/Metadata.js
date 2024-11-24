"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedCredentialsFormats = exports.assertValidMetadata = void 0;
const types_1 = require("../types");
function assertValidMetadata(opMetadata, rpMetadata) {
    let subjectSyntaxTypesSupported = [];
    const credentials = supportedCredentialsFormats(rpMetadata.vp_formats, opMetadata.vp_formats);
    const isValidSubjectSyntax = verifySubjectSyntaxes(rpMetadata.subject_syntax_types_supported);
    if (isValidSubjectSyntax && rpMetadata.subject_syntax_types_supported) {
        subjectSyntaxTypesSupported = supportedSubjectSyntaxTypes(rpMetadata.subject_syntax_types_supported, opMetadata.subject_syntax_types_supported);
    }
    else if (isValidSubjectSyntax && (!rpMetadata.subject_syntax_types_supported || !rpMetadata.subject_syntax_types_supported.length)) {
        if (opMetadata.subject_syntax_types_supported || opMetadata.subject_syntax_types_supported.length) {
            subjectSyntaxTypesSupported = [...opMetadata.subject_syntax_types_supported];
        }
    }
    return { vp_formats: credentials, subject_syntax_types_supported: subjectSyntaxTypesSupported };
}
exports.assertValidMetadata = assertValidMetadata;
function getIntersection(rpMetadata, opMetadata) {
    let arrayA, arrayB;
    if (!Array.isArray(rpMetadata)) {
        arrayA = [rpMetadata];
    }
    else {
        arrayA = rpMetadata;
    }
    if (!Array.isArray(opMetadata)) {
        arrayB = [opMetadata];
    }
    else {
        arrayB = opMetadata;
    }
    return arrayA.filter((value) => arrayB.includes(value));
}
function verifySubjectSyntaxes(subjectSyntaxTypesSupported) {
    if (subjectSyntaxTypesSupported.length) {
        if (Array.isArray(subjectSyntaxTypesSupported)) {
            if (subjectSyntaxTypesSupported.length ===
                subjectSyntaxTypesSupported.filter((sst) => sst.includes(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) || sst === types_1.SubjectSyntaxTypesSupportedValues.JWK_THUMBPRINT.valueOf()).length) {
                return true;
            }
        }
    }
    return false;
}
function supportedSubjectSyntaxTypes(rpMethods, opMethods) {
    const rpMethodsList = Array.isArray(rpMethods) ? rpMethods : [rpMethods];
    const opMethodsList = Array.isArray(opMethods) ? opMethods : [opMethods];
    const supportedSubjectSyntaxTypes = getIntersection(rpMethodsList, opMethodsList);
    if (supportedSubjectSyntaxTypes.indexOf(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) !== -1) {
        return [types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()];
    }
    if (rpMethodsList.includes(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf())) {
        const supportedExtendedDids = opMethodsList.filter((method) => method.startsWith('did:'));
        if (supportedExtendedDids.length) {
            return supportedExtendedDids;
        }
    }
    if (opMethodsList.includes(types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf())) {
        const supportedExtendedDids = rpMethodsList.filter((method) => method.startsWith('did:'));
        if (supportedExtendedDids.length) {
            return supportedExtendedDids;
        }
    }
    if (!supportedSubjectSyntaxTypes.length) {
        throw Error(types_1.SIOPErrors.DID_METHODS_NOT_SUPORTED);
    }
    const supportedDidMethods = supportedSubjectSyntaxTypes.filter((sst) => sst.includes('did:'));
    if (supportedDidMethods.length) {
        return supportedDidMethods;
    }
    return supportedSubjectSyntaxTypes;
}
function getFormatIntersection(rpFormat, opFormat) {
    const intersectionFormat = {};
    const supportedCredentials = getIntersection(Object.keys(rpFormat), Object.keys(opFormat));
    if (!supportedCredentials.length) {
        throw new Error(types_1.SIOPErrors.CREDENTIAL_FORMATS_NOT_SUPPORTED);
    }
    supportedCredentials.forEach(function (crFormat) {
        const rpAlgs = [];
        const opAlgs = [];
        Object.keys(rpFormat[crFormat]).forEach((k) => rpAlgs.push(...rpFormat[crFormat][k]));
        Object.keys(opFormat[crFormat]).forEach((k) => opAlgs.push(...opFormat[crFormat][k]));
        let methodKeyRP = undefined;
        let methodKeyOP = undefined;
        Object.keys(rpFormat[crFormat]).forEach((k) => (methodKeyRP = k));
        Object.keys(opFormat[crFormat]).forEach((k) => (methodKeyOP = k));
        if (methodKeyRP !== methodKeyOP) {
            throw new Error(types_1.SIOPErrors.CREDENTIAL_FORMATS_NOT_SUPPORTED);
        }
        const algs = getIntersection(rpAlgs, opAlgs);
        if (!algs.length) {
            throw new Error(types_1.SIOPErrors.CREDENTIAL_FORMATS_NOT_SUPPORTED);
        }
        intersectionFormat[crFormat] = {};
        intersectionFormat[crFormat][methodKeyOP] = algs;
    });
    return intersectionFormat;
}
function supportedCredentialsFormats(rpFormat, opFormat) {
    if (!rpFormat || !opFormat || !Object.keys(rpFormat).length || !Object.keys(opFormat).length) {
        throw new Error(types_1.SIOPErrors.CREDENTIALS_FORMATS_NOT_PROVIDED);
    }
    return getFormatIntersection(rpFormat, opFormat);
}
exports.supportedCredentialsFormats = supportedCredentialsFormats;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaGVscGVycy9NZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxvQ0FNa0I7QUFFbEIsU0FBZ0IsbUJBQW1CLENBQUMsVUFBb0MsRUFBRSxVQUF5QztJQUNqSCxJQUFJLDJCQUEyQixHQUFHLEVBQUUsQ0FBQztJQUNyQyxNQUFNLFdBQVcsR0FBRywyQkFBMkIsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5RixNQUFNLG9CQUFvQixHQUFHLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzlGLElBQUksb0JBQW9CLElBQUksVUFBVSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDdEUsMkJBQTJCLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxDQUFDLDhCQUE4QixFQUFFLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQ2xKLENBQUM7U0FBTSxJQUFJLG9CQUFvQixJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsOEJBQThCLElBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNySSxJQUFJLFVBQVUsQ0FBQyw4QkFBOEIsSUFBSSxVQUFVLENBQUMsOEJBQThCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEcsMkJBQTJCLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO1FBQy9FLENBQUM7SUFDSCxDQUFDO0lBQ0QsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsOEJBQThCLEVBQUUsMkJBQTJCLEVBQUUsQ0FBQztBQUNsRyxDQUFDO0FBWkQsa0RBWUM7QUFFRCxTQUFTLGVBQWUsQ0FBSSxVQUF3QixFQUFFLFVBQXdCO0lBQzVFLElBQUksTUFBTSxFQUFFLE1BQU0sQ0FBQztJQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDO1FBQy9CLE1BQU0sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxHQUFHLFVBQVUsQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQztRQUMvQixNQUFNLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN4QixDQUFDO1NBQU0sQ0FBQztRQUNOLE1BQU0sR0FBRyxVQUFVLENBQUM7SUFDdEIsQ0FBQztJQUNELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQzFELENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLDJCQUFxQztJQUNsRSxJQUFJLDJCQUEyQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ3ZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxFQUFFLENBQUM7WUFDL0MsSUFDRSwyQkFBMkIsQ0FBQyxNQUFNO2dCQUNsQywyQkFBMkIsQ0FBQyxNQUFNLENBQ2hDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FDTixHQUFHLENBQUMsUUFBUSxDQUFDLHlDQUFpQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLEdBQUcsS0FBSyx5Q0FBaUMsQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQ3RJLENBQUMsTUFBTSxFQUNSLENBQUM7Z0JBQ0QsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLDJCQUEyQixDQUFDLFNBQTRCLEVBQUUsU0FBNEI7SUFDN0YsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3pFLE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RSxNQUFNLDJCQUEyQixHQUFHLGVBQWUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDbEYsSUFBSSwyQkFBMkIsQ0FBQyxPQUFPLENBQUMseUNBQWlDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNoRyxPQUFPLENBQUMseUNBQWlDLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQUNELElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyx5Q0FBaUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzVFLE1BQU0scUJBQXFCLEdBQWEsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLElBQUkscUJBQXFCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakMsT0FBTyxxQkFBcUIsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUNELElBQUksYUFBYSxDQUFDLFFBQVEsQ0FBQyx5Q0FBaUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDO1FBQzVFLE1BQU0scUJBQXFCLEdBQWEsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3BHLElBQUkscUJBQXFCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakMsT0FBTyxxQkFBcUIsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUksQ0FBQywyQkFBMkIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUN4QyxNQUFNLEtBQUssQ0FBQyxrQkFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDbkQsQ0FBQztJQUNELE1BQU0sbUJBQW1CLEdBQUcsMkJBQTJCLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDOUYsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMvQixPQUFPLG1CQUFtQixDQUFDO0lBQzdCLENBQUM7SUFDRCxPQUFPLDJCQUEyQixDQUFDO0FBQ3JDLENBQUM7QUFFRCxTQUFTLHFCQUFxQixDQUFDLFFBQWdCLEVBQUUsUUFBZ0I7SUFDL0QsTUFBTSxrQkFBa0IsR0FBVyxFQUFFLENBQUM7SUFDdEMsTUFBTSxvQkFBb0IsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDM0YsSUFBSSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDRCxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxRQUFnQjtRQUNyRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEYsSUFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDO1FBQzVCLElBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQztRQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRSxJQUFJLFdBQVcsS0FBSyxXQUFXLEVBQUUsQ0FBQztZQUNoQyxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztRQUMvRCxDQUFDO1FBQ0QsTUFBTSxJQUFJLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFDRCxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDbEMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxrQkFBa0IsQ0FBQztBQUM1QixDQUFDO0FBRUQsU0FBZ0IsMkJBQTJCLENBQUMsUUFBZ0IsRUFBRSxRQUFnQjtJQUM1RSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzdGLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFDRCxPQUFPLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNuRCxDQUFDO0FBTEQsa0VBS0MifQ==