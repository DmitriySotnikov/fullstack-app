import { Injectable } from '@nestjs/common';
import { jwtConfig } from 'src/config/JWT.config';
import { IDomainJwtServicePayload } from 'src/domain/interfaces.ts/JWT.interfaces';
import { DomainJwtService } from 'src/domain/services/domainJWT.service';

@Injectable()
export class JWTUsecases {
  constructor(private readonly domainJwtTokenService: DomainJwtService) {}

  async getToken({
    firstname,
    lastname,
    email,
    expiresIn,
  }: {
    firstname: string;
    lastname: string;
    email: string;
    expiresIn: string;
  }) {
    const payload: IDomainJwtServicePayload = { firstname, lastname, email };
    const secret = jwtConfig.SECRET;
    return this.domainJwtTokenService.createToken(payload, secret, expiresIn);
  }
}
