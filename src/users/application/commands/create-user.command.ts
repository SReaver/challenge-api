export class CreateUserCommand {
  constructor(
    public readonly email: string,
    public readonly nickName: string,
    public readonly displayName: string,
    public readonly hash: string,
    public readonly salt: string,
  ) {}
}
