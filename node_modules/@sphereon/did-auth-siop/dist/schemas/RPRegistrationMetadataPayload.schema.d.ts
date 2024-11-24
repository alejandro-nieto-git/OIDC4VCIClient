export declare const RPRegistrationMetadataPayloadSchemaObj: {
    $id: string;
    $schema: string;
    $ref: string;
    definitions: {
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
    };
};
