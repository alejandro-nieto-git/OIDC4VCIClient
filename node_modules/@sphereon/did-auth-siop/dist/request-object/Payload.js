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
exports.assertValidRequestObjectPayload = exports.createRequestObjectPayload = void 0;
const uuid_1 = require("uuid");
const authorization_request_1 = require("../authorization-request");
const RequestRegistration_1 = require("../authorization-request/RequestRegistration");
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const Opts_1 = require("./Opts");
const createRequestObjectPayload = (opts) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    (0, Opts_1.assertValidRequestObjectOpts)(opts.requestObject, false);
    if (!((_a = opts.requestObject) === null || _a === void 0 ? void 0 : _a.payload)) {
        return undefined; // No request object apparently
    }
    (0, Opts_1.assertValidRequestObjectOpts)(opts.requestObject, true);
    const payload = opts.requestObject.payload;
    const state = (0, helpers_1.getState)(payload.state);
    const registration = yield (0, RequestRegistration_1.createRequestRegistration)(opts.clientMetadata, opts);
    const claims = (0, authorization_request_1.createPresentationDefinitionClaimsProperties)(payload.claims);
    let clientId = payload.client_id;
    const metadataKey = opts.version >= types_1.SupportedVersion.SIOPv2_D11.valueOf() ? 'client_metadata' : 'registration';
    if (!clientId) {
        clientId = (_b = registration.payload[metadataKey]) === null || _b === void 0 ? void 0 : _b.client_id;
    }
    if (!clientId && !opts.requestObject.signature.did) {
        throw Error('Please provide a clientId for the RP');
    }
    const now = Math.round(new Date().getTime() / 1000);
    const validInSec = 120; // todo config/option
    const iat = (_c = payload.iat) !== null && _c !== void 0 ? _c : now;
    const nbf = (_d = payload.nbf) !== null && _d !== void 0 ? _d : iat;
    const exp = (_e = payload.exp) !== null && _e !== void 0 ? _e : iat + validInSec;
    const jti = (_f = payload.jti) !== null && _f !== void 0 ? _f : (0, uuid_1.v4)();
    return (0, helpers_1.removeNullUndefined)(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({ response_type: (_g = payload.response_type) !== null && _g !== void 0 ? _g : types_1.ResponseType.ID_TOKEN, scope: (_h = payload.scope) !== null && _h !== void 0 ? _h : types_1.Scope.OPENID, 
        //TODO implement /.well-known/openid-federation support in the OP side to resolve the client_id (URL) and retrieve the metadata
        client_id: clientId !== null && clientId !== void 0 ? clientId : opts.requestObject.signature.did }, (payload.redirect_uri && { redirect_uri: payload.redirect_uri })), (payload.response_uri && { response_uri: payload.response_uri })), { response_mode: (_j = payload.response_mode) !== null && _j !== void 0 ? _j : types_1.ResponseMode.DIRECT_POST }), (payload.id_token_hint && { id_token_hint: payload.id_token_hint })), { registration_uri: registration.clientMetadataOpts.reference_uri, nonce: (0, helpers_1.getNonce)(state, payload.nonce), state }), registration.payload), { claims, presentation_definition_uri: payload.presentation_definition_uri, presentation_definition: payload.presentation_definition, iat,
        nbf,
        exp,
        jti }));
});
exports.createRequestObjectPayload = createRequestObjectPayload;
const assertValidRequestObjectPayload = (verPayload) => {
    if (verPayload['registration_uri'] && verPayload['registration']) {
        throw new Error(`${types_1.SIOPErrors.REG_OBJ_N_REG_URI_CANT_BE_SET_SIMULTANEOUSLY}`);
    }
};
exports.assertValidRequestObjectPayload = assertValidRequestObjectPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZXF1ZXN0LW9iamVjdC9QYXlsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtCQUFvQztBQUVwQyxvRUFBd0g7QUFDeEgsc0ZBQXlGO0FBQ3pGLHdDQUFxRTtBQUNyRSxvQ0FBaUg7QUFFakgsaUNBQXNEO0FBRS9DLE1BQU0sMEJBQTBCLEdBQUcsQ0FBTyxJQUFvQyxFQUE2QyxFQUFFOztJQUNsSSxJQUFBLG1DQUE0QixFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsSUFBSSxDQUFDLENBQUEsTUFBQSxJQUFJLENBQUMsYUFBYSwwQ0FBRSxPQUFPLENBQUEsRUFBRSxDQUFDO1FBQ2pDLE9BQU8sU0FBUyxDQUFDLENBQUMsK0JBQStCO0lBQ25ELENBQUM7SUFDRCxJQUFBLG1DQUE0QixFQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFdkQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFFM0MsTUFBTSxLQUFLLEdBQUcsSUFBQSxrQkFBUSxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUEsK0NBQXlCLEVBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoRixNQUFNLE1BQU0sR0FBRyxJQUFBLG9FQUE0QyxFQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUU1RSxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0lBRWpDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksd0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDO0lB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