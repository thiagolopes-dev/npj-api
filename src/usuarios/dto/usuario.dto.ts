import { IsBoolean, IsEmail, IsEmpty, IsNotEmpty } from "class-validator";

export class UsuarioDto {

    @IsNotEmpty()
    name?: string;

    @IsEmail()
    @IsNotEmpty()
    username?: string;

    @IsNotEmpty()
    password?: string;

    @IsNotEmpty()
    @IsBoolean()
    status?: boolean;

    @IsEmpty()
    refreshToken?: string;
}