export declare const DiscoveryMetadataPayloadSchemaObj: {
    $id: string;
    $schema: string;
    $ref: string;
    definitions: {
        DiscoveryMetadataPayload: {
            anyOf: ({
                type: string;
                properties: {
                    authorization_endpoint: {
                        anyOf: ({
                            $ref: string;
                            type?: undefined;
                        } | {
                            type: string;
                            $ref?: undefined;
                        })[];
                    };
                    issuer: {
                        anyOf: ({
                            $ref: string;
                            type?: undefined;
                        } | {
                            type: string;
                            $ref?: undefined;
                        })[];
                    };
                    response_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    scopes_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    subject_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    request_object_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    subject_syntax_types_supported: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    token_endpoint: {
                        type: string;
                    };
                    userinfo_endpoint: {
                        type: string;
                    };
                    jwks_uri: {
                        type: string;
                    };
                    registration_endpoint: {
                        type: string;
                    };
                    response_modes_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    grant_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    acr_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    userinfo_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    userinfo_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    userinfo_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    request_object_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    request_object_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    token_endpoint_auth_methods_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    token_endpoint_auth_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    display_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {};
                        } | {
                            type?: undefined;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    claim_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    claims_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    service_documentation: {
                        type: string;
                    };
                    claims_locales_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                    };
                    ui_locales_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                    };
                    claims_parameter_supported: {
                        type: string;
                    };
                    request_parameter_supported: {
                        type: string;
                    };
                    request_uri_parameter_supported: {
                        type: string;
                    };
                    require_request_uri_registration: {
                        type: string;
                    };
                    op_policy_uri: {
                        type: string;
                    };
                    op_tos_uri: {
                        type: string;
                    };
                    client_id: {
                        type: string;
                    };
                    redirect_uris: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    client_name: {
                        type: string;
                    };
                    token_endpoint_auth_method: {
                        type: string;
                    };
                    application_type: {
                        type: string;
                    };
                    response_types: {
                        type: string;
                    };
                    grant_types: {
                        type: string;
                    };
                    vp_formats: {
                        $ref: string;
                    };
                    logo_uri?: undefined;
                    client_purpose?: undefined;
                    id_token_types_supported?: undefined;
                    vp_formats_supported?: undefined;
                };
            } | {
                type: string;
                properties: {
                    authorization_endpoint: {
                        anyOf: ({
                            $ref: string;
                            type?: undefined;
                        } | {
                            type: string;
                            $ref?: undefined;
                        })[];
                    };
                    issuer: {
                        anyOf: ({
                            $ref: string;
                            type?: undefined;
                        } | {
                            type: string;
                            $ref?: undefined;
                        })[];
                    };
                    response_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    scopes_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    subject_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    request_object_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    subject_syntax_types_supported: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    token_endpoint: {
                        type: string;
                    };
                    userinfo_endpoint: {
                        type: string;
                    };
                    jwks_uri: {
                        type: string;
                    };
                    registration_endpoint: {
                        type: string;
                    };
                    response_modes_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    grant_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    acr_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    userinfo_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    userinfo_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    userinfo_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    request_object_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    request_object_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    token_endpoint_auth_methods_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    token_endpoint_auth_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    display_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {};
                        } | {
                            type?: undefined;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    claim_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    claims_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    service_documentation: {
                        type: string;
                    };
                    claims_locales_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                    };
                    ui_locales_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                    };
                    claims_parameter_supported: {
                        type: string;
                    };
                    request_parameter_supported: {
                        type: string;
                    };
                    request_uri_parameter_supported: {
                        type: string;
                    };
                    require_request_uri_registration: {
                        type: string;
                    };
                    op_policy_uri: {
                        type: string;
                    };
                    op_tos_uri: {
                        type: string;
                    };
                    client_id: {
                        type: string;
                    };
                    redirect_uris: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    client_name: {
                        type: string;
                    };
                    token_endpoint_auth_method: {
                        type: string;
                    };
                    application_type: {
                        type: string;
                    };
                    response_types: {
                        type: string;
                    };
                    grant_types: {
                        type: string;
                    };
                    vp_formats: {
                        $ref: string;
                    };
                    logo_uri: {
                        type: string;
                    };
                    client_purpose: {
                        type: string;
                    };
                    id_token_types_supported?: undefined;
                    vp_formats_supported?: undefined;
                };
            } | {
                type: string;
                properties: {
                    authorization_endpoint: {
                        anyOf: ({
                            $ref: string;
                            type?: undefined;
                        } | {
                            type: string;
                            $ref?: undefined;
                        })[];
                    };
                    issuer: {
                        anyOf: ({
                            $ref: string;
                            type?: undefined;
                        } | {
                            type: string;
                            $ref?: undefined;
                        })[];
                    };
                    response_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    scopes_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    subject_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    request_object_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    subject_syntax_types_supported: {
                        type: string;
                        items: {
                            type: string;
                        };
                    };
                    token_endpoint: {
                        type: string;
                    };
                    userinfo_endpoint: {
                        type: string;
                    };
                    jwks_uri: {
                        type: string;
                    };
                    registration_endpoint: {
                        type: string;
                    };
                    response_modes_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    grant_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    acr_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    id_token_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    userinfo_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    userinfo_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    userinfo_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    request_object_encryption_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    request_object_encryption_enc_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    token_endpoint_auth_methods_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    token_endpoint_auth_signing_alg_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    display_values_supported: {
                        anyOf: ({
                            type: string;
                            items: {};
                        } | {
                            type?: undefined;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    claim_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    claims_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                        description: string;
                    };
                    service_documentation: {
                        type: string;
                    };
                    claims_locales_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                    };
                    ui_locales_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                type: string;
                            };
                        } | {
                            type: string;
                            items?: undefined;
                        })[];
                    };
                    claims_parameter_supported: {
                        type: string;
                    };
                    request_parameter_supported: {
                        type: string;
                    };
                    request_uri_parameter_supported: {
                        type: string;
                    };
                    require_request_uri_registration: {
                        type: string;
                    };
                    op_policy_uri: {
                        type: string;
                    };
                    op_tos_uri: {
                        type: string;
                    };
                    id_token_types_supported: {
                        anyOf: ({
                            type: string;
                            items: {
                                $ref: string;
                            };
                            $ref?: undefined;
                        } | {
                            $ref: string;
                            type?: undefined;
                            items?: undefined;
                        })[];
                    };
                    vp_formats_supported: {
                        $ref: string;
                    };
                    client_id?: undefined;
                    redirect_uris?: undefined;
                    client_name?: undefined;
                    token_endpoint_auth_method?: undefined;
                    application_type?: undefined;
                    response_types?: undefined;
                    grant_types?: undefined;
                    vp_formats?: undefined;
                    logo_uri?: undefined;
                    client_purpose?: undefined;
                };
            })[];
        };
        Schema: {
            type: string;
            enum: string[];
        };
        ResponseIss: {
            type: string;
            enum: string[];
        };
        ResponseType: {
            type: string;
            enum: string[];
        };
        Scope: {
            type: string;
            enum: string[];
        };
        SubjectType: {
            type: string;
            enum: string[];
        };
        SigningAlgo: {
            type: string;
            enum: string[];
        };
        ResponseMode: {
            type: string;
            enum: string[];
        };
        GrantType: {
            type: string;
            enum: string[];
        };
        AuthenticationContextReferences: {
            type: string;
            enum: string[];
        };
        TokenEndpointAuthMethod: {
            type: string;
            enum: string[];
        };
        ClaimType: {
            type: string;
            enum: string[];
        };
        Format: {
            type: string;
            properties: {
                jwt: {
                    $ref: string;
                };
                jwt_vc: {
                    $ref: string;
                };
                jwt_vc_json: {
                    $ref: string;
                };
                jwt_vp: {
                    $ref: string;
                };
                jwt_vp_json: {
                    $ref: string;
                };
                ldp: {
                    $ref: string;
                };
                ldp_vc: {
                    $ref: string;
                };
                ldp_vp: {
                    $ref: string;
                };
                di: {
                    $ref: string;
                };
                di_vc: {
                    $ref: string;
                };
                di_vp: {
                    $ref: string;
                };
                "vc+sd-jwt": {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        JwtObject: {
            type: string;
            properties: {
                alg: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        LdpObject: {
            type: string;
            properties: {
                proof_type: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        DiObject: {
            type: string;
            properties: {
                proof_type: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                cryptosuite: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        SdJwtObject: {
            type: string;
            properties: {
                "sd-jwt_alg_values": {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                "kb-jwt_alg_values": {
                    type: string;
                    items: {
                        type: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
        IdTokenType: {
            type: string;
            enum: string[];
        };
    };
};
