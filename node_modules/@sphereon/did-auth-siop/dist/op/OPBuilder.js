"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPBuilder = void 0;
const events_1 = require("events");
const did_uni_client_1 = require("@sphereon/did-uni-client");
const did_resolver_1 = require("did-resolver");
const did_1 = require("../did");
const types_1 = require("../types");
const OP_1 = require("./OP");
class OPBuilder {
    constructor() {
        this.resolvers = new Map();
        this.responseMode = types_1.ResponseMode.DIRECT_POST;
        this.responseRegistration = {};
    }
    addDidMethod(didMethod, opts) {
        const method = didMethod.startsWith('did:') ? (0, did_1.getMethodFromDid)(didMethod) : didMethod;
        if (method === types_1.SubjectSyntaxTypesSupportedValues.DID.valueOf()) {
            opts ? this.addResolver('', new did_uni_client_1.UniResolver(Object.assign({}, opts))) : this.addResolver('', null);
        }
        opts ? this.addResolver(method, new did_resolver_1.Resolver((0, did_uni_client_1.getUniResolver)(method, Object.assign({}, opts)))) : this.addResolver(method, null);
        return this;
    }
    withHasher(hasher) {
        this.hasher = hasher;
        return this;
    }
    withIssuer(issuer) {
        this.issuer = issuer;
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
    /*withDid(did: string): OPBuilder {
      this.did = did;
      return this;
    }
  */
    withExpiresIn(expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
    withCheckLinkedDomain(mode) {
        this.checkLinkedDomain = mode;
        return this;
    }
    withResponseMode(responseMode) {
        this.responseMode = responseMode;
        return this;
    }
    withRegistration(responseRegistration, targets) {
        this.responseRegistration = Object.assign({ targets }, responseRegistration);
        return this;
    }
    /*//TODO registration object creation
    authorizationEndpoint?: Schema.OPENID | string;
    scopesSupported?: Scope[] | Scope;
    subjectTypesSupported?: SubjectType[] | SubjectType;
    idTokenSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
    requestObjectSigningAlgValuesSupported?: SigningAlgo[] | SigningAlgo;
  */
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
    withWellknownDIDVerifyCallback(wellknownDIDVerifyCallback) {
        this.wellknownDIDVerifyCallback = wellknownDIDVerifyCallback;
        return this;
    }
    withSupportedVersions(supportedVersions) {
        const versions = Array.isArray(supportedVersions) ? supportedVersions : [supportedVersions];
        for (const version of versions) {
            this.addSupportedVersion(version);
        }
        return this;
    }
    addSupportedVersion(supportedVersion) {
        if (!this.supportedVersions) {
            this.supportedVersions = [];
        }
        if (typeof supportedVersion === 'string') {
            this.supportedVersions.push(types_1.SupportedVersion[supportedVersion]);
        }
        else {
            this.supportedVersions.push(supportedVersion);
        }
        return this;
    }
    withPresentationSignCallback(presentationSignCallback) {
        this.presentationSignCallback = presentationSignCallback;
        return this;
    }
    withEventEmitter(eventEmitter) {
        this.eventEmitter = eventEmitter !== null && eventEmitter !== void 0 ? eventEmitter : new events_1.EventEmitter();
        return this;
    }
    build() {
        /*if (!this.responseRegistration) {
          throw Error('You need to provide response registrations values')
        } else */ /*if (!this.withSignature) {
          throw Error('You need to supply withSignature values');
        } else */ if (!this.supportedVersions || this.supportedVersions.length === 0) {
            this.supportedVersions = [types_1.SupportedVersion.SIOPv2_D11, types_1.SupportedVersion.SIOPv2_ID1, types_1.SupportedVersion.JWT_VC_PRESENTATION_PROFILE_v1];
        }
        // We ignore the private visibility, as we don't want others to use the OP directly
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new OP_1.OP({ builder: this });
    }
}
exports.OPBuilder = OPBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT1BCdWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29wL09QQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBc0M7QUFFdEMsNkRBQStFO0FBSS9FLCtDQUFvRDtBQUlwRCxnQ0FBMEM7QUFDMUMsb0NBWWtCO0FBRWxCLDZCQUEwQjtBQUUxQixNQUFhLFNBQVM7SUFBdEI7UUFHRSxjQUFTLEdBQTRCLElBQUksR0FBRyxFQUFzQixDQUFDO1FBQ25FLGlCQUFZLEdBQWtCLG9CQUFZLENBQUMsV0FBVyxDQUFDO1FBQ3ZELHlCQUFvQixHQUF1QyxFQUFFLENBQUM7SUFtSmhFLENBQUM7SUF4SUMsWUFBWSxDQUFDLFNBQWlCLEVBQUUsSUFBZ0Q7UUFDOUUsTUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBQSxzQkFBZ0IsRUFBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3RGLElBQUksTUFBTSxLQUFLLHlDQUFpQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQy9ELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSw0QkFBVyxDQUFDLGtCQUFLLElBQUksQ0FBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSx1QkFBUSxDQUFDLElBQUEsK0JBQWMsRUFBQyxNQUFNLG9CQUFPLElBQUksRUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEgs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