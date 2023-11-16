import { ItensProcesso } from "../schema/processo.schema";

export class AtualizarProcessoDto extends ItensProcesso {
    codigo: number;
    informacoes: string;
    usuariocriacao: string;
    datacriacao: Date;
}