import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthUseCasesProxyModule } from 'src/infrastructur/useCasesProxy/auth.usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructur/useCasesProxy/usecase-proxy';
import { LoginUseCases } from 'src/usecases/auth/login.usecase';
import { UserWithoutPassword } from 'src/domain/entites/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthUseCasesProxyModule.LOGIN_USER_USE_CASE_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword | { captchaId: string; svg: string } | Error> {
    if (!email || !password) {
      throw new Error('Email or password not provided');
    }
    const result = await this.loginUsecaseProxy
      .getInstance()
      .execute({ email, pass: password });

    return result;
  }
}
