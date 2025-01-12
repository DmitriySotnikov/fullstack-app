import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CaptchaService {
  generateCaptcha() {
    const captcha = svgCaptcha.create({
      size: 4,
      noise: 3,
      color: true,
      ignoreChars: '0o1il',
    });

    const captchaId = uuidv4();

    return {
      captchaId,
      value: captcha.text,
      svg: captcha.data,
    };
  }
}
