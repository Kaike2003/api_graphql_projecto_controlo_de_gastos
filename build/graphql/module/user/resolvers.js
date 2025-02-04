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
exports.resolvers = void 0;
exports.resolvers = {
    Query: {
        users: () => __awaiter(void 0, void 0, void 0, function* () {
            return "Olá mundo";
        }),
    },
    Mutation: {
        createUser: (obj_1, _a, _b) => __awaiter(void 0, [obj_1, _a, _b], void 0, function* (obj, { data }, { dataSources }) {
            const output = yield dataSources.createUseCase.execute({ data });
            return output.message;
        }),
    },
};
