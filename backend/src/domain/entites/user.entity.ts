export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
}

export interface INewUser extends IUser {
  userCaptchaId: number;
  password: string;
}

export interface IUserWithoutPassword extends IUser {
  id: number;
}

export interface IUserWithPassword extends IUser {
  id: number;
  password: string;
}

export class User implements IUser {
  public readonly firstname: string;
  public readonly lastname: string;
  public readonly email: string;
  public readonly userCaptchaId: number;
  constructor({ firstname, lastname, email }: IUser) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
  }
}

export class NewUser extends User {
  public readonly firstname: string;
  public readonly lastname: string;
  public readonly email: string;
  public readonly password: string;
  public readonly userCaptchaId: number;
  constructor({
    firstname,
    lastname,
    email,
    password,
    userCaptchaId,
  }: INewUser) {
    super({ firstname, lastname, email });
    this.userCaptchaId = userCaptchaId;
    this.password = password;
  }
}

export class UserWithPassword extends User {
  public readonly id: number;
  public readonly password: string;
  constructor({ id, firstname, lastname, email, password }: IUserWithPassword) {
    super({
      firstname,
      lastname,
      email,
    });
    this.id = id;
    this.password = password;
  }
}

export class UserWithoutPassword extends User {
  public readonly id: number;
  constructor({ id, firstname, lastname, email }: IUserWithoutPassword) {
    super({ firstname, lastname, email });
    this.id = id;
  }
}
