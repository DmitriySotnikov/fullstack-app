import { Injectable } from '@nestjs/common';
import {
  NewUser,
  UserWithoutPassword,
  UserWithPassword,
} from 'src/domain/entites/user.entity';
import { CreateUserDto } from '../dtos/createUserDto';
import { UserEntity } from '../orms/typeOrm/models/User.orm.entity';

@Injectable()
export class UserMapper {
  fromUserModeltoUserWithoutPassword(user: UserEntity): UserWithoutPassword {
    return new UserWithoutPassword({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userCaptchaId: user.userCaptchaId,
    });
  }

  fromUserModeltoUserWithPassword(user: UserEntity): UserWithPassword {
    return new UserWithPassword({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userCaptchaId: user.userCaptchaId,
      password: user.password,
    });
  }

  fromCreateUserDtoToNewUser(
    user: CreateUserDto,
    userCaptchaId: number,
  ): NewUser {
    return new NewUser({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      userCaptchaId,
    });
  }
}
