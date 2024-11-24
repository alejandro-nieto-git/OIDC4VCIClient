export declare const AuthorizationRequestPayloadVD11SchemaObj: {
    $id: string;
    $schema: string;
    $ref: string;
    definitions: {
        AuthorizationRequestPayloadVD11: {
            type: string;
            properties: {
                id_token_type: {
                    type: string;
                };
                client_metadata: {
                    $ref: string;
                };
                client_metadata_uri: {
                    type: string;
                };
                iss: {
                    type: string;
                };
                sub: {
                    type: string;
                };
                aud: {
                    anyOf: ({
                        type: string;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            type: string;
                        };
                    })[];
                };
                iat: {
                    type: string;
                };
                nbf: {
                    type: string;
                };
                type: {
                    type: string;
                };
                exp: {
                    type: string;
                };
                rexp: {
                    type: string;
                };
                jti: {
                    type: string;
                };
                scope: {
                    type: string;
                };
                response_type: {
                    anyOf: ({
                        $ref: string;
                        type?: undefined;
                    } | {
                        type: string;
                        $ref?: undefined;
                    })[];
                };
                client_id: {
                    type: string;
                };
                redirect_uri: {
                    type: string;
                };
                id_token_hint: {
                    type: string;
                };
                nonce: {
                    type: string;
                };
                state: {
                    type: string;
                };
                response_mode: {
                    $ref: string;
                };
                request: {
                    type: string;
                };
                request_uri: {
                    type: string;
                };
                claims: {
                    $ref: string;
                };
                presentation_definition: {
                    anyOf: ({
                        $ref: string;
                        type?: undefined;
                        items?: undefined;
                    } | {
                        type: string;
                        items: {
                            $ref: string;
                        };
                        $ref?: undefined;
                    })[];
                };
                presentation_definition_uri: {
                    type: string;
                };
            };
        };
        RPRegistrationMetadataPayload: {
            type: string;
            properties: {
                client_id: {
                    anyOf: ({
                        type: string;
                    } | {
                        type?: undefined;
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
                subject_syntax_types_supported: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                vp_formats: {
                    anyOf: ({
                        $ref: string;
                    } | {
                        $ref?: undefined;
                    })[];
                };
                client_name: {
                    anyOf: ({
                        type: string;
                    } | {
                        type?: undefined;
                    })[];
                };
                logo_uri: {
                    anyOf: ({
                        type?: undefined;
                    } | {
                        type: string;
                    })[];
                };
                client_purpose: {
                    anyOf: ({
                        type?: undefined;
                    } | {
                        type: string;
                    })[];
                };
            };
        };
        SigningAlgo: {
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
        ResponseMode: {
            type: string;
            enum: string[];
        };
        ClaimPayloadCommon: {
            type: string;
        };
        PresentationDefinitionV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                format: {
                    $ref: string;
                };
                submission_requirements: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                input_descriptors: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        SubmissionRequirement: {
            type: string;
            properties: {
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                rule: {
                    $ref: string;
                };
                count: {
                    type: string;
                };
                min: {
                    type: string;
                };
                max: {
                    type: string;
                };
                from: {
                    type: string;
                };
                from_nested: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Rules: {
            type: string;
            enum: string[];
        };
        InputDescriptorV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                group: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                schema: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                issuance: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                constraints: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Schema: {
            type: string;
            properties: {
                uri: {
                    type: string;
                };
                required: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        Issuance: {
            type: string;
            properties: {
                manifest: {
                    type: string;
                };
            };
            additionalProperties: {};
        };
        ConstraintsV1: {
            type: string;
            properties: {
                limit_disclosure: {
                    $ref: string;
                };
                statuses: {
                    $ref: string;
                };
                fields: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                subject_is_issuer: {
                    $ref: string;
                };
                is_holder: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                same_subject: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
        Optionality: {
            type: string;
            enum: string[];
        };
        Statuses: {
            type: string;
            properties: {
                active: {
                    $ref: string;
                };
                suspended: {
                    $ref: string;
                };
                revoked: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        PdStatus: {
            type: string;
            properties: {
                directive: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        Directives: {
            type: string;
            enum: string[];
        };
        FieldV1: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                path: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                purpose: {
                    type: string;
                };
                filter: {
                    $ref: string;
                };
                predicate: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        FilterV1: {
            type: string;
            properties: {
                const: {
                    $ref: string;
                };
                enum: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                exclusiveMinimum: {
                    $ref: string;
                };
                exclusiveMaximum: {
                    $ref: string;
                };
                format: {
                    type: string;
                };
                minLength: {
                    type: string;
                };
                maxLength: {
                    type: string;
                };
                minimum: {
                    $ref: string;
                };
                maximum: {
                    $ref: string;
                };
                not: {
                    type: string;
                };
                pattern: {
                    type: string;
                };
                type: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        OneOfNumberString: {
            type: string[];
        };
        HolderSubject: {
            type: string;
            properties: {
                field_id: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                directive: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        PresentationDefinitionV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                format: {
                    $ref: string;
                };
                submission_requirements: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                input_descriptors: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                frame: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        InputDescriptorV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                name: {
                    type: string;
                };
                purpose: {
                    type: string;
                };
                format: {
                    $ref: string;
                };
                group: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                issuance: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                constraints: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        ConstraintsV2: {
            type: string;
            properties: {
                limit_disclosure: {
                    $ref: string;
                };
                statuses: {
                    $ref: string;
                };
                fields: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                subject_is_issuer: {
                    $ref: string;
                };
                is_holder: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                same_subject: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            additionalProperties: boolean;
        };
        FieldV2: {
            type: string;
            properties: {
                id: {
                    type: string;
                };
                path: {
                    type: string;
                    items: {
                        type: string;
                    };
                };
                purpose: {
                    type: string;
                };
                filter: {
                    $ref: string;
                };
                predicate: {
                    $ref: string;
                };
                name: {
                    type: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        FilterV2: {
            type: string;
            properties: {
                const: {
                    $ref: string;
                };
                enum: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                exclusiveMinimum: {
                    $ref: string;
                };
                exclusiveMaximum: {
                    $ref: string;
                };
                format: {
                    type: string;
                };
                formatMaximum: {
                    type: string;
                };
                formatMinimum: {
                    type: string;
                };
                formatExclusiveMaximum: {
                    type: string;
                };
                formatExclusiveMinimum: {
                    type: string;
                };
                minLength: {
                    type: string;
                };
                maxLength: {
                    type: string;
                };
                minimum: {
                    $ref: string;
                };
                maximum: {
                    $ref: string;
                };
                not: {
                    type: string;
                };
                pattern: {
                    type: string;
                };
                type: {
                    type: string;
                };
                contains: {
                    $ref: string;
                };
                items: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
        FilterV2Base: {
            type: string;
            properties: {
                const: {
                    $ref: string;
                };
                enum: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                exclusiveMinimum: {
                    $ref: string;
                };
                exclusiveMaximum: {
                    $ref: string;
                };
                format: {
                    type: string;
                };
                formatMaximum: {
                    type: string;
                };
                formatMinimum: {
                    type: string;
                };
                formatExclusiveMaximum: {
                    type: string;
                };
                formatExclusiveMinimum: {
                    type: string;
                };
                minLength: {
                    type: string;
                };
                maxLength: {
                    type: string;
                };
                minimum: {
                    $ref: string;
                };
                maximum: {
                    $ref: string;
                };
                not: {
                    type: string;
                };
                pattern: {
                    type: string;
                };
                type: {
                    type: string;
                };
                contains: {
                    $ref: string;
                };
                items: {
                    $ref: string;
                };
            };
            additionalProperties: boolean;
        };
        FilterV2BaseItems: {
            type: string;
            properties: {
                const: {
                    $ref: string;
                };
                enum: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
                exclusiveMinimum: {
                    $ref: string;
                };
                exclusiveMaximum: {
                    $ref: string;
                };
                format: {
                    type: string;
                };
                formatMaximum: {
                    type: string;
                };
                formatMinimum: {
                    type: string;
                };
                formatExclusiveMaximum: {
                    type: string;
                };
                formatExclusiveMinimum: {
                    type: string;
                };
                minLength: {
                    type: string;
                };
                maxLength: {
                    type: string;
                };
                minimum: {
                    $ref: string;
                };
                maximum: {
                    $ref: string;
                };
                not: {
                    type: string;
                };
                pattern: {
                    type: string;
                };
                type: {
                    type: string;
                };
                contains: {
                    $ref: string;
                };
                items: {
                    $ref: string;
                };
            };
            required: string[];
            additionalProperties: boolean;
        };
    };
};
