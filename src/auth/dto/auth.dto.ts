import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthDto {

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
