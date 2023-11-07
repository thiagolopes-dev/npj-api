import { IsNotEmpty, IsOptional } from "class-validator";
import { ClienteProcesso, ItensProcesso, MotivoProcesso, StatusProcesso, VaraProcesso } from "../schema/processo.schema";

export class ProcessoDTO {

    numeroprocesso: number;

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

    itensprocesso = new Array<ItensProcesso>();
}