"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDiscoveryMetadataPayload = void 0;
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const createDiscoveryMetadataPayload = (opts) => {
    var _a, _b;
    const discoveryMetadataPayload = {
        authorization_endpoint: opts.authorizationEndpoint || types_1.Schema.OPENID,
        issuer: (_a = opts.issuer) !== null && _a !== void 0 ? _a : types_1.ResponseIss.SELF_ISSUED_V2,
        response_types_supported: (_b = opts.responseTypesSupported) !== null && _b !== void 0 ? _b : types_1.ResponseType.ID_TOKEN,
        scopes_supported: (opts === null || opts === void 0 ? void 0 : opts.scopesSupported) || [types_1.Scope.OPENID],
        subject_types_supported: (opts === null || opts === void 0 ? void 0 : opts.subjectTypesSupported) || [types_1.SubjectType.PAIRWISE],
        id_token_signing_alg_values_supported: (opts === null || opts === void 0 ? void 0 : opts.idTokenSigningAlgValuesSupported) || [types_1.SigningAlgo.ES256K, types_1.SigningAlgo.EDDSA],
        request_object_signing_alg_values_supported: opts.requestObjectSigningAlgValuesSupported || [types_1.SigningAlgo.ES256K, types_1.SigningAlgo.EDDSA],
        subject_syntax_types_supported: opts.subject_syntax_types_supported,
        client_id: opts.client_id,
        redirect_uris: opts.redirectUris,
        client_name: opts.clientName,
        token_endpoint_auth_method: opts.tokenEndpointAuthMethod,
        application_type: opts.applicationType,
        response_types: opts.responseTypes,
        grant_types: opts.grantTypes,
        vp_formats: opts.vpFormats,
        token_endpoint: opts.tokenEndpoint,
        userinfo_endpoint: opts.userinfoEndpoint,
        jwks_uri: opts.jwksUri,
        registration_endpoint: opts.registrationEndpoint,
        response_modes_supported: opts.responseModesSupported,
        grant_types_supported: opts.grantTypesSupported,
        acr_values_supported: opts.acrValuesSupported,
        id_token_encryption_alg_values_supported: opts.idTokenEncryptionAlgValuesSupported,
        id_token_encryption_enc_values_supported: opts.idTokenEncryptionEncValuesSupported,
        userinfo_signing_alg_values_supported: opts.userinfoSigningAlgValuesSupported,
        userinfo_encryption_alg_values_supported: opts.userinfoEncryptionAlgValuesSupported,
        userinfo_encryption_enc_values_supported: opts.userinfoEncryptionEncValuesSupported,
        request_object_encryption_alg_values_supported: opts.requestObjectEncryptionAlgValuesSupported,
        request_object_encryption_enc_values_supported: opts.requestObjectEncryptionEncValuesSupported,
        token_endpoint_auth_methods_supported: opts.tokenEndpointAuthMethodsSupported,
        token_endpoint_auth_signing_alg_values_supported: opts.tokenEndpointAuthSigningAlgValuesSupported,
        display_values_supported: opts.displayValuesSupported,
        claim_types_supported: opts.claimTypesSupported,
        claims_supported: opts.claimsSupported,
        service_documentation: opts.serviceDocumentation,
        claims_locales_supported: opts.claimsLocalesSupported,
        ui_locales_supported: opts.uiLocalesSupported,
        claims_parameter_supported: opts.claimsParameterSupported,
        request_parameter_supported: opts.requestParameterSupported,
        request_uri_parameter_supported: opts.requestUriParameterSupported,
        require_request_uri_registration: opts.requireRequestUriRegistration,
        op_policy_uri: opts.opPolicyUri,
        op_tos_uri: opts.opTosUri,
        logo_uri: opts.logo_uri,
        client_purpose: opts.clientPurpose,
        id_token_types_supported: opts.idTokenTypesSupported,
    };
    const languageTagEnabledFieldsNamesMapping = new Map();
    languageTagEnabledFieldsNamesMapping.set('clientName', 'client_name');
    languageTagEnabledFieldsNamesMapping.set('clientPurpose', 'client_purpose');
    const languageTaggedFields = helpers_1.LanguageTagUtils.getLanguageTaggedPropertiesMapped(opts, languageTagEnabledFieldsNamesMapping);
    languageTaggedFields.forEach((value, key) => {
        discoveryMetadataPayload[key] = value;
    });
    return (0, helpers_1.removeNullUndefined)(discoveryMetadataPayload);
};
exports.createDiscoveryMetadataPayload = createDiscoveryMetadataPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzcG9uc2VSZWdpc3RyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXV0aG9yaXphdGlvbi1yZXNwb25zZS9SZXNwb25zZVJlZ2lzdHJhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBbUU7QUFDbkUsb0NBQStJO0FBRXhJLE1BQU0sOEJBQThCLEdBQUcsQ0FBQyxJQUEyQixFQUE0QixFQUFFOztJQUN0RyxNQUFNLHdCQUF3QixHQUE2QjtRQUN6RCxzQkFBc0IsRUFBRSxJQUFJLENBQUMscUJBQXFCLElBQUksY0FBTSxDQUFDLE1BQU07UUFDbkUsTUFBTSxFQUFFLE1BQUEsSUFBSSxDQUFDLE1BQU0sbUNBQUksbUJBQVcsQ0FBQyxjQUFjO1FBQ2pELHdCQUF3QixFQUFFLE1BQUEsSUFBSSxDQUFDLHNCQUFzQixtQ0FBSSxvQkFBWSxDQUFDLFFBQVE7UUFDOUUsZ0JBQWdCLEVBQUUsQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSxLQUFJLENBQUMsYUFBSyxDQUFDLE1BQU0sQ0FBQztRQUN6RCx1QkFBdUIsRUFBRSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxxQkFBcUIsS0FBSSxDQUFDLG1CQUFXLENBQUMsUUFBUSxDQUFDO1FBQzlFLHFDQUFxQyxFQUFFLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLGdDQUFnQyxLQUFJLENBQUMsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsbUJBQVcsQ0FBQyxLQUFLLENBQUM7UUFDeEgsMkNBQTJDLEVBQUUsSUFBSSxDQUFDLHNDQUFzQyxJQUFJLENBQUMsbUJBQVcsQ0FBQyxNQUFNLEVBQUUsbUJBQVcsQ0FBQyxLQUFLLENBQUM7UUFDbkksOEJBQThCLEVBQUUsSUFBSSxDQUFDLDhCQUE4QjtRQUNuRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7UUFDekIsYUFBYSxFQUFFLElBQUksQ0FB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