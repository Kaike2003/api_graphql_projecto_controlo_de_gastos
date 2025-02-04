"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
class UserNotFoundError extends Error {
    constructor(message) {
        super(message);
        this.message = message;
        this.name = "UserNotFoundError";
    }
}
exports.UserNotFoundError = UserNotFoundError;
