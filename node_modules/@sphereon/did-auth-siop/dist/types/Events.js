"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationEvent = exports.AuthorizationEvents = void 0;
var AuthorizationEvents;
(function (AuthorizationEvents) {
    AuthorizationEvents["ON_AUTH_REQUEST_CREATED_SUCCESS"] = "onAuthRequestCreatedSuccess";
    AuthorizationEvents["ON_AUTH_REQUEST_CREATED_FAILED"] = "onAuthRequestCreatedFailed";
    AuthorizationEvents["ON_AUTH_REQUEST_SENT_SUCCESS"] = "onAuthRequestSentSuccess";
    AuthorizationEvents["ON_AUTH_REQUEST_SENT_FAILED"] = "onAuthRequestSentFailed";
    AuthorizationEvents["ON_AUTH_REQUEST_RECEIVED_SUCCESS"] = "onAuthRequestReceivedSuccess";
    AuthorizationEvents["ON_AUTH_REQUEST_RECEIVED_FAILED"] = "onAuthRequestReceivedFailed";
    AuthorizationEvents["ON_AUTH_REQUEST_VERIFIED_SUCCESS"] = "onAuthRequestVerifiedSuccess";
    AuthorizationEvents["ON_AUTH_REQUEST_VERIFIED_FAILED"] = "onAuthRequestVerifiedFailed";
    AuthorizationEvents["ON_AUTH_RESPONSE_CREATE_SUCCESS"] = "onAuthResponseCreateSuccess";
    AuthorizationEvents["ON_AUTH_RESPONSE_CREATE_FAILED"] = "onAuthResponseCreateFailed";
    AuthorizationEvents["ON_AUTH_RESPONSE_SENT_SUCCESS"] = "onAuthResponseSentSuccess";
    AuthorizationEvents["ON_AUTH_RESPONSE_SENT_FAILED"] = "onAuthResponseSentFailed";
    AuthorizationEvents["ON_AUTH_RESPONSE_RECEIVED_SUCCESS"] = "onAuthResponseReceivedSuccess";
    AuthorizationEvents["ON_AUTH_RESPONSE_RECEIVED_FAILED"] = "onAuthResponseReceivedFailed";
    AuthorizationEvents["ON_AUTH_RESPONSE_VERIFIED_SUCCESS"] = "onAuthResponseVerifiedSuccess";
    AuthorizationEvents["ON_AUTH_RESPONSE_VERIFIED_FAILED"] = "onAuthResponseVerifiedFailed";
})(AuthorizationEvents || (exports.AuthorizationEvents = AuthorizationEvents = {}));
class AuthorizationEvent {
    constructor(args) {
        //fixme: Create correlationId if not provided. Might need to be deferred to registry though
        this._correlationId = args.correlationId;
        this._timestamp = Date.now();
        this._subject = args.subject;
        this._error = args.error;
    }
    get subject() {
        return this._subject;
    }
    get timestamp() {
        return this._timestamp;
    }
    get error() {
        return this._error;
    }
    hasError() {
        return !!this._error;
    }
    get correlationId() {
        return this._correlationId;
    }
}
exports.AuthorizationEvent = AuthorizationEvent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3R5cGVzL0V2ZW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFZLG1CQXdCWDtBQXhCRCxXQUFZLG1CQUFtQjtJQUM3QixzRkFBK0QsQ0FBQTtJQUMvRCxvRkFBNkQsQ0FBQTtJQUU3RCxnRkFBeUQsQ0FBQTtJQUN6RCw4RUFBdUQsQ0FBQTtJQUV2RCx3RkFBaUUsQ0FBQTtJQUNqRSxzRkFBK0QsQ0FBQTtJQUUvRCx3RkFBaUUsQ0FBQTtJQUNqRSxzRkFBK0QsQ0FBQTtJQUUvRCxzRkFBK0QsQ0FBQTtJQUMvRCxvRkFBNkQsQ0FBQTtJQUU3RCxrRkFBMkQsQ0FBQTtJQUMzRCxnRkFBeUQsQ0FBQTtJQUV6RCwwRkFBbUUsQ0FBQTtJQUNuRSx3RkFBaUUsQ0FBQTtJQUVqRSwwRkFBbUUsQ0FBQTtJQUNuRSx3RkFBaUUsQ0FBQTtBQUNuRSxDQUFDLEVBeEJXLG1CQUFtQixtQ0FBbkIsbUJBQW1CLFFBd0I5QjtBQUVELE1BQWEsa0JBQWtCO0lBTTdCLFlBQW1CLElBQTJEO1FBQzVFLDJGQUEyRjtRQUMzRixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxJQUFJLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDekIsQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksYUFBYTtRQUNmLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM3QixDQUFDO0NBQ0Y7QUFqQ0QsZ0RBaUNDIn0=