import { Module } from '@nestjs/common';
import { UserUseCasesProxyModule } from './infrastructur/useCasesProxy/user.usecases-proxy.module';
import { ControllersModule } from './infrastructur/controllers/controller.module';
import { CaptchaUsecaseProxyModule } from './infrastructur/useCasesProxy/captcha.usecases-proxy.module';

@Module({
  imports: [
    ControllersModule,
    CaptchaUsecaseProxyModule.register(),
    UserUseCasesProxyModule.register(),
  ],
})
export class AppModule {}
