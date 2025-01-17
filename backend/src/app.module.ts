import { Module } from '@nestjs/common';
import { AuthUseCasesProxyModule } from './infrastructur/useCasesProxy/auth.usecases-proxy.module';
import { ControllersModule } from './infrastructur/controllers/controller.module';
import { CaptchaUsecaseProxyModule } from './infrastructur/useCasesProxy/captcha.usecases-proxy.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './infrastructur/strategies/local.strategy';
import { RefrehshJwtStrategy } from './infrastructur/strategies/refreshJwt.strategy';
import { AccessJwtStrategy } from './infrastructur/strategies/accessJwt.strategy';

@Module({
  imports: [
    ControllersModule,
    CaptchaUsecaseProxyModule.register(),
    AuthUseCasesProxyModule.register(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  providers: [AccessJwtStrategy, LocalStrategy, RefrehshJwtStrategy],
})
export class AppModule {}
