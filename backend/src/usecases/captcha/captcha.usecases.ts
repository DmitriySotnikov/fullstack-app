import { Injectable } from '@nestjs/common';
import { NewCaptcha } from 'src/domain/entites/captcha.entity';
import { CaptchaEntityRepository } from 'src/domain/repositories/captcha.repository';
import { CaptchaService } from 'src/infrastructur/capcha/capcha.service';

@Injectable()
export class CaptchaUsecases {
  constructor(
    private readonly captchaEntityRepository: CaptchaEntityRepository,
    // TODO переделать на абстрактный сервис
    private readonly captchaService: CaptchaService,
  ) {}

  async createCaptcha() {
    const newCaptcha = this.captchaService.generateCaptcha();

    const captcha = new NewCaptcha({
      captchaId: newCaptcha.captchaId,
      value: newCaptcha.value,
      isPassed: false,
    });

    await this.captchaEntityRepository.create(captcha);

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
    const captcha = await this.captchaEntityRepository.getByCaptchaId({
      captchaId,
    });

    if (!captcha) {
      throw new Error('Internal server error');
    }

    if (captcha.value === captchaValue) {
      await this.captchaEntityRepository.update({ ...captcha, isPassed: true });
      return true;
    } else {
      throw new Error('Incorrect captcha');
    }
  }

  async validateOrCreateCaptcha({ id }: { id: number }): Promise<{
    captchaId: string | null;
    svg: string | null;
  }> {
    const captchaModel = await this.captchaEntityRepository.getById({
      id,
    });

    if (!captchaModel.isPassed) {
      const newCaptcha = this.captchaService.generateCaptcha();
      await this.captchaEntityRepository.update({
        ...captchaModel,
        captchaId: newCaptcha.captchaId,
        value: newCaptcha.value,
        isPassed: false,
      });
      return {
        captchaId: newCaptcha.captchaId,
        svg: newCaptcha.svg,
      };
    }

    await this.captchaEntityRepository.update({
      ...captchaModel,
      isPassed: false,
    });

    return {
      captchaId: null,
      svg: null,
    };
  }
}
