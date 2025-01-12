import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  Matches,
} from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  @MinLength(2)
  email: string;

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
