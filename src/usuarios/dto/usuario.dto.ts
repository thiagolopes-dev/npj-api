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

    permissao = new Permissao();

    @IsEmpty()
    refreshToken?: string;

}

export class Permissao {
    motivos: boolean;
    varas: boolean;
    status: boolean;
    clientes: boolean;
    agendamentos: boolean;
    processos: boolean;
    usuarios: boolean;
}