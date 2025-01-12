import { Injectable } from '@nestjs/common';
import { User } from 'src/domain/entites/user.entity';
import { CreateUserDto } from 'src/infrastructur/dtos/createUserDto';
import { UserEntityRepository } from 'src/domain/repositories/user.repository';
import { CaptchaEntityRepository } from 'src/domain/repositories/captcha.repository';
import { UserMapper } from 'src/infrastructur/mappers/user.mapper';
import { BcryptService } from 'src/infrastructur/bcrypt/bcrypt.service';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly createUserRepository: UserEntityRepository,
    private readonly captchaEntityRepository: CaptchaEntityRepository,
    private readonly userMapper: UserMapper,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute({ user }: { user: CreateUserDto }): Promise<User> {
    const isEmailExist = await this.createUserRepository.checkUserEmail(
      user.email,
    );

    if (isEmailExist) {
      throw new Error('Email already exists');
    }

    const captcha = await this.captchaEntityRepository.getByCaptchaId({
      captchaId: user.captchaId,
    });

    if (!captcha) {
      throw new Error('Captcha not found');
    }

    await this.captchaEntityRepository.update({ ...captcha, isPassed: false });

    const newUser = this.userMapper.fromCreateUserDtoToNewUser(
      user,
      captcha.id,
    );
    
    return await this.createUserRepository.create({
      ...newUser,
      password: await this.bcryptService.hash({ password: newUser.password }),
    });
  }
}
