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
exports.redis = void 0;
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const merge_1 = require("@graphql-tools/merge");
const load_files_1 = require("@graphql-tools/load-files");
const node_path_1 = require("node:path");
const cors_1 = __importDefault(require("cors"));
const formatError_1 = require("./config/formatError/formatError");
const dataSources_1 = require("./config/dataSource/dataSources");
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.redis = (0, redis_1.createClient)({ url: process.env.REDIS_URL });
const allTypes = (0, load_files_1.loadFilesSync)((0, node_path_1.join)(__dirname, "graphql", "**", "*.gql"));
const allResolvers = (0, load_files_1.loadFilesSync)((0, node_path_1.join)(__dirname, "graphql", "**", "resolvers.ts"));
const typeDefs = (0, merge_1.mergeTypeDefs)(allTypes);
const resolvers = (0, merge_1.mergeResolvers)(allResolvers);
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers, formatError: formatError_1.formatError, dataSources: dataSources_1.dataSources });
    yield server.start();
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded());
    app.use((0, cors_1.default)());
    //app.use(morgan("dev"));
    /* const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: "draft-8",
      legacyHeaders: false,
    });
    app.use(limiter); */
    server.applyMiddleware({ app });
    exports.redis
        .connect()
        .then(() => {
        console.log("Successfully connected to redis");
        app.listen({ port: 4000 }, () => {
            console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
        });
    })
        .catch((error) => {
        console.log(error);
    });
});
main();
