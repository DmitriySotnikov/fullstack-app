import { Injectable } from '@nestjs/common';
import { UserWithoutPassword } from 'src/domain/entites/user.entity';
import { UserEntityRepository } from 'src/domain/repositories/user.repository';
import { BcryptService } from 'src/infrastructur/bcrypt/bcrypt.service';

@Injectable()
export class LoginUseCases {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly bcryptService: BcryptService,
  ) {}

  async execute({
    email,
    pass,
  }): Promise<
    UserWithoutPassword | Error
  > {
    const userModel = await this.userEntityRepository.getUserByEmail({
      email,
    });

    if (!userModel) {
      throw new Error('User not found');
    }

    const isCompare = await this.bcryptService.compare({
      password: pass,
      hash: userModel.password,
    });

    if (!isCompare) {
      throw new Error('Password is uncorrect');
    }

    const { password, ...result } = userModel;
    return result;
  }
}
