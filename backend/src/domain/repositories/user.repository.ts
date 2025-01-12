import {
  NewUser,
  UserWithoutPassword,
  UserWithPassword,
} from 'src/domain/entites/user.entity';

export abstract class UserEntityRepository {
  abstract checkUserEmail(email: string): Promise<Boolean>;
  abstract create(user: NewUser): Promise<UserWithoutPassword>;
  abstract getUserByEmail(params: {
    email: string;
  }): Promise<UserWithPassword>;
}
