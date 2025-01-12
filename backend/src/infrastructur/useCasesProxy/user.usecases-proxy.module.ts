import { UseCaseProxy } from './usecase-proxy';
import { DynamicModule, Module } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { UserRepository } from '../orms/repositories/user.repository';
import { CaptchaRepository } from '../orms/repositories/captcha.repository';
import { CreateUserUseCase } from 'src/usecases/user/createUser.usecase';
import { RepositoriesModule } from '../orms/repositories/repositories.module';
import { LoginUserUseCase } from 'src/usecases/user/loginUser.usecase';
import { CaptchaService } from '../capcha/capcha.service';
import { BcryptModule } from '../bcrypt/bcrypt.module';
import { CaptchaServiceModule } from '../capcha/captchaService.module';

@Module({
  imports: [RepositoriesModule, BcryptModule, CaptchaServiceModule],
})
export class UserUseCasesProxyModule {
  static CREATE_USER_USE_CASE_PROXY = 'CreateUserUseCaseProxy';
  static LOGIN_USER_USE_CASE_PROXY = 'LoginUserUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: UserUseCasesProxyModule,
      providers: [
        {
          inject: [
            UserRepository,
            CaptchaRepository,
            UserMapper,
            BcryptService,
          ],
          provide: UserUseCasesProxyModule.CREATE_USER_USE_CASE_PROXY,
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
          inject: [
            UserRepository,
            CaptchaRepository,
            CaptchaService,
            BcryptService,
          ],
          provide: UserUseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY,
          useFactory: (
            userRepository: UserRepository,
            captchaRepository: CaptchaRepository,
            captchaService: CaptchaService,
            bcryptService: BcryptService,
          ) =>
            new UseCaseProxy(
              new LoginUserUseCase(
                userRepository,
                captchaRepository,
                captchaService,
                bcryptService,
              ),
            ),
        },
      ],
      exports: [
        UserUseCasesProxyModule.CREATE_USER_USE_CASE_PROXY,
        UserUseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY,
      ],
    };
  }
}
