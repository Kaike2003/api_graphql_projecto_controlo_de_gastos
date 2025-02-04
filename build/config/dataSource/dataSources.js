"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSources = void 0;
const prisma_1 = require("../../db/prisma/prisma");
const create_user_usecase_1 = __importDefault(require("../../graphql/module/user/usecase/create-user.usecase"));
const dataSources = () => ({
    createUseCase: create_user_usecase_1.default.create(prisma_1.prisma),
});
exports.dataSources = dataSources;
