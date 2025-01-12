import { Controller, Req, Res, Get, Post, Body, Inject } from '@nestjs/common';
import { Request, Response } from 'express';
import { routes } from '../routes';
import { ErrorHandler } from '../decorators/errorHandlerDecorator';
import { CaptchaUsecases } from 'src/usecases/captcha/captcha.usecases';
import { CaptchaUsecaseProxyModule } from '../useCasesProxy/captcha.usecases-proxy.module';
import { UseCaseProxy } from '../useCasesProxy/usecase-proxy';

@Controller()
export class CaptchaController {
  constructor(
    @Inject(CaptchaUsecaseProxyModule.CAPTCHA_USE_CASE_PROXY)
    private readonly captchaUsecaseProxy: UseCaseProxy<CaptchaUsecases>,
  ) {}

  @Get(routes.CAPTCHA)
  @ErrorHandler()
  async getCaptcha(@Req() request: Request, @Res() response: Response) {
    const captcha = await this.captchaUsecaseProxy
      .getInstance()
      .createCaptcha();
    return response.send(captcha);
  }

  @Post(routes.CAPTCHA_VERIFY)
  @ErrorHandler()
  async verifyCaptcha(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: { captchaId: string; captchaValue: string },
  ) {
    const result = await this.captchaUsecaseProxy.getInstance().verifyCaptcha({
      captchaId: body.captchaId,
      captchaValue: body.captchaValue,
    });
    return response.send({ verify: result });
  }
}
