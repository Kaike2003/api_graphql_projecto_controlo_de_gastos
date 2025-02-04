import Mail from "../../lib/Mail";
import { IEmailCreateAccount } from "../../utils/queue/mail/mail";

export default class EmailCreateAccount {
  private constructor() {}

  private key: string = "EmailCreateAccount";

  public static build() {
    return new EmailCreateAccount();
  }

  public async handle(data: IEmailCreateAccount) {
    const {
      user: { name, email, code },
    } = data;

    try {
      const success = await Mail.sendMail({
        from: `Kaike Bartolomeu para ${email}`,
        to: `${email}`,
        subject: "Cadastro de usuário",
        html: `Olá <strong>${name}</strong>, bem-vindo ao NetEase! Estamos felizes por tê-lo conosco. Seu código de autenticação para ativar sua conta é: <strong>${code}</strong>. Com o NetEase, você pode O **NetEase** é um projeto inovador desenvolvido para atender às demandas de conexão de internet de maneira simplificada e eficiente, voltado tanto para indivíduos quanto para empresas. Com uma abordagem centrada no usuário, o NetEase tem como foco transformar a experiência de conexão, promovendo praticidade, acessibilidade e inclusão digital. Aproveite todos os recursos e, caso tenha dúvidas, estamos à disposição para ajudar!`,
      });

      console.log(`E-mail enviado com sucesso! ID: ${success.messageId}`);
    } catch (error: any) {
      console.error("Erro ao enviar e-mail:", error.message);
      throw new Error(`Falha ao enviar e-mail para ${email}: ${error.message}`);
    }
  }

  public getKey(): string {
    return this.key;
  }
}
