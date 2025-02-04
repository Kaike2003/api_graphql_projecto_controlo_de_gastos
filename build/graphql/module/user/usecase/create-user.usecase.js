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
const client_1 = require("@prisma/client");
const apollo_datasource_1 = require("apollo-datasource");
const UserNotFoundError_1 = require("../../../../errors/UserNotFoundError");
const Queue_1 = __importDefault(require("../../../../lib/Queue"));
const shortid_1 = __importDefault(require("shortid"));
class CreateUserUseCase extends apollo_datasource_1.DataSource {
    constructor(prisma) {
        super();
        this.prisma = prisma;
    }
    static create(prisma) {
        return new CreateUserUseCase(prisma);
    }
    execute(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const code = shortid_1.default.generate();
                const data = {
                    name: input.data.name,
                    email: input.data.email,
                    password: input.data.password,
                    typeUser: client_1.TypeUser.CLIENT,
                    code,
                };
                const existedEmail = yield this.prisma.user.findUnique({ where: { email: data.email } });
                if (existedEmail) {
                    throw new UserNotFoundError_1.UserNotFoundError("There is already a user with that email.");
                }
                yield this.prisma.user.create({ data });
                yield Queue_1.default.create().add("EmailCreateAccount", {
                    data: {
                        user: {
                            email: data.email,
                            name: data.name,
                            code,
                        },
                    },
                });
                return { message: "Account created successfully" };
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
}
exports.default = CreateUserUseCase;
