import { UserNotFoundError } from "../../errors/UserNotFoundError";

export const formatError = (error: any) => {
  if (error.originalError instanceof UserNotFoundError) {
    return new Error(error.message);
  }

  return {
    message: error.message,
    path: error.path,
    //extensions: error.extensions,
  };
};
