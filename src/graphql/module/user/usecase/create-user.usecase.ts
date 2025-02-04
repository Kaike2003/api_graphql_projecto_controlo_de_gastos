import { PrismaClient, TypeUser } from "@prisma/client";
import { UseCase } from "../../../../utils/usecase/usecase";
import { DataSource } from "apollo-datasource";
import { UserNotFoundError } from "../../../../errors/UserNotFoundError";
import Queues from "../../../../lib/Queue";
import { IEmailCreateAccount } from "../../../../utils/queue/mail/mail";
import shortid from "shortid";

export type CreateUserInputDto = {
  data: {
    name: string;
    email: string;
    password: string;
  };
};

export type CreateUserOutputDto = {
  message: string;
};

export default class CreateUserUseCase extends DataSource implements UseCase<CreateUserInputDto, CreateUserOutputDto> {
  private constructor(private readonly prisma: PrismaClient) {
    super();
  }

  public static create(prisma: PrismaClient) {
    return new CreateUserUseCase(prisma);
  }

  public async execute(input: CreateUserInputDto): Promise<CreateUserOutputDto> {
    try {
      const code = shortid.generate();
      const data = {
        name: input.data.name,
        email: input.data.email,
        password: input.data.password,
        typeUser: TypeUser.CLIENT,
        code,
      };

      const existedEmail = await this.prisma.user.findUnique({ where: { email: data.email } });

      if (existedEmail) {
        throw new UserNotFoundError("There is already a user with that email.");
      }

      await this.prisma.user.create({ data });

      await Queues.create().add<IEmailCreateAccount>("EmailCreateAccount", {
        data: {
          user: {
            email: data.email,
            name: data.name,
            code,
          },
        },
      });

      return { message: "Account created successfully" };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
