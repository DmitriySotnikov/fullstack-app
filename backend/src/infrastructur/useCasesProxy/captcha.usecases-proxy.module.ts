import { UseCaseProxy } from './usecase-proxy';
import { DynamicModule, Module } from '@nestjs/common';
import { CaptchaRepository } from '../orms/repositories/captcha.repository';
import { RepositoriesModule } from '../orms/repositories/repositories.module';
import { CaptchaUsecases } from 'src/usecases/captcha/captcha.usecases';
import { CaptchaService } from '../capcha/capcha.service';
import { CaptchaServiceModule } from '../capcha/captchaService.module';

@Module({
  imports: [RepositoriesModule, CaptchaServiceModule],
})
export class CaptchaUsecaseProxyModule {
  static CAPTCHA_USE_CASE_PROXY = 'CaptchaUseCaseProxy';

  static register(): DynamicModule {
    return {
      module: CaptchaUsecaseProxyModule,
      providers: [
        {
          inject: [CaptchaRepository, CaptchaService],
          provide: CaptchaUsecaseProxyModule.CAPTCHA_USE_CASE_PROXY,
          useFactory: (
            captchaRepository: CaptchaRepository,
            captchaService: CaptchaService,
          ) =>
            new UseCaseProxy(
              new CaptchaUsecases(captchaRepository, captchaService),
            ),
        },
      ],
      exports: [CaptchaUsecaseProxyModule.CAPTCHA_USE_CASE_PROXY],
    };
  }
}
