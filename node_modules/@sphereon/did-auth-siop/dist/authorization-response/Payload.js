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
exports.mergeOAuth2AndOpenIdInRequestPayload = exports.createResponsePayload = void 0;
const id_token_1 = require("../id-token");
const request_object_1 = require("../request-object");
const types_1 = require("../types");
const OpenID4VP_1 = require("./OpenID4VP");
const Opts_1 = require("./Opts");
const createResponsePayload = (authorizationRequest, responseOpts, idTokenPayload) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, Opts_1.assertValidResponseOpts)(responseOpts);
    if (!authorizationRequest) {
        throw new Error(types_1.SIOPErrors.NO_REQUEST);
    }
    // If state was in request, it must be in response
    const state = yield authorizationRequest.getMergedProperty('state');
    const responsePayload = Object.assign(Object.assign(Object.assign(Object.assign({}, (responseOpts.accessToken && { access_token: responseOpts.accessToken })), (responseOpts.tokenType && { token_type: responseOpts.tokenType })), (responseOpts.refreshToken && { refresh_token: responseOpts.refreshToken })), { expires_in: responseOpts.expiresIn || 3600, state });
    // vp tokens
    yield (0, OpenID4VP_1.putPresentationSubmissionInLocation)(authorizationRequest, responsePayload, responseOpts, idTokenPayload);
    if (idTokenPayload) {
        responsePayload.id_token = yield id_token_1.IDToken.fromIDTokenPayload(idTokenPayload, responseOpts).then((id) => id.jwt());
    }
    return responsePayload;
});
exports.createResponsePayload = createResponsePayload;
/**
 * Properties can be in oAUth2 and OpenID (JWT) style. If they are in both the OpenID prop takes precedence as they are signed.
 * @param payload
 * @param requestObject
 */
const mergeOAuth2AndOpenIdInRequestPayload = (payload, requestObject) => __awaiter(void 0, void 0, void 0, function* () {
    const payloadCopy = JSON.parse(JSON.stringify(payload));
    const requestObj = requestObject ? requestObject : yield request_object_1.RequestObject.fromAuthorizationRequestPayload(payload);
    if (!requestObj) {
        return payloadCopy;
    }
    const requestObjectPayload = yield requestObj.getPayload();
    return Object.assign(Object.assign({}, payloadCopy), requestObjectPayload);
});
exports.mergeOAuth2AndOpenIdInRequestPayload = mergeOAuth2AndOpenIdInRequestPayload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF5bG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hdXRob3JpemF0aW9uLXJlc3BvbnNlL1BheWxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQ0EsMENBQXNDO0FBQ3RDLHNEQUFrRDtBQUNsRCxvQ0FBaUg7QUFFakgsMkNBQWtFO0FBQ2xFLGlDQUFpRDtBQUcxQyxNQUFNLHFCQUFxQixHQUFHLENBQ25DLG9CQUEwQyxFQUMxQyxZQUF1QyxFQUN2QyxjQUErQixFQUNvQixFQUFFO0lBQ3JELE1BQU0sSUFBQSw4QkFBdUIsRUFBQyxZQUFZLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVELGtEQUFrRDtJQUNsRCxNQUFNLEtBQUssR0FBdUIsTUFBTSxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV4RixNQUFNLGVBQWUsK0RBQ2hCLENBQUMsWUFBWSxDQUFDLFdBQVcsSUFBSSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsR0FDeEUsQ0FBQyxZQUFZLENBQUMsU0FBUyxJQUFJLEVBQUUsVUFBVSxFQUFFLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUNsRSxDQUFDLFlBQVksQ0FBQyxZQUFZLElBQUksRUFBRSxhQUFhLEVBQUUsWUFBWSxDQUFDLFlBQVksRUFBRSxDQUFDLEtBQzlFLFVBQVUsRUFBRSxZQUFZLENBQUMsU0FBUyxJQUFJLElBQUksRUFDMUMsS0FBSyxHQUNOLENBQUM7SUFFRixZQUFZO0lBQ1osTUFBTSxJQUFBLCtDQUFtQyxFQUFDLG9CQUFvQixFQUFFLGVBQWUsRUFBRSxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDL0csSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUNuQixlQUFlLENBQUMsUUFBUSxHQUFHLE1BQU0sa0JBQU8sQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNuSCxDQUFDO0lBRUQsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQyxDQUFBLENBQUM7QUE1QlcsUUFBQSxxQkFBcUIseUJBNEJoQztBQUVGOzs7O0dBSUc7QUFDSSxNQUFNLG9DQUFvQyxHQUFHLENBQ2xELE9BQW9DLEVBQ3BDLGFBQTZCLEVBQ1MsRUFBRTtJQUN4QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUV4RCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsTUFBTSw4QkFBYSxDQUFDLCtCQUErQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2hILElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNoQixPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBQ0QsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUMzRCx1Q0FBWSxXQUFXLEdBQUssb0JBQW9CLEVBQUc7QUFDckQsQ0FBQyxDQUFBLENBQUM7QUFaVyxRQUFBLG9DQUFvQyx3Q0FZL0MifQ==