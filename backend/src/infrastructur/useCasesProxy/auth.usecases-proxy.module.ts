import { UseCaseProxy } from './usecase-proxy';
import { DynamicModule, Module } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { UserRepository } from '../orms/repositories/user.repository';
import { CaptchaRepository } from '../orms/repositories/captcha.repository';
import { CreateUserUseCase } from 'src/usecases/user/createUser.usecase';
import { RepositoriesModule } from '../orms/repositories/repositories.module';
import { LoginUseCases } from 'src/usecases/auth/login.usecase';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { CaptchaServiceModule } from '../capcha/captchaService.module';
import { GetUserByEmailUseCase } from 'src/usecases/user/getUserByEmail.usecase';

@Module({
  imports: [RepositoriesModule, BcryptModule, CaptchaServiceModule],
})
export class AuthUseCasesProxyModule {
  static CREATE_USER_USE_CASE_PROXY = 'CreateUserUseCaseProxy';
  static LOGIN_USER_USE_CASE_PROXY = 'LoginUserUseCaseProxy';
  static GET_USER_BY_EMAIL_USE_CASE_PROXY = 'GetUserByEmailUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: AuthUseCasesProxyModule,
      providers: [
        {
          inject: [
            UserRepository,
            CaptchaRepository,
            UserMapper,
            BcryptService,
          ],
          provide: AuthUseCasesProxyModule.CREATE_USER_USE_CASE_PROXY,
          useFactory: (
            userRepository: UserRepository,
            captchaRepository: CaptchaRepository,
            userMapper: UserMapper,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new CreateUserUseCase(
                userRepository,
                captchaRepository,
                userMapper,
                bcryptService,
              ),
            ),
        },
        {
          inject: [UserRepository, BcryptService],
          provide: AuthUseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY,
          useFactory: (
            userRepository: UserRepository,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(new LoginUseCases(userRepository, bcryptService)),
        },
        {
          inject: [UserRepository, UserMapper],
          provide: AuthUseCasesProxyModule.GET_USER_BY_EMAIL_USE_CASE_PROXY,
          useFactory: (userRepository: UserRepository, userMapper: UserMapper) =>
            new UseCaseProxy(new GetUserByEmailUseCase(userRepository, userMapper)),
        },
      ],
      exports: [
        AuthUseCasesProxyModule.CREATE_USER_USE_CASE_PROXY,
        AuthUseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY,
        AuthUseCasesProxyModule.GET_USER_BY_EMAIL_USE_CASE_PROXY,
      ],
    };
  }
}
