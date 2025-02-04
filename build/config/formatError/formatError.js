"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatError = void 0;
const UserNotFoundError_1 = require("../../errors/UserNotFoundError");
const formatError = (error) => {
    if (error.originalError instanceof UserNotFoundError_1.UserNotFoundError) {
        return new Error(error.message);
    }
    return {
        message: error.message,
        path: error.path,
        //extensions: error.extensions,
    };
};
exports.formatError = formatError;
