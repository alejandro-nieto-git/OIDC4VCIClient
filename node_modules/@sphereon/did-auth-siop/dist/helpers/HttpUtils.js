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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchByReferenceOrUseByValue = exports.getWithUrl = exports.post = exports.formPost = exports.getJson = void 0;
const cross_fetch_1 = require("cross-fetch");
const debug_1 = __importDefault(require("debug"));
const types_1 = require("../types");
const debug = (0, debug_1.default)('sphereon:siopv2:http');
const getJson = (URL, opts) => __awaiter(void 0, void 0, void 0, function* () {
    return yield siopFetch(URL, undefined, Object.assign({ method: 'GET' }, opts));
});
exports.getJson = getJson;
const formPost = (url, body, opts) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exports.post)(url, body, (opts === null || opts === void 0 ? void 0 : opts.contentType) ? Object.assign({}, opts) : Object.assign({ contentType: types_1.ContentType.FORM_URL_ENCODED }, opts));
});
exports.formPost = formPost;
const post = (url, body, opts) => __awaiter(void 0, void 0, void 0, function* () {
    return yield siopFetch(url, body, Object.assign({ method: 'POST' }, opts));
});
exports.post = post;
const siopFetch = (url, body, opts) => __awaiter(void 0, void 0, void 0, function* () {
    if (!url || url.toLowerCase().startsWith('did:')) {
        throw Error(`Invalid URL supplied. Expected a http(s) URL. Recieved: ${url}`);
    }
    const headers = (opts === null || opts === void 0 ? void 0 : opts.customHeaders) ? opts.customHeaders : {};
    if (opts === null || opts === void 0 ? void 0 : opts.bearerToken) {
        headers['Authorization'] = `Bearer ${opts.bearerToken}`;
    }
    const method = (opts === null || opts === void 0 ? void 0 : opts.method) ? opts.method : body ? 'POST' : 'GET';
    const accept = (opts === null || opts === void 0 ? void 0 : opts.accept) ? opts.accept : 'application/json';
    headers['Content-Type'] = (opts === null || opts === void 0 ? void 0 : opts.contentType) ? opts.contentType : method !== 'GET' ? 'application/json' : undefined;
    headers['Accept'] = accept;
    const payload = {
        method,
        headers,
        body,
    };
    debug(`START fetching url: ${url}`);
    if (body) {
        debug(`Body:\r\n${JSON.stringify(body)}`);
    }
    debug(`Headers:\r\n${JSON.stringify(payload.headers)}`);
    const origResponse = yield (0, cross_fetch_1.fetch)(url, payload);
    const clonedResponse = origResponse.clone();
    const success = origResponse && origResponse.status >= 200 && origResponse.status < 400;
    const textResponseBody = yield clonedResponse.text();
    const isJSONResponse = (accept === 'application/json' || origResponse.headers['Content-Type'] === 'application/json') && textResponseBody.trim().startsWith('{');
    const responseBody = isJSONResponse ? JSON.parse(textResponseBody) : textResponseBody;
    if (success || (opts === null || opts === void 0 ? void 0 : opts.exceptionOnHttpErrorStatus)) {
        debug(`${success ? 'success' : 'error'} status: ${clonedResponse.status}, body:\r\n${JSON.stringify(responseBody)}`);
    }
    else {
        console.warn(`${success ? 'success' : 'error'} status: ${clonedResponse.status}, body:\r\n${JSON.stringify(responseBody)}`);
    }
    if (!success && (opts === null || opts === void 0 ? void 0 : opts.exceptionOnHttpErrorStatus)) {
        const error = JSON.stringify(responseBody);
        throw new Error(error === '{}' ? '{"error": "not found"}' : error);
    }
    debug(`END fetching url: ${url}`);
    return {
        origResponse,
        successBody: success ? responseBody : undefined,
        errorBody: !success ? responseBody : undefined,
    };
});
const getWithUrl = (url, textResponse) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    const response = yield (0, cross_fetch_1.fetch)(url);
    if (response.status >= 400) {
        return Promise.reject(Error(`${types_1.SIOPErrors.RESPONSE_STATUS_UNEXPECTED} ${response.status}:${response.statusText} URL: ${url}`));
    }
    if (textResponse === true) {
        return (yield response.text());
    }
    return yield response.json();
    /*} catch (e) {
      return Promise.reject(Error(`${(e as Error).message}`));
    }*/
});
exports.getWithUrl = getWithUrl;
const fetchByReferenceOrUseByValue = (referenceURI, valueObject, textResponse) => __awaiter(void 0, void 0, void 0, function* () {
    let response = valueObject;
    if (referenceURI) {
        try {
            response = yield (0, exports.getWithUrl)(referenceURI, textResponse);
        }
        catch (e) {
            console.log(e);
            throw new Error(`${types_1.SIOPErrors.REG_PASS_BY_REFERENCE_INCORRECTLY}: ${e.message}, URL: ${referenceURI}`);
        }
    }
    return response;
});
exports.fetchByReferenceOrUseByValue = fetchByReferenceOrUseByValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHR0cFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvSHR0cFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDZDQUFvQztBQUNwQyxrREFBMEI7QUFFMUIsb0NBQWdFO0FBRWhFLE1BQU0sS0FBSyxHQUFHLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFckMsTUFBTSxPQUFPLEdBQUcsQ0FDckIsR0FBVyxFQUNYLElBTUMsRUFDd0IsRUFBRTtJQUMzQixPQUFPLE1BQU0sU0FBUyxDQUFDLEdBQUcsRUFBRSxTQUFTLGtCQUFJLE1BQU0sRUFBRSxLQUFLLElBQUssSUFBSSxFQUFHLENBQUM7QUFDckUsQ0FBQyxDQUFBLENBQUM7QUFYVyxRQUFBLE9BQU8sV0FXbEI7QUFFSyxNQUFNLFFBQVEsR0FBRyxDQUN0QixHQUFXLEVBQ1gsSUFBYyxFQUNkLElBTUMsRUFDd0IsRUFBRTtJQUMzQixPQUFPLE1BQU0sSUFBQSxZQUFJLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxXQUFXLEVBQUMsQ0FBQyxtQkFBTSxJQUFJLEVBQUcsQ0FBQyxpQkFBRyxXQUFXLEVBQUUsbUJBQVcsQ0FBQyxnQkFBZ0IsSUFBSyxJQUFJLENBQUUsQ0FBQyxDQUFDO0FBQ3pILENBQUMsQ0FBQSxDQUFDO0FBWlcsUUFBQSxRQUFRLFlBWW5CO0FBRUssTUFBTSxJQUFJLEdBQUcsQ0FDbEIsR0FBVyxFQUNYLElBQWUsRUFDZixJQU1DLEVBQ3dCLEVBQUU7SUFDM0IsT0FBTyxNQUFNLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxrQkFBSSxNQUFNLEVBQUUsTUFBTSxJQUFLLElBQUksRUFBRyxDQUFDO0FBQ2pFLENBQUMsQ0FBQSxDQUFDO0FBWlcsUUFBQSxJQUFJLFFBWWY7QUFFRixNQUFNLFNBQVMsR0FBRyxDQUNoQixH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