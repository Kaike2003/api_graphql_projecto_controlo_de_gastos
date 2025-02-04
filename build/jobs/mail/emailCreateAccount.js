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
const Mail_1 = __importDefault(require("../../lib/Mail"));
class EmailCreateAccount {
    constructor() {
        this.key = "EmailCreateAccount";
    }
    static build() {
        return new EmailCreateAccount();
    }
    handle(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user: { name, email, code }, } = data;
            try {
                const success = yield Mail_1.default.sendMail({
                    from: `Kaike Bartolomeu para ${email}`,
                    to: `${email}`,
                    subject: "Cadastro de usuário",
                    html: `Olá <strong>${name}</strong>, bem-vindo ao NetEase! Estamos felizes por tê-lo conosco. Seu código de autenticação para ativar sua conta é: <strong>${code}</strong>. Com o NetEase, você pode O **NetEase** é um projeto inovador desenvolvido para atender às demandas de conexão de internet de maneira simplificada e eficiente, voltado tanto para indivíduos quanto para empresas. Com uma abordagem centrada no usuário, o NetEase tem como foco transformar a experiência de conexão, promovendo praticidade, acessibilidade e inclusão digital. Aproveite todos os recursos e, caso tenha dúvidas, estamos à disposição para ajudar!`,
                });
                console.log(`E-mail enviado com sucesso! ID: ${success.messageId}`);
            }
            catch (error) {
                console.error("Erro ao enviar e-mail:", error.message);
                throw new Error(`Falha ao enviar e-mail para ${email}: ${error.message}`);
            }
        });
    }
    getKey() {
        return this.key;
    }
}
exports.default = EmailCreateAccount;
