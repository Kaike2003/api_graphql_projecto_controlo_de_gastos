export interface GatewayUser {
  create(data: { name: string; email: string; password: string }): Promise<string>;
}
