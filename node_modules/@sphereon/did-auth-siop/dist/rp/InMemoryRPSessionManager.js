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
exports.InMemoryRPSessionManager = void 0;
const types_1 = require("../types");
/**
 * Please note that this session manager is not really meant to be used in large production settings, as it stores everything in memory!
 * It also doesn't do scheduled cleanups. It runs a cleanup whenever a request or response is received. In a high-volume production setting you will want scheduled cleanups running in the background
 * Since this is a low level library we have not created a full-fledged implementation.
 * We suggest to create your own implementation using the event system of the library
 */
class InMemoryRPSessionManager {
    static getKeysForCorrelationId(mapping, correlationId) {
        return Object.entries(mapping)
            .filter((entry) => entry[1] === correlationId)
            .map((filtered) => Number.parseInt(filtered[0]));
    }
    constructor(eventEmitter, opts) {
        var _a;
        this.authorizationRequests = {};
        this.authorizationResponses = {};
        // stored by hashcode
        this.nonceMapping = {};
        // stored by hashcode
        this.stateMapping = {};
        if (!eventEmitter) {
            throw Error('RP Session manager depends on an event emitter in the application');
        }
        this.maxAgeInSeconds = (_a = opts === null || opts === void 0 ? void 0 : opts.maxAgeInSeconds) !== null && _a !== void 0 ? _a : 5 * 60;
        eventEmitter.on(types_1.AuthorizationEvents.ON_AUTH_REQUEST_CREATED_SUCCESS, this.onAuthorizationRequestCreatedSuccess.bind(this));
        eventEmitter.on(types_1.AuthorizationEvents.ON_AUTH_REQUEST_CREATED_FAILED, this.onAuthorizationRequestCreatedFailed.bind(this));
        eventEmitter.on(types_1.AuthorizationEvents.ON_AUTH_REQUEST_SENT_SUCCESS, this.onAuthorizationRequestSentSuccess.bind(this));
        eventEmitter.on(types_1.AuthorizationEvents.ON_AUTH_REQUEST_SENT_FAILED, this.onAuthorizationRequestSentFailed.bind(this));
        eventEmitter.on(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_RECEIVED_SUCCESS, this.onAuthorizationResponseReceivedSuccess.bind(this));
        eventEmitter.on(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_RECEIVED_FAILED, this.onAuthorizationResponseReceivedFailed.bind(this));
        eventEmitter.on(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_VERIFIED_SUCCESS, this.onAuthorizationResponseVerifiedSuccess.bind(this));
        eventEmitter.on(types_1.AuthorizationEvents.ON_AUTH_RESPONSE_VERIFIED_FAILED, this.onAuthorizationResponseVerifiedFailed.bind(this));
    }
    getRequestStateByCorrelationId(correlationId, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getFromMapping('correlationId', correlationId, this.authorizationRequests, errorOnNotFound);
        });
    }
    getRequestStateByNonce(nonce, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getFromMapping('nonce', nonce, this.authorizationRequests, errorOnNotFound);
        });
    }
    getRequestStateByState(state, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getFromMapping('state', state, this.authorizationRequests, errorOnNotFound);
        });
    }
    getResponseStateByCorrelationId(correlationId, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getFromMapping('correlationId', correlationId, this.authorizationResponses, errorOnNotFound);
        });
    }
    getResponseStateByNonce(nonce, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getFromMapping('nonce', nonce, this.authorizationResponses, errorOnNotFound);
        });
    }
    getResponseStateByState(state, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getFromMapping('state', state, this.authorizationResponses, errorOnNotFound);
        });
    }
    getFromMapping(type, value, mapping, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            const correlationId = yield this.getCorrelationIdImpl(type, value, errorOnNotFound);
            const result = mapping[correlationId];
            if (!result && errorOnNotFound) {
                throw Error(`Could not find ${type} from correlation id ${correlationId}`);
            }
            return result;
        });
    }
    onAuthorizationRequestCreatedSuccess(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cleanup().catch((error) => console.log(JSON.stringify(error)));
            this.updateState('request', event, types_1.AuthorizationRequestStateStatus.CREATED).catch((error) => console.log(JSON.stringify(error)));
        });
    }
    onAuthorizationRequestCreatedFailed(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cleanup().catch((error) => console.log(JSON.stringify(error)));
            this.updateState('request', event, types_1.AuthorizationRequestStateStatus.ERROR).catch((error) => console.log(JSON.stringify(error)));
        });
    }
    onAuthorizationRequestSentSuccess(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cleanup().catch((error) => console.log(JSON.stringify(error)));
            this.updateState('request', event, types_1.AuthorizationRequestStateStatus.SENT).catch((error) => console.log(JSON.stringify(error)));
        });
    }
    onAuthorizationRequestSentFailed(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cleanup().catch((error) => console.log(JSON.stringify(error)));
            this.updateState('request', event, types_1.AuthorizationRequestStateStatus.ERROR).catch((error) => console.log(JSON.stringify(error)));
        });
    }
    onAuthorizationResponseReceivedSuccess(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cleanup().catch((error) => console.log(JSON.stringify(error)));
            yield this.updateState('response', event, types_1.AuthorizationResponseStateStatus.RECEIVED);
        });
    }
    onAuthorizationResponseReceivedFailed(event) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cleanup().catch((error) => console.log(JSON.stringify(error)));
            yield this.updateState('response', event, types_1.AuthorizationResponseStateStatus.ERROR);
        });
    }
    onAuthorizationResponseVerifiedFailed(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateState('response', event, types_1.AuthorizationResponseStateStatus.ERROR);
        });
    }
    onAuthorizationResponseVerifiedSuccess(event) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.updateState('response', event, types_1.AuthorizationResponseStateStatus.VERIFIED);
        });
    }
    getCorrelationIdByNonce(nonce, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getCorrelationIdImpl('nonce', nonce, errorOnNotFound);
        });
    }
    getCorrelationIdByState(state, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getCorrelationIdImpl('state', state, errorOnNotFound);
        });
    }
    getCorrelationIdImpl(type, value, errorOnNotFound) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!value || !type) {
                throw Error('No type or value provided');
            }
            if (type === 'correlationId') {
                return value;
            }
            const hash = yield hashCode(value);
            const correlationId = type === 'nonce' ? this.nonceMapping[hash] : this.stateMapping[hash];
            if (!correlationId && errorOnNotFound) {
                throw Error(`Could not find ${type} value for ${value}`);
            }
            return correlationId;
        });
    }
    updateMapping(mapping, event, key, value, allowExisting) {
        return __awaiter(this, void 0, void 0, function* () {
            const hash = yield hashcodeForValue(event, key);
            const existing = mapping[hash];
            if (existing) {
                if (!allowExisting) {
                    throw Error(`Mapping exists for key ${key} and we do not allow overwriting values`);
                }
                else if (value && existing !== value) {
                    throw Error('Value changed for key');
                }
            }
            if (!value) {
                delete mapping[hash];
            }
            else {
                mapping[hash] = value;
            }
        });
    }
    updateState(type, event, status) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!event) {
                throw new Error('event not present');
            }
            else if (!event.correlationId) {
                throw new Error(`'${type} ${status}' event without correlation id received`);
            }
            try {
                const eventState = Object.assign(Object.assign(Object.assign(Object.assign({ correlationId: event.correlationId }, (type === 'request' ? { request: event.subject } : {})), (type === 'response' ? { response: event.subject } : {})), (event.error ? { error: event.error } : {})), { status, timestamp: event.timestamp, lastUpdated: event.timestamp });
                if (type === 'request') {
                    this.authorizationRequests[event.correlationId] = eventState;
                    // We do not await these
                    this.updateMapping(this.nonceMapping, event, 'nonce', event.correlationId, true).catch((error) => console.log(JSON.stringify(error)));
                    this.updateMapping(this.stateMapping, event, 'state', event.correlationId, true).catch((error) => console.log(JSON.stringify(error)));
                }
                else {
                    this.authorizationResponses[event.correlationId] = eventState;
                }
            }
            catch (error) {
                console.log(`Error in update state happened: ${error}`);
                // TODO VDX-166 handle error
            }
        });
    }
    deleteStateForCorrelationId(correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            InMemoryRPSessionManager.cleanMappingForCorrelationId(this.nonceMapping, correlationId).catch((error) => console.log(JSON.stringify(error)));
            InMemoryRPSessionManager.cleanMappingForCorrelationId(this.stateMapping, correlationId).catch((error) => console.log(JSON.stringify(error)));
            delete this.authorizationRequests[correlationId];
            delete this.authorizationResponses[correlationId];
        });
    }
    static cleanMappingForCorrelationId(mapping, correlationId) {
        return __awaiter(this, void 0, void 0, function* () {
            const keys = InMemoryRPSessionManager.getKeysForCorrelationId(mapping, correlationId);
            if (keys && keys.length > 0) {
                keys.forEach((key) => delete mapping[key]);
            }
        });
    }
    cleanup() {
        return __awaiter(this, void 0, void 0, function* () {
            const now = Date.now();
            const maxAgeInMS = this.maxAgeInSeconds * 1000;
            const cleanupCorrelations = (reqByCorrelationId) => {
                const correlationId = reqByCorrelationId[0];
                const authRequest = reqByCorrelationId[1];
                if (authRequest) {
                    const ts = authRequest.lastUpdated || authRequest.timestamp;
                    if (maxAgeInMS !== 0 && now > ts + maxAgeInMS) {
                        this.deleteStateForCorrelationId(correlationId);
                    }
                }
            };
            Object.entries(this.authorizationRequests).forEach((reqByCorrelationId) => {
                cleanupCorrelations.call(this, reqByCorrelationId);
            });
            Object.entries(this.authorizationResponses).forEach((resByCorrelationId) => {
                cleanupCorrelations.call(this, resByCorrelationId);
            });
        });
    }
}
exports.InMemoryRPSessionManager = InMemoryRPSessionManager;
function hashcodeForValue(event, key) {
    return __awaiter(this, void 0, void 0, function* () {
        const value = (yield event.subject.getMergedProperty(key));
        if (!value) {
            throw Error(`No value found for key ${key} in Authorization Request`);
        }
        return hashCode(value);
    });
}
function hashCode(s) {
    let h = 1;
    for (let i = 0; i < s.length; i++)
        h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
    return h;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5NZW1vcnlSUFNlc3Npb25NYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JwL0luTWVtb3J5UlBTZXNzaW9uTWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFJQSxvQ0FPa0I7QUFJbEI7Ozs7O0dBS0c7QUFDSCxNQUFhLHdCQUF3QjtJQVUzQixNQUFNLENBQUMsdUJBQXVCLENBQUMsT0FBK0IsRUFBRSxhQUFxQjtRQUMzRixPQUFPLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO2FBQzNCLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLGFBQWEsQ0FBQzthQUM3QyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsWUFBbUIsWUFBMEIsRUFBRSxJQUFtQzs7UUFmakUsMEJBQXFCLEdBQThDLEVBQUUsQ0FBQztRQUN0RSwyQkFBc0IsR0FBK0MsRUFBRSxDQUFDO1FBRXpGLHFCQUFxQjtRQUNKLGlCQUFZLEdBQTJCLEVBQUUsQ0FBQztRQUMzRCxxQkFBcUI7UUFDSixpQkFBWSxHQUEyQixFQUFFLENBQUM7UUFVekQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ2xCLE1BQU0sS0FBSyxDQUFDLG1FQUFtRSxDQUFDLENBQUM7UUFDbkYsQ0FBQztRQUNELElBQUksQ0FBQyxlQUFlLEdBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsZUFBZSxtQ0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3ZELFlBQVksQ0FBQyxFQUFFLENBQUMsMkJBQW1CLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLG9DQUFvQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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