"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationResponseOptsSchemaObj = void 0;
exports.AuthorizationResponseOptsSchemaObj = {
    "$id": "AuthorizationResponseOptsSchema",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/AuthorizationResponseOpts",
    "definitions": {
        "AuthorizationResponseOpts": {
            "type": "object",
            "properties": {
                "responseURI": {
                    "type": "string"
                },
                "responseURIType": {
                    "$ref": "#/definitions/ResponseURIType"
                },
                "registration": {
                    "$ref": "#/definitions/ResponseRegistrationOpts"
                },
                "checkLinkedDomain": {
                    "$ref": "#/definitions/CheckLinkedDomain"
                },
                "version": {
                    "$ref": "#/definitions/SupportedVersion"
                },
                "audience": {
                    "type": "string"
                },
                "signature": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/InternalSignature"
                        },
                        {
                            "$ref": "#/definitions/ExternalSignature"
                        },
                        {
                            "$ref": "#/definitions/SuppliedSignature"
                        },
                        {
                            "$ref": "#/definitions/NoSignature"
                        }
                    ]
                },
                "responseMode": {
                    "$ref": "#/definitions/ResponseMode"
                },
                "expiresIn": {
                    "type": "number"
                },
                "accessToken": {
                    "type": "string"
                },
                "tokenType": {
                    "type": "string"
                },
                "refreshToken": {
                    "type": "string"
                },
                "presentationExchange": {
                    "$ref": "#/definitions/PresentationExchangeResponseOpts"
                }
            },
            "additionalProperties": false
        },
        "ResponseURIType": {
            "type": "string",
            "enum": [
                "response_uri",
                "redirect_uri"
            ]
        },
        "ResponseRegistrationOpts": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "passBy": {
                            "$ref": "#/definitions/PassBy"
                        },
                        "reference_uri": {
                            "type": "string"
                        },
                        "targets": {
                            "$ref": "#/definitions/PropertyTargets"
                        },
                        "id_token_encrypted_response_alg": {
                            "$ref": "#/definitions/EncKeyAlgorithm"
                        },
                        "id_token_encrypted_response_enc": {
                            "$ref": "#/definitions/EncSymmetricAlgorithmCode"
                        },
                        "authorizationEndpoint": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/Schema"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "issuer": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ResponseIss"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "responseTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseType"
                                }
                            ]
                        },
                        "scopesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Scope"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/Scope"
                                }
                            ]
                        },
                        "subjectTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SubjectType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SubjectType"
                                }
                            ]
                        },
                        "idTokenSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "requestObjectSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "subject_syntax_types_supported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "tokenEndpoint": {
                            "type": "string"
                        },
                        "userinfoEndpoint": {
                            "type": "string"
                        },
                        "jwksUri": {
                            "type": "string"
                        },
                        "registrationEndpoint": {
                            "type": "string"
                        },
                        "responseModesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseMode"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseMode"
                                }
                            ]
                        },
                        "grantTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/GrantType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/GrantType"
                                }
                            ]
                        },
                        "acrValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/AuthenticationContextReferences"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/AuthenticationContextReferences"
                                }
                            ]
                        },
                        "idTokenEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "idTokenEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "userinfoSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "userinfoEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "userinfoEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "requestObjectEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "requestObjectEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "tokenEndpointAuthMethodsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/TokenEndpointAuthMethod"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/TokenEndpointAuthMethod"
                                }
                            ]
                        },
                        "tokenEndpointAuthSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "displayValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ClaimType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ClaimType"
                                }
                            ]
                        },
                        "claimsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "serviceDocumentation": {
                            "type": "string"
                        },
                        "claimsLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "uiLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimsParameterSupported": {
                            "type": "boolean"
                        },
                        "requestParameterSupported": {
                            "type": "boolean"
                        },
                        "requestUriParameterSupported": {
                            "type": "boolean"
                        },
                        "requireRequestUriRegistration": {
                            "type": "boolean"
                        },
                        "opPolicyUri": {
                            "type": "string"
                        },
                        "opTosUri": {
                            "type": "string"
                        },
                        "client_id": {
                            "type": "string"
                        },
                        "redirectUris": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "clientName": {
                            "type": "string"
                        },
                        "tokenEndpointAuthMethod": {
                            "type": "string"
                        },
                        "applicationType": {
                            "type": "string"
                        },
                        "responseTypes": {
                            "type": "string"
                        },
                        "grantTypes": {
                            "type": "string"
                        },
                        "vpFormats": {
                            "$ref": "#/definitions/Format"
                        },
                        "logo_uri": {
                            "type": "string"
                        },
                        "clientPurpose": {
                            "type": "string"
                        }
                    },
                    "required": [
                        "passBy"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "passBy": {
                            "$ref": "#/definitions/PassBy"
                        },
                        "reference_uri": {
                            "type": "string"
                        },
                        "targets": {
                            "$ref": "#/definitions/PropertyTargets"
                        },
                        "id_token_encrypted_response_alg": {
                            "$ref": "#/definitions/EncKeyAlgorithm"
                        },
                        "id_token_encrypted_response_enc": {
                            "$ref": "#/definitions/EncSymmetricAlgorithmCode"
                        },
                        "authorizationEndpoint": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/Schema"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "issuer": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ResponseIss"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "responseTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseType"
                                }
                            ]
                        },
                        "scopesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Scope"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/Scope"
                                }
                            ]
                        },
                        "subjectTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SubjectType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SubjectType"
                                }
                            ]
                        },
                        "idTokenSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "requestObjectSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "subject_syntax_types_supported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "tokenEndpoint": {
                            "type": "string"
                        },
                        "userinfoEndpoint": {
                            "type": "string"
                        },
                        "jwksUri": {
                            "type": "string"
                        },
                        "registrationEndpoint": {
                            "type": "string"
                        },
                        "responseModesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseMode"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseMode"
                                }
                            ]
                        },
                        "grantTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/GrantType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/GrantType"
                                }
                            ]
                        },
                        "acrValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/AuthenticationContextReferences"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/AuthenticationContextReferences"
                                }
                            ]
                        },
                        "idTokenEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "idTokenEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "userinfoSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "userinfoEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "userinfoEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "requestObjectEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "requestObjectEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "tokenEndpointAuthMethodsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/TokenEndpointAuthMethod"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/TokenEndpointAuthMethod"
                                }
                            ]
                        },
                        "tokenEndpointAuthSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "displayValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ClaimType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ClaimType"
                                }
                            ]
                        },
                        "claimsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "serviceDocumentation": {
                            "type": "string"
                        },
                        "claimsLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "uiLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimsParameterSupported": {
                            "type": "boolean"
                        },
                        "requestParameterSupported": {
                            "type": "boolean"
                        },
                        "requestUriParameterSupported": {
                            "type": "boolean"
                        },
                        "requireRequestUriRegistration": {
                            "type": "boolean"
                        },
                        "opPolicyUri": {
                            "type": "string"
                        },
                        "opTosUri": {
                            "type": "string"
                        },
                        "client_id": {
                            "type": "string"
                        },
                        "redirectUris": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "clientName": {
                            "type": "string"
                        },
                        "tokenEndpointAuthMethod": {
                            "type": "string"
                        },
                        "applicationType": {
                            "type": "string"
                        },
                        "responseTypes": {
                            "type": "string"
                        },
                        "grantTypes": {
                            "type": "string"
                        },
                        "vpFormats": {
                            "$ref": "#/definitions/Format"
                        }
                    },
                    "required": [
                        "passBy"
                    ]
                },
                {
                    "type": "object",
                    "properties": {
                        "passBy": {
                            "$ref": "#/definitions/PassBy"
                        },
                        "reference_uri": {
                            "type": "string"
                        },
                        "targets": {
                            "$ref": "#/definitions/PropertyTargets"
                        },
                        "id_token_encrypted_response_alg": {
                            "$ref": "#/definitions/EncKeyAlgorithm"
                        },
                        "id_token_encrypted_response_enc": {
                            "$ref": "#/definitions/EncSymmetricAlgorithmCode"
                        },
                        "authorizationEndpoint": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/Schema"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "issuer": {
                            "anyOf": [
                                {
                                    "$ref": "#/definitions/ResponseIss"
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "responseTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseType"
                                }
                            ]
                        },
                        "scopesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/Scope"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/Scope"
                                }
                            ]
                        },
                        "subjectTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SubjectType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SubjectType"
                                }
                            ]
                        },
                        "idTokenSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "requestObjectSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "subject_syntax_types_supported": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "tokenEndpoint": {
                            "type": "string"
                        },
                        "userinfoEndpoint": {
                            "type": "string"
                        },
                        "jwksUri": {
                            "type": "string"
                        },
                        "registrationEndpoint": {
                            "type": "string"
                        },
                        "responseModesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ResponseMode"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ResponseMode"
                                }
                            ]
                        },
                        "grantTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/GrantType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/GrantType"
                                }
                            ]
                        },
                        "acrValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/AuthenticationContextReferences"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/AuthenticationContextReferences"
                                }
                            ]
                        },
                        "idTokenEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "idTokenEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "userinfoSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "userinfoEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "userinfoEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "requestObjectEncryptionAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "requestObjectEncryptionEncValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "tokenEndpointAuthMethodsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/TokenEndpointAuthMethod"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/TokenEndpointAuthMethod"
                                }
                            ]
                        },
                        "tokenEndpointAuthSigningAlgValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/SigningAlgo"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/SigningAlgo"
                                }
                            ]
                        },
                        "displayValuesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/ClaimType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/ClaimType"
                                }
                            ]
                        },
                        "claimsSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "serviceDocumentation": {
                            "type": "string"
                        },
                        "claimsLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "uiLocalesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    }
                                },
                                {
                                    "type": "string"
                                }
                            ]
                        },
                        "claimsParameterSupported": {
                            "type": "boolean"
                        },
                        "requestParameterSupported": {
                            "type": "boolean"
                        },
                        "requestUriParameterSupported": {
                            "type": "boolean"
                        },
                        "requireRequestUriRegistration": {
                            "type": "boolean"
                        },
                        "opPolicyUri": {
                            "type": "string"
                        },
                        "opTosUri": {
                            "type": "string"
                        },
                        "idTokenTypesSupported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {
                                        "$ref": "#/definitions/IdTokenType"
                                    }
                                },
                                {
                                    "$ref": "#/definitions/IdTokenType"
                                }
                            ]
                        },
                        "vpFormatsSupported": {
                            "$ref": "#/definitions/Format"
                        }
                    },
                    "required": [
                        "passBy"
                    ]
                }
            ]
        },
        "PassBy": {
            "type": "string",
            "enum": [
                "NONE",
                "REFERENCE",
                "VALUE"
            ]
        },
        "PropertyTargets": {
            "anyOf": [
                {
                    "$ref": "#/definitions/PropertyTarget"
                },
                {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/PropertyTarget"
                    }
                }
            ]
        },
        "PropertyTarget": {
            "type": "string",
            "enum": [
                "authorization-request",
                "request-object"
            ],
            "description": "Determines where a property will end up. Methods that support this argument are optional. If you do not provide any value it will default to all targets."
        },
        "EncKeyAlgorithm": {
            "type": "string",
            "const": "ECDH-ES"
        },
        "EncSymmetricAlgorithmCode": {
            "type": "string",
            "const": "XC20P"
        },
        "Schema": {
            "type": "string",
            "enum": [
                "openid:",
                "openid-vc:"
            ]
        },
        "ResponseIss": {
            "type": "string",
            "enum": [
                "https://self-issued.me",
                "https://self-issued.me/v2",
                "https://self-issued.me/v2/openid-vc"
            ]
        },
        "ResponseType": {
            "type": "string",
            "enum": [
                "id_token",
                "vp_token"
            ]
        },
        "Scope": {
            "type": "string",
            "enum": [
                "openid",
                "openid did_authn",
                "profile",
                "email",
                "address",
                "phone"
            ]
        },
        "SubjectType": {
            "type": "string",
            "enum": [
                "public",
                "pairwise"
            ]
        },
        "SigningAlgo": {
            "type": "string",
            "enum": [
                "EdDSA",
                "RS256",
                "PS256",
                "ES256",
                "ES256K"
            ]
        },
        "ResponseMode": {
            "type": "string",
            "enum": [
                "fragment",
                "form_post",
                "post",
                "direct_post",
                "query"
            ]
        },
        "GrantType": {
            "type": "string",
            "enum": [
                "authorization_code",
                "implicit"
            ]
        },
        "AuthenticationContextReferences": {
            "type": "string",
            "enum": [
                "phr",
                "phrh"
            ]
        },
        "TokenEndpointAuthMethod": {
            "type": "string",
            "enum": [
                "client_secret_post",
                "client_secret_basic",
                "client_secret_jwt",
                "private_key_jwt"
            ]
        },
        "ClaimType": {
            "type": "string",
            "enum": [
                "normal",
                "aggregated",
                "distributed"
            ]
        },
        "Format": {
            "type": "object",
            "properties": {
                "jwt": {
                    "$ref": "#/definitions/JwtObject"
                },
                "jwt_vc": {
                    "$ref": "#/definitions/JwtObject"
                },
                "jwt_vc_json": {
                    "$ref": "#/definitions/JwtObject"
                },
                "jwt_vp": {
                    "$ref": "#/definitions/JwtObject"
                },
                "jwt_vp_json": {
                    "$ref": "#/definitions/JwtObject"
                },
                "ldp": {
                    "$ref": "#/definitions/LdpObject"
                },
                "ldp_vc": {
                    "$ref": "#/definitions/LdpObject"
                },
                "ldp_vp": {
                    "$ref": "#/definitions/LdpObject"
                },
                "di": {
                    "$ref": "#/definitions/DiObject"
                },
                "di_vc": {
                    "$ref": "#/definitions/DiObject"
                },
                "di_vp": {
                    "$ref": "#/definitions/DiObject"
                },
                "vc+sd-jwt": {
                    "$ref": "#/definitions/SdJwtObject"
                }
            },
            "additionalProperties": false
        },
        "JwtObject": {
            "type": "object",
            "properties": {
                "alg": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "alg"
            ],
            "additionalProperties": false
        },
        "LdpObject": {
            "type": "object",
            "properties": {
                "proof_type": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "proof_type"
            ],
            "additionalProperties": false
        },
        "DiObject": {
            "type": "object",
            "properties": {
                "proof_type": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "cryptosuite": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "proof_type",
                "cryptosuite"
            ],
            "additionalProperties": false
        },
        "SdJwtObject": {
            "type": "object",
            "properties": {
                "sd-jwt_alg_values": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "kb-jwt_alg_values": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "additionalProperties": false
        },
        "IdTokenType": {
            "type": "string",
            "enum": [
                "subject_signed",
                "attester_signed"
            ]
        },
        "CheckLinkedDomain": {
            "type": "string",
            "enum": [
                "never",
                "if_present",
                "always"
            ]
        },
        "SupportedVersion": {
            "type": "number",
            "enum": [
                70,
                110,
                180,
                71
            ]
        },
        "InternalSignature": {
            "type": "object",
            "properties": {
                "hexPrivateKey": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "alg": {
                    "$ref": "#/definitions/SigningAlgo"
                },
                "kid": {
                    "type": "string"
                },
                "customJwtSigner": {
                    "$ref": "#/definitions/Signer"
                }
            },
            "required": [
                "hexPrivateKey",
                "did",
                "alg"
            ],
            "additionalProperties": false
        },
        "Signer": {
            "properties": {
                "isFunction": {
                    "type": "boolean",
                    "const": true
                }
            }
        },
        "ExternalSignature": {
            "type": "object",
            "properties": {
                "signatureUri": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "authZToken": {
                    "type": "string"
                },
                "hexPublicKey": {
                    "type": "string"
                },
                "alg": {
                    "$ref": "#/definitions/SigningAlgo"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "signatureUri",
                "did",
                "alg"
            ],
            "additionalProperties": false
        },
        "SuppliedSignature": {
            "type": "object",
            "properties": {
                "signature": {
                    "properties": {
                        "isFunction": {
                            "type": "boolean",
                            "const": true
                        }
                    }
                },
                "alg": {
                    "$ref": "#/definitions/SigningAlgo"
                },
                "did": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "signature",
                "alg",
                "did",
                "kid"
            ],
            "additionalProperties": false
        },
        "NoSignature": {
            "type": "object",
            "properties": {
                "hexPublicKey": {
                    "type": "string"
                },
                "did": {
                    "type": "string"
                },
                "kid": {
                    "type": "string"
                }
            },
            "required": [
                "hexPublicKey",
                "did"
            ],
            "additionalProperties": false
        },
        "PresentationExchangeResponseOpts": {
            "type": "object",
            "properties": {
                "verifiablePresentations": {
                    "type": "array",
                    "items": {
                        "anyOf": [
                            {
                                "$ref": "#/definitions/W3CVerifiablePresentation"
                            },
                            {
                                "$ref": "#/definitions/CompactSdJwtVc"
                            }
                        ]
                    }
                },
                "vpTokenLocation": {
                    "$ref": "#/definitions/VPTokenLocation"
                },
                "presentationSubmission": {
                    "$ref": "#/definitions/PresentationSubmission"
                },
                "restrictToFormats": {
                    "$ref": "#/definitions/Format"
                },
                "restrictToDIDMethods": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "verifiablePresentations"
            ],
            "additionalProperties": false
        },
        "W3CVerifiablePresentation": {
            "anyOf": [
                {
                    "$ref": "#/definitions/IVerifiablePresentation"
                },
                {
                    "$ref": "#/definitions/CompactJWT"
                }
            ],
            "description": "Represents a signed Verifiable Presentation (includes proof), in either JSON or compact JWT format. See  {@link  https://www.w3.org/TR/vc-data-model/#presentations VC data model }  See  {@link  https://www.w3.org/TR/vc-data-model/#proof-formats proof formats }"
        },
        "IVerifiablePresentation": {
            "type": "object",
            "properties": {
                "proof": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IProof"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/IProof"
                            }
                        }
                    ]
                },
                "id": {
                    "type": "string"
                },
                "@context": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/ICredentialContextType"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/ICredentialContextType"
                            }
                        }
                    ]
                },
                "type": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        }
                    ]
                },
                "verifiableCredential": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/W3CVerifiableCredential"
                    }
                },
                "presentation_submission": {
                    "$ref": "#/definitions/PresentationSubmission"
                },
                "holder": {
                    "type": "string"
                },
                "verifier": {
                    "type": "string"
                }
            },
            "required": [
                "@context",
                "proof"
            ]
        },
        "IProof": {
            "type": "object",
            "properties": {
                "type": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IProofType"
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "created": {
                    "type": "string"
                },
                "proofPurpose": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IProofPurpose"
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "verificationMethod": {
                    "type": "string"
                },
                "challenge": {
                    "type": "string"
                },
                "domain": {
                    "type": "string"
                },
                "proofValue": {
                    "type": "string"
                },
                "jws": {
                    "type": "string"
                },
                "jwt": {
                    "type": "string"
                },
                "nonce": {
                    "type": "string"
                },
                "requiredRevealStatements": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                }
            },
            "required": [
                "type",
                "created",
                "proofPurpose",
                "verificationMethod"
            ]
        },
        "IProofType": {
            "type": "string",
            "enum": [
                "Ed25519Signature2018",
                "Ed25519Signature2020",
                "EcdsaSecp256k1Signature2019",
                "EcdsaSecp256k1RecoverySignature2020",
                "JsonWebSignature2020",
                "RsaSignature2018",
                "GpgSignature2020",
                "JcsEd25519Signature2020",
                "BbsBlsSignatureProof2020",
                "BbsBlsBoundSignatureProof2020",
                "JwtProof2020"
            ]
        },
        "IProofPurpose": {
            "type": "string",
            "enum": [
                "verificationMethod",
                "assertionMethod",
                "authentication",
                "keyAgreement",
                "contactAgreement",
                "capabilityInvocation",
                "capabilityDelegation"
            ]
        },
        "ICredentialContextType": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "did": {
                            "type": "string"
                        }
                    }
                },
                {
                    "type": "string"
                }
            ]
        },
        "W3CVerifiableCredential": {
            "anyOf": [
                {
                    "$ref": "#/definitions/IVerifiableCredential"
                },
                {
                    "$ref": "#/definitions/CompactJWT"
                }
            ],
            "description": "Represents a signed Verifiable Credential (includes proof), in either JSON, compact JWT or compact SD-JWT VC format. See  {@link  https://www.w3.org/TR/vc-data-model/#credentials VC data model }  See  {@link  https://www.w3.org/TR/vc-data-model/#proof-formats proof formats }"
        },
        "IVerifiableCredential": {
            "type": "object",
            "properties": {
                "proof": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IProof"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/IProof"
                            }
                        }
                    ]
                },
                "@context": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/ICredentialContextType"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/ICredentialContextType"
                            }
                        }
                    ]
                },
                "type": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "credentialSchema": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/ICredentialSchemaType"
                        },
                        {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/ICredentialSchemaType"
                            }
                        }
                    ]
                },
                "issuer": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/IIssuerId"
                        },
                        {
                            "$ref": "#/definitions/IIssuer"
                        }
                    ]
                },
                "issuanceDate": {
                    "type": "string"
                },
                "credentialSubject": {
                    "anyOf": [
                        {
                            "type": "object",
                            "properties": {
                                "id": {
                                    "type": "string"
                                }
                            }
                        },
                        {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "id": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    ]
                },
                "expirationDate": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "credentialStatus": {
                    "$ref": "#/definitions/ICredentialStatus"
                },
                "description": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "@context",
                "credentialSubject",
                "issuanceDate",
                "issuer",
                "proof",
                "type"
            ]
        },
        "ICredentialSchemaType": {
            "anyOf": [
                {
                    "$ref": "#/definitions/ICredentialSchema"
                },
                {
                    "type": "string"
                }
            ]
        },
        "ICredentialSchema": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "id"
            ],
            "additionalProperties": false
        },
        "IIssuerId": {
            "type": "string"
        },
        "IIssuer": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                }
            },
            "required": [
                "id"
            ]
        },
        "ICredentialStatus": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "id",
                "type"
            ],
            "additionalProperties": false
        },
        "CompactJWT": {
            "type": "string",
            "description": "Represents a Json Web Token in compact form."
        },
        "PresentationSubmission": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "A UUID or some other unique ID to identify this Presentation Submission"
                },
                "definition_id": {
                    "type": "string",
                    "description": "A UUID or some other unique ID to identify this Presentation Definition"
                },
                "descriptor_map": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Descriptor"
                    },
                    "description": "List of descriptors of how the claims are being mapped to presentation definition"
                }
            },
            "required": [
                "id",
                "definition_id",
                "descriptor_map"
            ],
            "additionalProperties": false,
            "description": "It expresses how the inputs are presented as proofs to a Verifier."
        },
        "Descriptor": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string",
                    "description": "ID to identify the descriptor from Presentation Definition Input Descriptor it coresponds to."
                },
                "path": {
                    "type": "string",
                    "description": "The path where the verifiable credential is located in the presentation submission json"
                },
                "path_nested": {
                    "$ref": "#/definitions/Descriptor"
                },
                "format": {
                    "type": "string",
                    "description": "The Proof or JWT algorith that the proof is in"
                }
            },
            "required": [
                "id",
                "path",
                "format"
            ],
            "additionalProperties": false,
            "description": "descriptor map laying out the structure of the presentation submission."
        },
        "CompactSdJwtVc": {
            "type": "string",
            "description": "Represents a selective disclosure JWT vc in compact form."
        },
        "VPTokenLocation": {
            "type": "string",
            "enum": [
                "authorization_response",
                "id_token",
                "token_response"
            ]
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aG9yaXphdGlvblJlc3BvbnNlT3B0cy5zY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9BdXRob3JpemF0aW9uUmVzcG9uc2VPcHRzLnNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLGtDQUFrQyxHQUFHO0lBQ2hELEtBQUssRUFBRSxpQ0FBaUM7SUFDeEMsU0FBUyxFQUFFLHlDQUF5QztJQUNwRCxNQUFNLEVBQUUseUNBQXlDO0lBQ2pELGFBQWEsRUFBRTtRQUNiLDJCQUEyQixFQUFFO1lBQzNCLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFlBQVksRUFBRTtnQkFDWixhQUFhLEVBQUU7b0JBQ2IsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELGlCQUFpQixFQUFFO29CQUNqQixNQUFNLEVBQUUsK0JBQStCO2lCQUN4QztnQkFDRCxjQUFjLEVBQUU7b0JBQ2QsTUFBTSxFQUFFLHdDQUF3QztpQkFDakQ7Z0JBQ0QsbUJBQW1CLEVBQUU7b0JBQ25CLE1BQU0sRUFBRSxpQ0FBaUM7aUJBQzFDO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxNQUFNLEVBQUUsZ0NBQWdDO2lCQUN6QztnQkFDRCxVQUFVLEVBQUU7b0JBQ1YsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxPQUFPLEVBQUU7d0JBQ1A7NEJBQ0UsTUFBTSxFQUFFLGlDQUFpQzt5QkFDMUM7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLGlDQUFpQzt5QkFDMUM7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLGlDQUFpQzt5QkFDMUM7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLDJCQUEyQjt5QkFDcEM7cUJBQ0Y7aUJBQ0Y7Z0JBQ0QsY0FBYyxFQUFFO29CQUNkLE1BQU0sRUFBRSw0QkFBNEI7aUJBQ3JDO2dCQUNELFdBQVcsRUFBRTtvQkFDWCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsYUFBYSxFQUFF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