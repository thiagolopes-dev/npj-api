import { IsArray, IsEmpty, IsNotEmpty } from "class-validator";
import { ClienteAcompanhamento, MotivoAcompanhamento, ProcessoAcompanhamento, StatusAcompanhamento, VaraAcompanhamento } from "../schema/acompanhamento.schema";

export class AcompanhamentoDTO {

    numeroprocesso: number;

    @IsNotEmpty()
    cliente = new ClienteAcompanhamento();

    @IsNotEmpty()
    vara = new VaraAcompanhamento();

    @IsNotEmpty()
    motivo = new MotivoAcompanhamento();

    @IsNotEmpty()
    status = new StatusAcompanhamento();

    processoacompanhamento = new ProcessoAcompanhamento();
}