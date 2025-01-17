import { Injectable } from '@nestjs/common';
import { DomainBcryptService } from 'src/domain/services/domainBcrypt.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements DomainBcryptService {
  private readonly saltRounds = 10;

  async compare({
    password,
    hash,
  }: {
    password: string;
    hash: string;
  }): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async hash({ password }: { password: string }): Promise<string> {
    return await bcrypt.hash(password, this.saltRounds);
  }
}
