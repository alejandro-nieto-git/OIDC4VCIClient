"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPBuilder = void 0;
const events_1 = require("events");
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const authorization_request_1 = require("../authorization-request");
const did_1 = require("../did");
const types_1 = require("../types");
const Opts_1 = require("./Opts");
const RP_1 = require("./RP");
class RPBuilder {
    constructor(supportedRequestVersion) {
        this.resolvers = new Map();
        this._authorizationRequestPayload = {};
        this._requestObjectPayload = {};
        this.clientMetadata = undefined;
        if (supportedRequestVersion) {
            this.addSupportedVersion(supportedRequestVersion);
        }
    }
    withScope(scope, targets) {
        this._authorizationRequestPayload.scope = (0, Opts_1.assignIfAuth)({ propertyValue: scope, targets }, false);
        this._requestObjectPayload.scope = (0, Opts_1.assignIfRequestObject)({ propertyValue: scope, targets }, true);
        return this;
    }
    withResponseType(responseType, targets) {
        const propertyValue = Array.isArray(responseType) ? responseType.join(' ').trim() : responseType;
        this._authorizationRequestPayload.response_type = (0, Opts_1.assignIfAuth)({ propertyValue, targets }, false);
        this._requestObjectPayload.response_type = (0, Opts_1.assignIfRequestObject)({ propertyValue, targets }, true);
        return this;
    }
    withHasher(hasher) {
        this.hasher = hasher;
        return this;
    }
    withClientId(clientId, targets) {
        this._authorizationRequestPayload.client_id = (0, Opts_1.assignIfAuth)({ propertyValue: clientId, targets }, false);
        this._requestObjectPayload.client_id = (0, Opts_1.assignIfRequestObject)({ propertyValue: clientId, targets }, true);
        this.clientId = clientId;
        return this;
    }
    withIssuer(issuer, targets) {
        this._authorizationRequestPayload.iss = (0, Opts_1.assignIfAuth)({ propertyValue: issuer, targets }, false);
        this._requestObjectPayload.iss = (0, Opts_1.assignIfRequestObject)({ propertyValue: issuer, targets }, true);
        return this;
    }
    withPresentationVerification(presentationVerificationCallback) {
        this.presentationVerificationCallback = presentationVerificationCallback;
        return this;
    }
    withRevocationVerification(mode) {
        this.revocationVerification = mode;
        return this;
    }
    withRevocationVerificationCallback(callback) {
        this.revocationVerificationCallback = callback;
        return this;
    }
    withCustomResolver(resolver) {
        this.customResolver = resolver;
        return this;
    }
    addResolver(didMethod, resolver) {
        const qualifiedDidMethod = didMethod.startsWith('did:') ? (0, did_1.getMethodFromDid)(didMethod) : didMethod;
        this.resolvers.set(qualifiedDidMethod, resolver);
        return this;
    }
    withAuthorizationEndpoint(authorizationEndpoint, targets) {
        this._authorizationRequestPayload.authorization_endpoint = (0, Opts_1.assignIfAuth)({
            propertyValue: authorizationEndpoint,
            targets,
        }, false);
        this._requestObjectPayload.authorization_endpoint = (0, Opts_1.assignIfRequestObject)({
            propertyValue: authorizationEndpoint,
            targets,
        }, true);
        return this;
    }
    withCheckLinkedDomain(mode) {
        this.checkLinkedDomain = mode;
        return this;
    }
    addDidMethod(didMethod, opts) {
        const method = didMethod.startsWith('did:') ? (0, did_1.getMethodFromDid)(didMethod) : didMethod;
        if (method === types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) {
            opts ? this.addResolver('', new did_uni_client_1.UniResolver(Object.assign({}, opts))) : this.addResolver('', null);
        }
        opts ? this.addResolver(method, new did_resolver_1.Resolver((0, did_uni_client_1.getUniResolver)(method, Object.assign({}, opts)))) : this.addResolver(method, null);
        return this;
    }
    withRedirectUri(redirectUri, targets) {
        this._authorizationRequestPayload.redirect_uri = (0, Opts_1.assignIfAuth)({ propertyValue: redirectUri, targets }, false);
        this._requestObjectPayload.redirect_uri = (0, Opts_1.assignIfRequestObject)({ propertyValue: redirectUri, targets }, true);
        return this;
    }
    withRequestByReference(referenceUri) {
        return this.withRequestBy(types_1.PassBy.REFERENCE, referenceUri /*, PropertyTarget.AUTHORIZATION_REQUEST*/);
    }
    withRequestByValue() {
        return this.withRequestBy(types_1.PassBy.VALUE, undefined /*, PropertyTarget.AUTHORIZATION_REQUEST*/);
    }
    withRequestBy(passBy, referenceUri /*, targets?: PropertyTargets*/) {
        if (passBy === types_1.PassBy.REFERENCE && !referenceUri) {
            throw Error('Cannot use pass by reference without a reference URI');
        }
        this.requestObjectBy = {
            passBy,
            reference_uri: referenceUri,
            targets: authorization_request_1.PropertyTarget.AUTHORIZATION_REQUEST,
        };
        return this;
    }
    withResponseMode(responseMode, targets) {
        this._authorizationRequestPayload.response_mode = (0, Opts_1.assignIfAuth)({ propertyValue: responseMode, targets }, false);
        this._requestObjectPayload.response_mode = (0, Opts_1.assignIfRequestObject)({ propertyValue: responseMode, targets }, true);
        return this;
    }
    withClientMetadata(clientMetadata, targets) {
        clientMetadata.targets = targets;
        if (this.getSupportedRequestVersion() < types_1.SupportedVersion.SIOPv2_D11) {
            this._authorizationRequestPayload.registration = (0, Opts_1.assignIfAuth)({
                propertyValue: clientMetadata,
                targets,
            }, false);
            this._requestObjectPayload.registration = (0, Opts_1.assignIfRequestObject)({
                propertyValue: clientMetadata,
                targets,
            }, true);
        }
        else {
            this._authorizationRequestPayload.client_metadata = (0, Opts_1.assignIfAuth)({
                propertyValue: clientMetadata,
                targets,
            }, false);
            this._requestObjectPayload.client_metadata = (0, Opts_1.assignIfRequestObject)({
                propertyValue: clientMetadata,
                targets,
            }, true);
        }
        this.clientMetadata = clientMetadata;
        //fixme: Add URL
        return this;
    }
    // Only internal and supplied signatures supported for now
    withSignature(signature) {
        this.signature = signature;
        return this;
    }
    withInternalSignature(hexPrivateKey, did, kid, alg, customJwtSigner) {
        this.withSignature({ hexPrivateKey, did, kid, alg, customJwtSigner });
        return this;
    }
    withSuppliedSignature(signature, did, kid, alg) {
        this.withSignature({ signature, did, kid, alg });
        return this;
    }
    withPresentationDefinition(definitionOpts, targets) {
        const { definition, definitionUri } = definitionOpts;
        if (this.getSupportedRequestVersion() < types_1.SupportedVersion.SIOPv2_D11) {
            const definitionProperties = {
                presentation_definition: definition,
                presentation_definition_uri: definitionUri,
            };
            const vp_token = Object.assign({}, definitionProperties);
            if ((0, Opts_1.isTarget)(authorization_request_1.PropertyTarget.AUTHORIZATION_REQUEST, targets)) {
                this._authorizationRequestPayload.claims = Object.assign(Object.assign({}, (this._authorizationRequestPayload.claims ? this._authorizationRequestPayload.claims : {})), { vp_token: vp_token });
            }
            if ((0, Opts_1.isTargetOrNoTargets)(authorization_request_1.PropertyTarget.REQUEST_OBJECT, targets)) {
                this._requestObjectPayload.claims = Object.assign(Object.assign({}, (this._requestObjectPayload.claims ? this._requestObjectPayload.claims : {})), { vp_token: vp_token });
            }
        }
        else {
            this._authorizationRequestPayload.presentation_definition = (0, Opts_1.assignIfAuth)({
                propertyValue: definition,
                targets,
            }, false);
            this._authorizationRequestPayload.presentation_definition_uri = (0, Opts_1.assignIfAuth)({
                propertyValue: definitionUri,
                targets,
            }, true);
            this._requestObjectPayload.presentation_definition = (0, Opts_1.assignIfRequestObject)({
                propertyValue: definition,
                targets,
            }, true);
            this._requestObjectPayload.presentation_definition_uri = (0, Opts_1.assignIfRequestObject)({
                propertyValue: definitionUri,
                targets,
            }, true);
        }
        return this;
    }
    withWellknownDIDVerifyCallback(wellknownDIDVerifyCallback) {
        this.wellknownDIDVerifyCallback = wellknownDIDVerifyCallback;
        return this;
    }
    initSupportedVersions() {
        if (!this.supportedVersions) {
            this.supportedVersions = [];
        }
    }
    addSupportedVersion(supportedVersion) {
        this.initSupportedVersions();
        if (!this.supportedVersions.includes(supportedVersion)) {
            this.supportedVersions.push(supportedVersion);
        }
        return this;
    }
    withSupportedVersions(supportedVersion) {
        const versions = Array.isArray(supportedVersion) ? supportedVersion : [supportedVersion];
        for (const version of versions) {
            this.addSupportedVersion(version);
        }
        return this;
    }
    withEventEmitter(eventEmitter) {
        this.eventEmitter = eventEmitter !== null && eventEmitter !== void 0 ? eventEmitter : new events_1.EventEmitter();
        return this;
    }
    withSessionManager(sessionManager) {
        this.sessionManager = sessionManager;
        return this;
    }
    getSupportedRequestVersion(requireVersion) {
        if (!this.supportedVersions || this.supportedVersions.length === 0) {
            if (requireVersion !== false) {
                throw Error('No supported version supplied/available');
            }
            return undefined;
        }
        return this.supportedVersions[0];
    }
    static newInstance(supportedVersion) {
        return new RPBuilder(supportedVersion);
    }
    build() {
        if (this.sessionManager && !this.eventEmitter) {
            throw Error('Please enable the event emitter on the RP when using a replay registry');
        }
        // We do not want others to directly use the RP class
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new RP_1.RP({ builder: this });
    }
    get authorizationRequestPayload() {
        return this._authorizationRequestPayload;
    }
    get requestObjectPayload() {
        return this._requestObjectPayload;
    }
}
exports.RPBuilder = RPBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUlBCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JwL1JQQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBc0M7QUFFdEMsNkRBQStFO0FBSy9FLCtDQUFvRDtBQUVwRCxvRUFBMkU7QUFFM0UsZ0NBQTBDO0FBQzFDLG9DQW9Ca0I7QUFFbEIsaUNBQTRGO0FBQzVGLDZCQUEwQjtBQUcxQixNQUFhLFNBQVM7SUFxQnBCLFlBQW9CLHVCQUEwQztRQXBCOUQsY0FBUyxHQUE0QixJQUFJLEdBQUcsRUFBc0IsQ0FBQztRQVkzRCxpQ0FBNEIsR0FBeUMsRUFBRSxDQUFDO1FBQ3hFLDBCQUFxQixHQUFrQyxFQUFFLENBQUM7UUFFbEUsbUJBQWMsR0FBd0IsU0FBUyxDQUFDO1FBTTlDLElBQUksdUJBQXVCLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsbUJBQW1CLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUNwRCxDQUFDO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxLQUFhLEVBQUUsT0FBeUI7UUFDaEQsSUFBSSxDQUFDLDRCQUE0QixDQUFDLEtBQUssR0FBRyxJQUFBLG1CQUFZLEVBQUMsRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLEdBQUcsSUFBQSw0QkFBcUIsRUFBQyxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEcsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsWUFBb0QsRUFBRSxPQUF5QjtRQUM5RixNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFB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