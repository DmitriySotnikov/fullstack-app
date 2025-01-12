import { Captcha, NewCaptcha } from 'src/domain/entites/captcha.entity';

export abstract class CaptchaEntityRepository {
  abstract create(captcha: NewCaptcha): Promise<{ message: string }>;
  abstract delete(params: { captchaId: string }): Promise<void>;
  abstract getByCaptchaId(params: { captchaId: string }): Promise<Captcha>;
  abstract getById(params: { id: number }): Promise<Captcha>;
  abstract update(captcha: Captcha): Promise<void>;
}
