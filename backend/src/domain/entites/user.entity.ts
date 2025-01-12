export interface IUser {
  firstname: string;
  lastname: string;
  email: string;
  userCaptchaId: any;
}

export interface INewUser extends IUser {
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
  public readonly userCaptchaId: any;
  constructor({ firstname, lastname, email, userCaptchaId }: IUser) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.userCaptchaId = userCaptchaId;
  }
}

export class NewUser extends User {
  public readonly firstname: string;
  public readonly lastname: string;
  public readonly email: string;
  public readonly password: string;
  public readonly userCaptchaId: any;
  constructor({
    firstname,
    lastname,
    email,
    password,
    userCaptchaId,
  }: INewUser) {
    super({ firstname, lastname, email, userCaptchaId });
    this.password = password;
  }
}

export class UserWithPassword extends User {
  public readonly id: number;
  public readonly password: string;
  constructor({
    id,
    firstname,
    lastname,
    email,
    userCaptchaId,
    password,
  }: IUserWithPassword) {
    super({
      firstname,
      lastname,
      email,
      userCaptchaId,
    });
    this.id = id;
    this.password = password;
  }
}

export class UserWithoutPassword extends User {
  public readonly id: number;
  constructor({
    id,
    firstname,
    lastname,
    email,
    userCaptchaId,
  }: IUserWithoutPassword) {
    super({ firstname, lastname, email, userCaptchaId });
    this.id = id;
  }
}
