export abstract class DomainBcryptService {
  abstract hash({ password }: { password: string }): Promise<string>;
  abstract compare({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean>;
}
