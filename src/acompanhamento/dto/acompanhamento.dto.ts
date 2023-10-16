import { IsEmpty, IsNotEmpty } from "class-validator";
import { ClienteAcompanhamento, VaraAcompanhamento } from "../schema/acompanhamento.schema";

export class AcompanhamentoDTO {

    @IsNotEmpty()
    numeroProcesso: string;

    @IsNotEmpty()
    datainicio: Date;

    @IsEmpty()
    informacoes: string;

    @IsNotEmpty()
    cliente = new ClienteAcompanhamento();

    @IsNotEmpty()
    vara = new VaraAcompanhamento();

    @IsNotEmpty()
    usuariocriacao?: string;

    @IsNotEmpty()
    datacriacao?: Date;

    @IsEmpty()
    usuarioalteracao?: string;

    @IsEmpty()
    dataalteracao?: Date;

}