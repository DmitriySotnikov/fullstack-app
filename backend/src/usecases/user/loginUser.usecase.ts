import { Injectable } from '@nestjs/common';
import { UserWithoutPassword } from 'src/domain/entites/user.entity';
import { CaptchaService } from 'src/infrastructur/capcha/capcha.service';
import { CaptchaEntityRepository } from 'src/domain/repositories/captcha.repository';
import { UserEntityRepository } from 'src/domain/repositories/user.repository';
import { BcryptService } from 'src/infrastructur/bcrypt/bcrypt.service';

@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly captchaEntityRepository: CaptchaEntityRepository,
    private readonly captchaService: CaptchaService,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute({
    email,
    password,
  }): Promise<
    UserWithoutPassword | { captchaId: string; svg: string } | Error
  > {
    ///
    const userModel = await this.userEntityRepository.getUserByEmail({
      email,
    });

    if (!userModel) {
      throw new Error('User not found');
    }

    const isCompare = await this.bcryptService.compare({
      password: password,
      hash: userModel.password,
    });

    if (!isCompare) {
      throw new Error('Password is uncorrect');
    }

    const captchaModel = await this.captchaEntityRepository.getById({
      id: userModel.userCaptchaId,
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

    return userModel;
  }
}
