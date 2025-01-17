import { Module } from '@nestjs/common';
import { JwtModule as Jwt } from '@nestjs/jwt';
import { JwtTokenService } from './jwt.service';
import { DomainJwtService } from 'src/domain/services/domainJWT.service';

@Module({
  imports: [
    Jwt.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [
    {
      provide: DomainJwtService,
      useClass: JwtTokenService,
    },
    JwtTokenService,
  ],
  exports: [DomainJwtService, JwtTokenService],
})
export class JwtModule {}
