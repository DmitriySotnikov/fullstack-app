import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntityRepository } from 'src/domain/repositories/user.repository';
import { UserEntity } from 'src/infrastructur/orms/typeOrm/models/User.orm.entity';
import {
  NewUser,
  UserWithoutPassword,
  UserWithPassword,
} from 'src/domain/entites/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from '../../mappers/user.mapper';

@Injectable()
export class UserRepository implements UserEntityRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    private readonly userMapper: UserMapper,
  ) {}

  async checkUserEmail(email: string): Promise<Boolean> {
    const userModel = await this.userEntityRepository.findOne({
      where: { email },
      select: ['id'],
    });
    if (!userModel) {
      return false;
    }
    return true;
  }

  async create(newUser: NewUser): Promise<UserWithoutPassword> {
    const userModel = await this.userEntityRepository.save(newUser);
    return this.userMapper.fromUserModeltoUserWithoutPassword(userModel);
  }

  async getUserByEmail({
    email,
  }: {
    email: string;
    password: string;
  }): Promise<UserWithPassword> {
    const userModel = await this.userEntityRepository.findOne({
      where: { email },
      select: [
        'id',
        'firstname',
        'lastname',
        'email',
        'password',
        'userCaptchaId',
        'createdAt',
        'updatedAt',
      ],
    });
    if (!userModel) {
      throw new Error('User not found');
    }
    return this.userMapper.fromUserModeltoUserWithPassword(userModel);
  }
}
