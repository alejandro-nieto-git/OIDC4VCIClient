"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationRequestPayloadVID1SchemaObj = void 0;
exports.AuthorizationRequestPayloadVID1SchemaObj = {
    "$id": "AuthorizationRequestPayloadVID1Schema",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$ref": "#/definitions/AuthorizationRequestPayloadVID1",
    "definitions": {
        "AuthorizationRequestPayloadVID1": {
            "type": "object",
            "properties": {
                "registration": {
                    "$ref": "#/definitions/RPRegistrationMetadataPayload"
                },
                "registration_uri": {
                    "type": "string"
                },
                "iss": {
                    "type": "string"
                },
                "sub": {
                    "type": "string"
                },
                "aud": {
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
                "iat": {
                    "type": "number"
                },
                "nbf": {
                    "type": "number"
                },
                "type": {
                    "type": "string"
                },
                "exp": {
                    "type": "number"
                },
                "rexp": {
                    "type": "number"
                },
                "jti": {
                    "type": "string"
                },
                "scope": {
                    "type": "string"
                },
                "response_type": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/ResponseType"
                        },
                        {
                            "type": "string"
                        }
                    ]
                },
                "client_id": {
                    "type": "string"
                },
                "redirect_uri": {
                    "type": "string"
                },
                "id_token_hint": {
                    "type": "string"
                },
                "nonce": {
                    "type": "string"
                },
                "state": {
                    "type": "string"
                },
                "response_mode": {
                    "$ref": "#/definitions/ResponseMode"
                },
                "request": {
                    "type": "string"
                },
                "request_uri": {
                    "type": "string"
                },
                "claims": {
                    "$ref": "#/definitions/ClaimPayloadVID1"
                }
            }
        },
        "RPRegistrationMetadataPayload": {
            "type": "object",
            "properties": {
                "client_id": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {}
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
                "subject_syntax_types_supported": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "vp_formats": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/Format"
                        },
                        {}
                    ]
                },
                "client_name": {
                    "anyOf": [
                        {
                            "type": "string"
                        },
                        {}
                    ]
                },
                "logo_uri": {
                    "anyOf": [
                        {},
                        {
                            "type": "string"
                        }
                    ]
                },
                "client_purpose": {
                    "anyOf": [
                        {},
                        {
                            "type": "string"
                        }
                    ]
                }
            }
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
        "ClaimPayloadVID1": {
            "type": "object",
            "properties": {
                "id_token": {
                    "$ref": "#/definitions/IdTokenClaimPayload"
                },
                "vp_token": {
                    "$ref": "#/definitions/VpTokenClaimPayload"
                }
            }
        },
        "IdTokenClaimPayload": {
            "type": "object"
        },
        "VpTokenClaimPayload": {
            "type": "object",
            "properties": {
                "presentation_definition": {
                    "anyOf": [
                        {
                            "$ref": "#/definitions/PresentationDefinitionV1"
                        },
                        {
                            "$ref": "#/definitions/PresentationDefinitionV2"
                        }
                    ]
                },
                "presentation_definition_uri": {
                    "type": "string"
                }
            },
            "additionalProperties": false
        },
        "PresentationDefinitionV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "format": {
                    "$ref": "#/definitions/Format"
                },
                "submission_requirements": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                },
                "input_descriptors": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/InputDescriptorV1"
                    }
                }
            },
            "required": [
                "id",
                "input_descriptors"
            ],
            "additionalProperties": false
        },
        "SubmissionRequirement": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "rule": {
                    "$ref": "#/definitions/Rules"
                },
                "count": {
                    "type": "number"
                },
                "min": {
                    "type": "number"
                },
                "max": {
                    "type": "number"
                },
                "from": {
                    "type": "string"
                },
                "from_nested": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                }
            },
            "required": [
                "rule"
            ],
            "additionalProperties": false
        },
        "Rules": {
            "type": "string",
            "enum": [
                "all",
                "pick"
            ]
        },
        "InputDescriptorV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "group": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "schema": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Schema"
                    }
                },
                "issuance": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Issuance"
                    }
                },
                "constraints": {
                    "$ref": "#/definitions/ConstraintsV1"
                }
            },
            "required": [
                "id",
                "schema"
            ],
            "additionalProperties": false
        },
        "Schema": {
            "type": "object",
            "properties": {
                "uri": {
                    "type": "string"
                },
                "required": {
                    "type": "boolean"
                }
            },
            "required": [
                "uri"
            ],
            "additionalProperties": false
        },
        "Issuance": {
            "type": "object",
            "properties": {
                "manifest": {
                    "type": "string"
                }
            },
            "additionalProperties": {}
        },
        "ConstraintsV1": {
            "type": "object",
            "properties": {
                "limit_disclosure": {
                    "$ref": "#/definitions/Optionality"
                },
                "statuses": {
                    "$ref": "#/definitions/Statuses"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/FieldV1"
                    }
                },
                "subject_is_issuer": {
                    "$ref": "#/definitions/Optionality"
                },
                "is_holder": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                },
                "same_subject": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                }
            },
            "additionalProperties": false
        },
        "Optionality": {
            "type": "string",
            "enum": [
                "required",
                "preferred"
            ]
        },
        "Statuses": {
            "type": "object",
            "properties": {
                "active": {
                    "$ref": "#/definitions/PdStatus"
                },
                "suspended": {
                    "$ref": "#/definitions/PdStatus"
                },
                "revoked": {
                    "$ref": "#/definitions/PdStatus"
                }
            },
            "additionalProperties": false
        },
        "PdStatus": {
            "type": "object",
            "properties": {
                "directive": {
                    "$ref": "#/definitions/Directives"
                }
            },
            "additionalProperties": false
        },
        "Directives": {
            "type": "string",
            "enum": [
                "required",
                "allowed",
                "disallowed"
            ]
        },
        "FieldV1": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "path": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "purpose": {
                    "type": "string"
                },
                "filter": {
                    "$ref": "#/definitions/FilterV1"
                },
                "predicate": {
                    "$ref": "#/definitions/Optionality"
                }
            },
            "required": [
                "path"
            ],
            "additionalProperties": false
        },
        "FilterV1": {
            "type": "object",
            "properties": {
                "const": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "enum": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/OneOfNumberString"
                    }
                },
                "exclusiveMinimum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "exclusiveMaximum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "format": {
                    "type": "string"
                },
                "minLength": {
                    "type": "number"
                },
                "maxLength": {
                    "type": "number"
                },
                "minimum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "maximum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "not": {
                    "type": "object"
                },
                "pattern": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        },
        "OneOfNumberString": {
            "type": [
                "number",
                "string"
            ]
        },
        "HolderSubject": {
            "type": "object",
            "properties": {
                "field_id": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "directive": {
                    "$ref": "#/definitions/Optionality"
                }
            },
            "required": [
                "field_id",
                "directive"
            ],
            "additionalProperties": false
        },
        "PresentationDefinitionV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "format": {
                    "$ref": "#/definitions/Format"
                },
                "submission_requirements": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/SubmissionRequirement"
                    }
                },
                "input_descriptors": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/InputDescriptorV2"
                    }
                },
                "frame": {
                    "type": "object"
                }
            },
            "required": [
                "id",
                "input_descriptors"
            ],
            "additionalProperties": false
        },
        "InputDescriptorV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "purpose": {
                    "type": "string"
                },
                "format": {
                    "$ref": "#/definitions/Format"
                },
                "group": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "issuance": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Issuance"
                    }
                },
                "constraints": {
                    "$ref": "#/definitions/ConstraintsV2"
                }
            },
            "required": [
                "id",
                "constraints"
            ],
            "additionalProperties": false
        },
        "ConstraintsV2": {
            "type": "object",
            "properties": {
                "limit_disclosure": {
                    "$ref": "#/definitions/Optionality"
                },
                "statuses": {
                    "$ref": "#/definitions/Statuses"
                },
                "fields": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/FieldV2"
                    }
                },
                "subject_is_issuer": {
                    "$ref": "#/definitions/Optionality"
                },
                "is_holder": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                },
                "same_subject": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/HolderSubject"
                    }
                }
            },
            "additionalProperties": false
        },
        "FieldV2": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "string"
                },
                "path": {
                    "type": "array",
                    "items": {
                        "type": "string"
                    }
                },
                "purpose": {
                    "type": "string"
                },
                "filter": {
                    "$ref": "#/definitions/FilterV2"
                },
                "predicate": {
                    "$ref": "#/definitions/Optionality"
                },
                "name": {
                    "type": "string"
                }
            },
            "required": [
                "path"
            ],
            "additionalProperties": false
        },
        "FilterV2": {
            "type": "object",
            "properties": {
                "const": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "enum": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/OneOfNumberString"
                    }
                },
                "exclusiveMinimum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "exclusiveMaximum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "format": {
                    "type": "string"
                },
                "formatMaximum": {
                    "type": "string"
                },
                "formatMinimum": {
                    "type": "string"
                },
                "formatExclusiveMaximum": {
                    "type": "string"
                },
                "formatExclusiveMinimum": {
                    "type": "string"
                },
                "minLength": {
                    "type": "number"
                },
                "maxLength": {
                    "type": "number"
                },
                "minimum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "maximum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "not": {
                    "type": "object"
                },
                "pattern": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "contains": {
                    "$ref": "#/definitions/FilterV2Base"
                },
                "items": {
                    "$ref": "#/definitions/FilterV2BaseItems"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        },
        "FilterV2Base": {
            "type": "object",
            "properties": {
                "const": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "enum": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/OneOfNumberString"
                    }
                },
                "exclusiveMinimum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "exclusiveMaximum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "format": {
                    "type": "string"
                },
                "formatMaximum": {
                    "type": "string"
                },
                "formatMinimum": {
                    "type": "string"
                },
                "formatExclusiveMaximum": {
                    "type": "string"
                },
                "formatExclusiveMinimum": {
                    "type": "string"
                },
                "minLength": {
                    "type": "number"
                },
                "maxLength": {
                    "type": "number"
                },
                "minimum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "maximum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "not": {
                    "type": "object"
                },
                "pattern": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "contains": {
                    "$ref": "#/definitions/FilterV2Base"
                },
                "items": {
                    "$ref": "#/definitions/FilterV2BaseItems"
                }
            },
            "additionalProperties": false
        },
        "FilterV2BaseItems": {
            "type": "object",
            "properties": {
                "const": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "enum": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/OneOfNumberString"
                    }
                },
                "exclusiveMinimum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "exclusiveMaximum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "format": {
                    "type": "string"
                },
                "formatMaximum": {
                    "type": "string"
                },
                "formatMinimum": {
                    "type": "string"
                },
                "formatExclusiveMaximum": {
                    "type": "string"
                },
                "formatExclusiveMinimum": {
                    "type": "string"
                },
                "minLength": {
                    "type": "number"
                },
                "maxLength": {
                    "type": "number"
                },
                "minimum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "maximum": {
                    "$ref": "#/definitions/OneOfNumberString"
                },
                "not": {
                    "type": "object"
                },
                "pattern": {
                    "type": "string"
                },
                "type": {
                    "type": "string"
                },
                "contains": {
                    "$ref": "#/definitions/FilterV2Base"
                },
                "items": {
                    "$ref": "#/definitions/FilterV2BaseItems"
                }
            },
            "required": [
                "type"
            ],
            "additionalProperties": false
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0aG9yaXphdGlvblJlcXVlc3RQYXlsb2FkVklEMS5zY2hlbWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2NoZW1hcy9BdXRob3JpemF0aW9uUmVxdWVzdFBheWxvYWRWSUQxLnNjaGVtYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBYSxRQUFBLHdDQUF3QyxHQUFHO0lBQ3RELEtBQUssRUFBRSx1Q0FBdUM7SUFDOUMsU0FBUyxFQUFFLHlDQUF5QztJQUNwRCxNQUFNLEVBQUUsK0NBQStDO0lBQ3ZELGFBQWEsRUFBRTtRQUNiLGlDQUFpQyxFQUFFO1lBQ2pDLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLFlBQVksRUFBRTtnQkFDWixjQUFjLEVBQUU7b0JBQ2QsTUFBTSxFQUFFLDZDQUE2QztpQkFDdEQ7Z0JBQ0Qsa0JBQWtCLEVBQUU7b0JBQ2xCLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLE9BQU8sRUFBRTt3QkFDUDs0QkFDRSxNQUFNLEVBQUUsUUFBUTt5QkFDakI7d0JBQ0Q7NEJBQ0UsTUFBTSxFQUFFLE9BQU87NEJBQ2YsT0FBTyxFQUFFO2dDQUNQLE1BQU0sRUFBRSxRQUFROzZCQUNqQjt5QkFDRjtxQkFDRjtpQkFDRjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELEtBQUssRUFBRTtvQkFDTCxNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JBQ0QsTUFBTSxFQUFFO29CQUNOLE1BQU0sRUFBRSxRQUFRO2lCQUNqQjtnQkFDRCxLQUFLLEVBQUU7b0JBQ0wsTUFBTSxFQUFFLFFBQVE7aUJBQ2pCO2dCQUNELE1BQU0sRUFBRTtvQkFDTixNQUFNLEVBQUUsUUFBUTtpQkFDakI7Z0JB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