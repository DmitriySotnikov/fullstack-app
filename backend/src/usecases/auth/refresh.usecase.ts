import { Injectable } from '@nestjs/common';
import { UserWithoutPassword } from 'src/domain/entites/user.entity';
import { UserEntityRepository } from 'src/domain/repositories/user.repository';

@Injectable()
export class LoginUseCases {
  constructor(private readonly userEntityRepository: UserEntityRepository) {}

  async execute({userEmail}): Promise<UserWithoutPassword | Error> {
    const user = await this.userEntityRepository.getUserByEmail({
      email: userEmail,
    });
    return user;
  }
}
