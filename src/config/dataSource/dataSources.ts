import { prisma } from "../../db/prisma/prisma";
import {
  AuthenticateByCodeUser,
  AuthenticateByCodeUserInputDto,
  AuthenticateByCodeUserOutputDto,
} from "../../graphql/module/user/usecase/authenticate-by-code-user.usecase";
import CreateUserUseCase, {
  CreateUserInputDto,
  CreateUserOutputDto,
} from "../../graphql/module/user/usecase/create-user.usecase";
import { UseCase } from "../../utils/usecase/usecase";

export interface IDataSources {
  dataSources: {
    createUseCase: UseCase<CreateUserInputDto, CreateUserOutputDto>;
    authenticateByCodeUserUseCase: UseCase<AuthenticateByCodeUserInputDto, AuthenticateByCodeUserOutputDto>;
  };
}

export const dataSources = () => ({
  createUseCase: CreateUserUseCase.create(prisma),
  authenticateByCodeUserUseCase: AuthenticateByCodeUser.create(prisma),
});
