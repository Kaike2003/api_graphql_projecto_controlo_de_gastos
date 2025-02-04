export class UserNotFoundError extends Error {
  constructor(message: string) {
    super(message);

    this.message = message;
    this.name = "UserNotFoundError";
  }
}
