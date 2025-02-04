import { DataSource } from "apollo-datasource";
import { UseCase } from "../../../../utils/usecase/usecase";
import { PrismaClient } from "@prisma/client";
import { UserNotFoundError } from "../../../../errors/UserNotFoundError";

export type AuthenticateByCodeUserInputDto = {
  data: {
    code: string;
  };
};

export type AuthenticateByCodeUserOutputDto = {
  message: string;
};

export class AuthenticateByCodeUser
  extends DataSource
  implements UseCase<AuthenticateByCodeUserInputDto, AuthenticateByCodeUserOutputDto>
{
  private constructor(private readonly prisma: PrismaClient) {
    super();
  }

  public static create(prisma: PrismaClient) {
    return new AuthenticateByCodeUser(prisma);
  }

  public async execute(input: AuthenticateByCodeUserInputDto): Promise<AuthenticateByCodeUserOutputDto> {
    try {
      const {
        data: { code },
      } = input;

      const existedUser = await this.prisma.user.findUnique({ where: { code } });

      if (existedUser?.code !== code) {
        throw new UserNotFoundError("User not found");
      }

      if (existedUser?.authenticated === true) {
        throw new Error("Account already authenticated");
      }

      await this.prisma.user.update({
        where: {
          code,
        },
        data: {
          authenticated: true,
        },
      });

      return { message: "Account authenticated successfully." };
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
