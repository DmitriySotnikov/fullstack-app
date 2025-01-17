import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IDomainJwtServicePayload } from 'src/domain/interfaces.ts/JWT.interfaces';
import { DomainJwtService } from 'src/domain/services/domainJWT.service';

@Injectable()
export class JwtTokenService implements DomainJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async checkToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token);
  }

  createToken(
    payload: IDomainJwtServicePayload,
    secret: string,
    expiresIn: string,
  ): string {
    return this.jwtService.sign(payload, {
      secret,
      expiresIn,
    });
  }
}
