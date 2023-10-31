import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {

  @IsNotEmpty(
    { message: 'O campo e-mail é obrigatório' }
  )
  @IsEmail()
  username: string;

  @IsNotEmpty(
    { message: 'O campo senha é obrigatório' }
  )
  password: string;
}
