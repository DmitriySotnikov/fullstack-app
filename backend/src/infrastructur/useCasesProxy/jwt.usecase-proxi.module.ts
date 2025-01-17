import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecase-proxy';
import { JWTUsecases } from 'src/usecases/JWT/JWT.usecases';
import { DomainJwtService } from 'src/domain/services/domainJWT.service';
import { JwtModule } from '../jwt/jwt.module';

@Module({
  imports: [JwtModule],
})
export class JWTUsecaseProxyModule {
  static JWT_USE_CASE_PROXY = 'JWTUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: JWTUsecaseProxyModule,
      providers: [
        {
          inject: [DomainJwtService],
          provide: JWTUsecaseProxyModule.JWT_USE_CASE_PROXY,
          useFactory: (domainJwtTokenService: DomainJwtService) =>
            new UseCaseProxy(new JWTUsecases(domainJwtTokenService)),
        },
      ],
      exports: [JWTUsecaseProxyModule.JWT_USE_CASE_PROXY],
    };
  }
}
