import { Module } from '@nestjs/common';
import { CaptchaMapper } from './captcha.mapper';
import { UserMapper } from './user.mapper';

@Module({
  providers: [CaptchaMapper, UserMapper],
  exports: [CaptchaMapper, UserMapper],
})
export class MappersModule {}
