import { Module } from '@nestjs/common';
import { UserRepository } from 'src/infrastructur/orms/repositories/user.repository';
import { CaptchaRepository } from 'src/infrastructur/orms/repositories/captcha.repository';
import { BcryptService } from 'src/infrastructur/bcrypt/bcrypt.service';
import { UserEntityRepository } from 'src/domain/repositories/user.repository';
import { CaptchaEntityRepository } from 'src/domain/repositories/captcha.repository';
import { BcryptRepository } from 'src/domain/repositories/bcrypt.repository';
import { TypeOrmCofigModule } from '../typeOrm/typeorm.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MappersModule } from 'src/infrastructur/mappers/mappers.module';
import { models } from '../typeOrm/models';

@Module({
  imports: [
    TypeOrmCofigModule,
    TypeOrmModule.forFeature(models),
    MappersModule,
  ],
  providers: [
    {
      provide: UserEntityRepository,
      useClass: UserRepository,
    },
    {
      provide: CaptchaEntityRepository,
      useClass: CaptchaRepository,
    },
    {
      provide: BcryptRepository,
      useClass: BcryptService,
    },
    BcryptService,
    CaptchaRepository,
    UserRepository,
  ],
  exports: [
    CaptchaRepository,
    CaptchaEntityRepository,
    BcryptService,
    BcryptRepository,
    UserEntityRepository,
    UserRepository,
    MappersModule,
  ],
})
export class RepositoriesModule {}
