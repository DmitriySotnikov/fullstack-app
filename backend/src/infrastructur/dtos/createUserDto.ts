import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'firstname must be a string' })
  @IsNotEmpty()
  @MinLength(2)
  firstname: string;

  @IsString({ message: 'lastname must be a string' })
  @IsNotEmpty()
  @MinLength(2)
  lastname: string;

  @IsEmail()
  @IsNotEmpty()
  @MinLength(2)
  email: string;

  @IsString({ message: 'captchaId is not found' })
  @IsNotEmpty()
  captchaId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @Matches(
    /(?=.*[0-9])(?=.*[.!@,_#$%^&*-])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z.!@,_#$%^&*-]{8,30}/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one number and one special character',
    },
  )
  password: string;
}
