import { IContextWithDataSources } from "../../../config";
import { InputAuthenticateByCodeUser, InputCreateUser } from "../../../utils/gateway/user/user";
import { AuthenticateByCodeUserOutputDto } from "./usecase/authenticate-by-code-user.usecase";
import { CreateUserOutputDto } from "./usecase/create-user.usecase";

export const resolvers = {
  Query: {
    users: async (): Promise<string> => {
      return "Olá mundo";
    },
  },
  Mutation: {
    createUser: async (obj: any, { data }: InputCreateUser, { dataSources }: IContextWithDataSources) => {
      const output: CreateUserOutputDto = await dataSources.createUseCase.execute({ data });
      return output.message;
    },
    authenticateByCodeUser: async (
      obj: any,
      { data }: InputAuthenticateByCodeUser,
      { dataSources }: IContextWithDataSources
    ) => {
      const output: AuthenticateByCodeUserOutputDto = await dataSources.authenticateByCodeUserUseCase.execute({ data });
      return output.message;
    },
  },
};
