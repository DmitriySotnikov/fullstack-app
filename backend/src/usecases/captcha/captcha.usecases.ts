import { Injectable } from '@nestjs/common';
import { NewCaptcha } from 'src/domain/entites/captcha.entity';
import { CaptchaService } from 'src/infrastructur/capcha/capcha.service';
import { CaptchaRepository } from 'src/infrastructur/orms/repositories/captcha.repository';

@Injectable()
export class CaptchaUsecases {
  constructor(
    private readonly captchaRepository: CaptchaRepository,
    private readonly captchaService: CaptchaService,
  ) {}

  async createCaptcha() {
    const newCaptcha = this.captchaService.generateCaptcha();

    const captcha = new NewCaptcha({
      captchaId: newCaptcha.captchaId,
      value: newCaptcha.value,
      isPassed: false,
    });

    await this.captchaRepository.create(captcha);

    return {
      captchaId: newCaptcha.captchaId,
      svg: newCaptcha.svg,
    };
  }

  async verifyCaptcha({
    captchaId,
    captchaValue,
  }: {
    captchaId: string;
    captchaValue: string;
  }) {
    const captcha = await this.captchaRepository.getByCaptchaId({ captchaId });

    if (!captcha) {
      throw new Error('Internal server error');
    }

    if (captcha.value === captchaValue) {
      await this.captchaRepository.update({ ...captcha, isPassed: true });
      return true;
    } else {
      throw new Error('Incorrect captcha');
    }
  }
}
