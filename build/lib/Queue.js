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
const bull_1 = __importDefault(require("bull"));
const emailCreateAccount_1 = __importDefault(require("../jobs/mail/emailCreateAccount"));
const jobs = [emailCreateAccount_1.default.build()];
const queues = Object.values(jobs).map((job) => ({
    bull: new bull_1.default(job.getKey(), "redis://127.0.0.1:6379", {
        defaultJobOptions: {
            attempts: 5,
            backoff: {
                type: "exponential",
                delay: 5000,
            },
        },
    }),
    name: job.getKey(),
    handle: job.handle,
}));
class Queues {
    constructor() { }
    static create() {
        return new Queues();
    }
    add(name, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const queue = queues.find((queue) => queue.name === name);
            return queue === null || queue === void 0 ? void 0 : queue.bull.add(data);
        });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            return queues.forEach((queue) => {
                queue.bull.process((job) => queue.handle(job.data.data));
                queue.bull.on("completed", (job) => {
                    console.log(`Job ${job.id} concluído com sucesso!`);
                });
                queue.bull.on("progress", (job) => {
                    console.log(`Job ${job.id} em progresso!`, job.data);
                });
                queue.bull.on("failed", (job, err) => {
                    console.log("Job failed", queue.name, job.data);
                    console.log(err);
                });
            });
        });
    }
}
exports.default = Queues;
