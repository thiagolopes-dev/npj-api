import { ItensProcesso } from "../schema/processo.schema";

export class AtualizarProcessoDto extends ItensProcesso {
    codigo: number;
    informacao: string;
    itemusuariocriacao: string;
    itemdatacriacao: Date;
}