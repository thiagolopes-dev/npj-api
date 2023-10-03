import { IsNotEmpty } from "class-validator";

export class AtualizarSenhaDto {
    @IsNotEmpty()
    password: string;
}