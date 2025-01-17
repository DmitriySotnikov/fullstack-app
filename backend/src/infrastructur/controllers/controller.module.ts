import { Module } from '@nestjs/common';
import { AuthUseCasesProxyModule } from '../useCasesProxy/auth.usecases-proxy.module';
import { AuthController } from './auth.controller';
import { CaptchaUsecaseProxyModule } from '../useCasesProxy/captcha.usecases-proxy.module';
import { CaptchaController } from './captcha.controller';
import { JWTUsecaseProxyModule } from '../useCasesProxy/jwt.usecase-proxi.module';

@Module({
  imports: [
    CaptchaUsecaseProxyModule.register(),
    AuthUseCasesProxyModule.register(),
    JWTUsecaseProxyModule.register(),
  ],
  providers: [],
  controllers: [AuthController, CaptchaController],
})
export class ControllersModule {}
