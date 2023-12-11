import { IsNotEmpty, IsOptional } from "class-validator";
import { ClienteProcesso, ItensProcesso, MotivoProcesso, Partes, StatusProcesso, VaraProcesso } from "../schema/processo.schema";

export class ProcessoDTO {

    codigo: number;

    @IsOptional()
    numeroprocesso?: string;

    @IsNotEmpty()
    cliente = new ClienteProcesso();

    @IsNotEmpty()
    vara = new VaraProcesso();

    @IsNotEmpty()
    motivo = new MotivoProcesso();

    @IsNotEmpty()
    status = new StatusProcesso();

    @IsOptional()
    usuariocriacao: string;
    @IsOptional()
    datacriacao: Date;

    @IsOptional()
    observacao?: string;

    @IsOptional()
    aluno?: string;

    itensprocesso = new Array<ItensProcesso>();

    partes = new Array<Partes>();
}