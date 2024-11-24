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
exports.createRequestRegistration = exports.assertValidRequestRegistrationOpts = void 0;
const helpers_1 = require("../helpers");
const types_1 = require("../types");
/*const ajv = new Ajv({ allowUnionTypes: true, strict: false });
const validateRPRegistrationMetadata = ajv.compile(RPRegistrationMetadataPayloadSchema);*/
const assertValidRequestRegistrationOpts = (opts) => {
    if (!opts) {
        throw new Error(types_1.SIOPErrors.REGISTRATION_NOT_SET);
    }
    else if (opts.passBy !== types_1.PassBy.REFERENCE && opts.passBy !== types_1.PassBy.VALUE) {
        throw new Error(types_1.SIOPErrors.REGISTRATION_OBJECT_TYPE_NOT_SET);
    }
    else if (opts.passBy === types_1.PassBy.REFERENCE && !opts.reference_uri) {
        throw new Error(types_1.SIOPErrors.NO_REFERENCE_URI);
    }
};
exports.assertValidRequestRegistrationOpts = assertValidRequestRegistrationOpts;
const createRequestRegistrationPayload = (opts, metadataPayload, version) => __awaiter(void 0, void 0, void 0, function* () {
    (0, exports.assertValidRequestRegistrationOpts)(opts);
    if (opts.passBy == types_1.PassBy.VALUE) {
        if (version >= types_1.SupportedVersion.SIOPv2_D11.valueOf()) {
            return { client_metadata: (0, helpers_1.removeNullUndefined)(metadataPayload) };
        }
        else {
            return { registration: (0, helpers_1.removeNullUndefined)(metadataPayload) };
        }
    }
    else {
        if (version >= types_1.SupportedVersion.SIOPv2_D11.valueOf()) {
            return {
                client_metadata_uri: opts.reference_uri,
            };
        }
        else {
            return {
                registration_uri: opts.reference_uri,
            };
        }
    }
});
const createRequestRegistration = (clientMetadataOpts, createRequestOpts) => __awaiter(void 0, void 0, void 0, function* () {
    const metadata = createRPRegistrationMetadataPayload(clientMetadataOpts);
    const payload = yield createRequestRegistrationPayload(clientMetadataOpts, metadata, createRequestOpts.version);
    return {
        payload,
        metadata,
        createRequestOpts,
        clientMetadataOpts,
    };
});
exports.createRequestRegistration = createRequestRegistration;
const createRPRegistrationMetadataPayload = (opts) => {
    const rpRegistrationMetadataPayload = {
        id_token_signing_alg_values_supported: opts.idTokenSigningAlgValuesSupported,
        request_object_signing_alg_values_supported: opts.requestObjectSigningAlgValuesSupported,
        response_types_supported: opts.responseTypesSupported,
        scopes_supported: opts.scopesSupported,
        subject_types_supported: opts.subjectTypesSupported,
        subject_syntax_types_supported: opts.subject_syntax_types_supported || ['did:web:', 'did:ion:'],
        vp_formats: opts.vpFormatsSupported,
        client_name: opts.clientName,
        logo_uri: opts.logo_uri,
        tos_uri: opts.tos_uri,
        client_purpose: opts.clientPurpose,
        client_id: opts.client_id,
    };
    const languageTagEnabledFieldsNamesMapping = new Map();
    languageTagEnabledFieldsNamesMapping.set('clientName', 'client_name');
    languageTagEnabledFieldsNamesMapping.set('clientPurpose', 'client_purpose');
    const languageTaggedFields = helpers_1.LanguageTagUtils.getLanguageTaggedPropertiesMapped(opts, languageTagEnabledFieldsNamesMapping);
    languageTaggedFields.forEach((value, key) => {
        rpRegistrationMetadataPayload[key] = value;
    });
    return (0, helpers_1.removeNullUndefined)(rpRegistrationMetadataPayload);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdFJlZ2lzdHJhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRob3JpemF0aW9uLXJlcXVlc3QvUmVxdWVzdFJlZ2lzdHJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSx3Q0FBbUU7QUFDbkUsb0NBU2tCO0FBSWxCOzBGQUMwRjtBQUVuRixNQUFNLGtDQUFrQyxHQUFHLENBQUMsSUFBd0IsRUFBRSxFQUFFO0lBQzdFLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ25ELENBQUM7U0FBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssY0FBTSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGNBQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM1RSxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUMvRCxDQUFDO1NBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLGNBQU0sQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDbkUsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDL0MsQ0FBQztBQUNILENBQUMsQ0FBQztBQVJXLFFBQUEsa0NBQWtDLHNDQVE3QztBQUVGLE1BQU0sZ0NBQWdDLEdBQUcsQ0FDdkMsSUFBd0IsRUFDeEIsZUFBOEMsRUFDOUMsT0FBeUIsRUFDK0QsRUFBRTtJQUMxRixJQUFBLDBDQUFrQyxFQUFDLElBQUksQ0FBQyxDQUFDO0lBRXpDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxjQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDaEMsSUFBSSxPQUFPLElBQUksd0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFB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