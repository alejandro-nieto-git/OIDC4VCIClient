"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoveryMetadataPayloadSchemaObj = void 0;
exports.DiscoveryMetadataPayloadSchemaObj = {
    "$id": "DiscoveryMetadataPayloadSchema",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/DiscoveryMetadataPayload",
    "definitions": {
        "DiscoveryMetadataPayload": {
            "anyOf": [
                {
                    "type": "object",
                    "properties": {
                        "authorization_endpoint": {
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
                        "response_types_supported": {
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
                        "scopes_supported": {
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
                        "subject_types_supported": {
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
                        "id_token_signing_alg_values_supported": {
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
                        "request_object_signing_alg_values_supported": {
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
                        "token_endpoint": {
                            "type": "string"
                        },
                        "userinfo_endpoint": {
                            "type": "string"
                        },
                        "jwks_uri": {
                            "type": "string"
                        },
                        "registration_endpoint": {
                            "type": "string"
                        },
                        "response_modes_supported": {
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
                        "grant_types_supported": {
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
                        "acr_values_supported": {
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
                        "id_token_encryption_alg_values_supported": {
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
                        "id_token_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT]."
                        },
                        "userinfo_signing_alg_values_supported": {
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
                        "userinfo_encryption_alg_values_supported": {
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
                        "userinfo_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT [JWT]."
                        },
                        "request_object_encryption_alg_values_supported": {
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
                        "request_object_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference."
                        },
                        "token_endpoint_auth_methods_supported": {
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
                        "token_endpoint_auth_signing_alg_values_supported": {
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
                        "display_values_supported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {}
                                },
                                {}
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core]."
                        },
                        "claim_types_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims."
                        },
                        "claims_supported": {
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
                            ],
                            "description": "RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list."
                        },
                        "service_documentation": {
                            "type": "string"
                        },
                        "claims_locales_supported": {
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
                        "ui_locales_supported": {
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
                        "claims_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_uri_parameter_supported": {
                            "type": "boolean"
                        },
                        "require_request_uri_registration": {
                            "type": "boolean"
                        },
                        "op_policy_uri": {
                            "type": "string"
                        },
                        "op_tos_uri": {
                            "type": "string"
                        },
                        "client_id": {
                            "type": "string"
                        },
                        "redirect_uris": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "client_name": {
                            "type": "string"
                        },
                        "token_endpoint_auth_method": {
                            "type": "string"
                        },
                        "application_type": {
                            "type": "string"
                        },
                        "response_types": {
                            "type": "string"
                        },
                        "grant_types": {
                            "type": "string"
                        },
                        "vp_formats": {
                            "$ref": "#/definitions/Format"
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "authorization_endpoint": {
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
                        "response_types_supported": {
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
                        "scopes_supported": {
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
                        "subject_types_supported": {
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
                        "id_token_signing_alg_values_supported": {
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
                        "request_object_signing_alg_values_supported": {
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
                        "token_endpoint": {
                            "type": "string"
                        },
                        "userinfo_endpoint": {
                            "type": "string"
                        },
                        "jwks_uri": {
                            "type": "string"
                        },
                        "registration_endpoint": {
                            "type": "string"
                        },
                        "response_modes_supported": {
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
                        "grant_types_supported": {
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
                        "acr_values_supported": {
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
                        "id_token_encryption_alg_values_supported": {
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
                        "id_token_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT]."
                        },
                        "userinfo_signing_alg_values_supported": {
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
                        "userinfo_encryption_alg_values_supported": {
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
                        "userinfo_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT [JWT]."
                        },
                        "request_object_encryption_alg_values_supported": {
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
                        "request_object_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference."
                        },
                        "token_endpoint_auth_methods_supported": {
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
                        "token_endpoint_auth_signing_alg_values_supported": {
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
                        "display_values_supported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {}
                                },
                                {}
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core]."
                        },
                        "claim_types_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims."
                        },
                        "claims_supported": {
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
                            ],
                            "description": "RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list."
                        },
                        "service_documentation": {
                            "type": "string"
                        },
                        "claims_locales_supported": {
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
                        "ui_locales_supported": {
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
                        "claims_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_uri_parameter_supported": {
                            "type": "boolean"
                        },
                        "require_request_uri_registration": {
                            "type": "boolean"
                        },
                        "op_policy_uri": {
                            "type": "string"
                        },
                        "op_tos_uri": {
                            "type": "string"
                        },
                        "client_id": {
                            "type": "string"
                        },
                        "redirect_uris": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "client_name": {
                            "type": "string"
                        },
                        "token_endpoint_auth_method": {
                            "type": "string"
                        },
                        "application_type": {
                            "type": "string"
                        },
                        "response_types": {
                            "type": "string"
                        },
                        "grant_types": {
                            "type": "string"
                        },
                        "vp_formats": {
                            "$ref": "#/definitions/Format"
                        },
                        "logo_uri": {
                            "type": "string"
                        },
                        "client_purpose": {
                            "type": "string"
                        }
                    }
                },
                {
                    "type": "object",
                    "properties": {
                        "authorization_endpoint": {
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
                        "response_types_supported": {
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
                        "scopes_supported": {
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
                        "subject_types_supported": {
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
                        "id_token_signing_alg_values_supported": {
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
                        "request_object_signing_alg_values_supported": {
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
                        "token_endpoint": {
                            "type": "string"
                        },
                        "userinfo_endpoint": {
                            "type": "string"
                        },
                        "jwks_uri": {
                            "type": "string"
                        },
                        "registration_endpoint": {
                            "type": "string"
                        },
                        "response_modes_supported": {
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
                        "grant_types_supported": {
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
                        "acr_values_supported": {
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
                        "id_token_encryption_alg_values_supported": {
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
                        "id_token_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for the ID Token to encode the Claims in a JWT [JWT]."
                        },
                        "userinfo_signing_alg_values_supported": {
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
                        "userinfo_encryption_alg_values_supported": {
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
                        "userinfo_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) [JWA] supported by the UserInfo Endpoint to encode the Claims in a JWT [JWT]."
                        },
                        "request_object_encryption_alg_values_supported": {
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
                        "request_object_encryption_enc_values_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the JWE encryption algorithms (enc values) supported by the OP for Request Objects. These algorithms are used both when the Request Object is passed by value and when it is passed by reference."
                        },
                        "token_endpoint_auth_methods_supported": {
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
                        "token_endpoint_auth_signing_alg_values_supported": {
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
                        "display_values_supported": {
                            "anyOf": [
                                {
                                    "type": "array",
                                    "items": {}
                                },
                                {}
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the display parameter values that the OpenID Provider supports. These values are described in Section 3.1.2.1 of OpenID Connect Core 1.0 [OpenID.Core]."
                        },
                        "claim_types_supported": {
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
                            ],
                            "description": "OPTIONAL. JSON array containing a list of the Claim Types that the OpenID Provider supports. These Claim Types are described in Section 5.6 of OpenID Connect Core 1.0 [OpenID.Core]. Values defined by this specification are normal, aggregated, and distributed. If omitted, the implementation supports only normal Claims."
                        },
                        "claims_supported": {
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
                            ],
                            "description": "RECOMMENDED. JSON array containing a list of the Claim Names of the Claims that the OpenID Provider MAY be able to supply values for. Note that for privacy or other reasons, this might not be an exhaustive list."
                        },
                        "service_documentation": {
                            "type": "string"
                        },
                        "claims_locales_supported": {
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
                        "ui_locales_supported": {
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
                        "claims_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_parameter_supported": {
                            "type": "boolean"
                        },
                        "request_uri_parameter_supported": {
                            "type": "boolean"
                        },
                        "require_request_uri_registration": {
                            "type": "boolean"
                        },
                        "op_policy_uri": {
                            "type": "string"
                        },
                        "op_tos_uri": {
                            "type": "string"
                        },
                        "id_token_types_supported": {
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
                        "vp_formats_supported": {
                            "$ref": "#/definitions/Format"
                        }
                    }
                }
            ]
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
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzY292ZXJ5TWV0YWRhdGFQYXlsb2FkLnNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zY2hlbWFzL0Rpc2NvdmVyeU1ldGFkYXRhUGF5bG9hZC5zY2hlbWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxpQ0FBaUMsR0FBRztJQUMvQyxLQUFLLEVBQUUsZ0NBQWdDO0lBQ3ZDLFNBQVMsRUFBRSx5Q0FBeUM7SUFDcEQsTUFBTSxFQUFFLHdDQUF3QztJQUNoRCxhQUFhLEVBQUU7UUFDYiwwQkFBMEIsRUFBRTtZQUMxQixPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLFlBQVksRUFBRTt3QkFDWix3QkFBd0IsRUFBRTs0QkFDeEIsT0FBTyxFQUFFO2dDQUNQO29DQUNFLE1BQU0sRUFBRSxzQkFBc0I7aUNBQy9CO2dDQUNEO29DQUNFLE1BQU0sRUFBRSxRQUFRO2lDQUNqQjs2QkFDRjt5QkFDRjt3QkFDRCxRQUFRLEVBQUU7NEJBQ1IsT0FBTyxFQUFFO2dDQUNQO29DQUNFLE1BQU0sRUFBRSwyQkFBMkI7aUNBQ3BDO2dDQUNEO29DQUNFLE1BQU0sRUFBRSxRQUFRO2lDQUNqQjs2QkFDRjt5QkFDRjt3QkFDRCwwQkFBMEIsRUFBRTs0QkFDMUIsT0FBTyxFQUFFO2dDQUNQO29DQUNFLE1BQU0sRUFBRSxPQUFPO29DQUNmLE9BQU8sRUFBRTt3Q0FDUCxNQUFNLEVBQUUsNEJBQTRCO3FDQUNyQztpQ0FDRjtnQ0FDRDtvQ0FDRSxNQUFNLEVBQUUsNEJBQTRCO2lDQUNyQzs2QkFDRjt5QkFDRjt3QkFDRCxrQkFBa0IsRUFBRTs0QkFDbEIsT0FBTyxFQUFFO2dDQUNQO29DQUNFLE1BQU0sRUFBRSxPQUFPO29DQUNmLE9BQU8sRUFBRTt3Q0FDUCxNQUFNLEVBQUUscUJBQXFCO3FDQUM5QjtpQ0FDRjtnQ0FDRDtvQ0FDRSxNQUFNLEVBQUUscUJBQXFCO2lDQUM5Qjs2QkFDRjt5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