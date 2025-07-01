"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64urlEncodeBuffer = exports.fromBase64 = exports.base64ToHexString = exports.encodeJsonAsURI = exports.decodeUriAsJson = void 0;
const qs_1 = require("qs");
const ua8 = __importStar(require("uint8arrays"));
const types_1 = require("../types");
function decodeUriAsJson(uri) {
    var _a, _b, _c;
    if (!uri) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    const queryString = uri.replace(/^([a-zA-Z][a-zA-Z0-9-_]*:\/\/.*[?])/, '');
    if (!queryString) {
        throw new Error(types_1.SIOPErrors.BAD_PARAMS);
    }
    const parts = (0, qs_1.parse)(queryString, { plainObjects: true, depth: 10, parameterLimit: 5000, ignoreQueryPrefix: true });
    const descriptors = (_c = (_b = (_a = parts === null || parts === void 0 ? void 0 : parts.claims) === null || _a === void 0 ? void 0 : _a['vp_token']) === null || _b === void 0 ? void 0 : _b.presentation_definition) === null || _c === void 0 ? void 0 : _c['input_descriptors'];
    if (descriptors && Array.isArray(descriptors)) {
        // Whenever we have a [{'uri': 'str1'}, 'uri': 'str2'] qs changes this to {uri: ['str1','str2']} which means schema validation fails. So we have to fix that
        parts.claims['vp_token'].presentation_definition['input_descriptors'] = descriptors.map((descriptor) => {
            if (Array.isArray(descriptor.schema)) {
                descriptor.schema = descriptor.schema.flatMap((val) => {
                    if (typeof val === 'string') {
                        return { uri: val };
                    }
                    else if (typeof val === 'object' && Array.isArray(val.uri)) {
                        return val.uri.map((uri) => ({ uri: uri }));
                    }
                    return val;
                });
            }
            return descriptor;
        });
    }
    const json = {};
    for (const key in parts) {
        const value = parts[key];
        if (!value) {
            continue;
        }
        const isBool = typeof value == 'boolean';
        const isNumber = typeof value == 'number';
        const isString = typeof value == 'string';
        if (isBool || isNumber) {
            json[decodeURIComponent(key)] = value;
        }
        else if (isString) {
            const decoded = decodeURIComponent(value);
            if (decoded.startsWith('{') && decoded.endsWith('}')) {
                json[decodeURIComponent(key)] = JSON.parse(decoded);
            }
            else {
                json[decodeURIComponent(key)] = decoded;
            }
        }
    }
    return JSON.parse(JSON.stringify(json));
}
exports.decodeUriAsJson = decodeUriAsJson;
function encodeJsonAsURI(json, _opts) {
    var _a;
    if (typeof json === 'string') {
        return encodeJsonAsURI(JSON.parse(json));
    }
    const results = [];
    function encodeAndStripWhitespace(key) {
        return encodeURIComponent(key.replace(' ', ''));
    }
    for (const [key, value] of Object.entries(json)) {
        if (!value) {
            continue;
        }
        const isBool = typeof value == 'boolean';
        const isNumber = typeof value == 'number';
        const isString = typeof value == 'string';
        const isArray = Array.isArray(value);
        let encoded;
        if (isBool || isNumber) {
            encoded = `${encodeAndStripWhitespace(key)}=${value}`;
        }
        else if (isString) {
            encoded = `${encodeAndStripWhitespace(key)}=${encodeURIComponent(value)}`;
        }
        else if (isArray && ((_a = _opts === null || _opts === void 0 ? void 0 : _opts.arraysWithIndex) === null || _a === void 0 ? void 0 : _a.includes(key))) {
            encoded = `${encodeAndStripWhitespace(key)}=${(0, qs_1.stringify)(value, { arrayFormat: 'brackets' })}`;
        }
        else {
            encoded = `${encodeAndStripWhitespace(key)}=${encodeURIComponent(JSON.stringify(value))}`;
        }
        results.push(encoded);
    }
    return results.join('&');
}
exports.encodeJsonAsURI = encodeJsonAsURI;
function base64ToHexString(input, encoding) {
    return ua8.toString(ua8.fromString(input, encoding !== null && encoding !== void 0 ? encoding : 'base64url'), 'base16');
}
exports.base64ToHexString = base64ToHexString;
function fromBase64(base64) {
    return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}
exports.fromBase64 = fromBase64;
function base64urlEncodeBuffer(buf) {
    return fromBase64(buf.toString('base64'));
}
exports.base64urlEncodeBuffer = base64urlEncodeBuffer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5jb2RpbmdzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2hlbHBlcnMvRW5jb2RpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsMkJBQXNDO0FBQ3RDLGlEQUFtQztBQUVuQyxvQ0FBc0M7QUFFdEMsU0FBZ0IsZUFBZSxDQUFDLEdBQVc7O0lBQ3pDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxxQ0FBcUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUMzRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxNQUFNLEtBQUssR0FBRyxJQUFBLFVBQUssRUFBQyxXQUFXLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRW5ILE1BQU0sV0FBVyxHQUFHLE1BQUEsTUFBQSxNQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxNQUFNLDBDQUFHLFVBQVUsQ0FBQywwQ0FBRSx1QkFBdUIsMENBQUcsbUJBQW1CLENBQUMsQ0FBQztJQUNoRyxJQUFJLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7UUFDOUMsNEpBQTRKO1FBQzVKLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMs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