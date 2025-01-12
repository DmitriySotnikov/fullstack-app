import { Module } from '@nestjs/common';
import { CaptchaService } from './capcha.service';

@Module({
  providers: [CaptchaService],
  exports: [CaptchaService],
})
export class CaptchaServiceModule {}
