import { Injectable } from '@nestjs/common';
import { UserWithoutPassword, UserWithPassword } from 'src/domain/entites/user.entity';
import { UserEntityRepository } from 'src/domain/repositories/user.repository';
import { UserMapper } from 'src/infrastructur/mappers/user.mapper';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(
    private readonly userEntityRepository: UserEntityRepository,
    private readonly userMapper: UserMapper
  ) {}

  async execute({ email }: { email: string }): Promise<UserWithoutPassword> {
    const user: UserWithPassword =  await this.userEntityRepository.getUserByEmail({ email });
    return this.userMapper.fromUserWithPasswordToUserWithoutPassword(user);
  }
}
