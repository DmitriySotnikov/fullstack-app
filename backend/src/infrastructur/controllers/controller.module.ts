import { Module } from '@nestjs/common';
import { UserUseCasesProxyModule } from '../useCasesProxy/user.usecases-proxy.module';
import { UserController } from './user.controller';
import { CaptchaUsecaseProxyModule } from '../useCasesProxy/captcha.usecases-proxy.module';
import { CaptchaController } from './captcha.controller';

@Module({
  imports: [
    CaptchaUsecaseProxyModule.register(),
    UserUseCasesProxyModule.register(),
  ],
  providers: [],
  controllers: [UserController, CaptchaController],
})
export class ControllersModule {}
