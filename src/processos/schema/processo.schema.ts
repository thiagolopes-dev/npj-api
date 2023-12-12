
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type ProcessoDocument = Processo & Document;

export class ClienteProcesso {
    @Prop({ unique: false })
    codigo: number;
    nome: string;
}

export class VaraProcesso {
    @Prop({ unique: false })
    codigo: number;
    descricao: string;
}

export class MotivoProcesso {
    @Prop({ unique: false })
    codigo: number;
    descricao: string;
}

export class StatusProcesso {
    @Prop({ unique: false })
    codigo: number;
    descricao: string;
}

export class ItensProcesso {
    @Prop()
    codigo: number;

    @Prop()
    // @MaxLength(6000)
    informacoes: string;

    @Prop()
    itemusuariocriacao: string;

    @Prop()
    itemdatacriacao: Date;
}

export class Partes {

    @Prop()
    nome: string;

    @Prop()
    cpf: string;

    @Prop()
    whats: string;

    @Prop()
    telefone: string;

    @Prop()
    email: string;

    @Prop()
    usuariocriacao: string;

    @Prop()
    datacriacao: Date;
}

@Schema()
export class Processo {

    @Prop({ unique: true })
    codigo: number;

    @Prop()
    numeroprocesso?: string;

    @Prop({ required: true, type: ClienteProcesso })
    cliente = new ClienteProcesso();

    @Prop({ required: true, type: VaraProcesso })
    vara = new VaraProcesso();

    @Prop({ required: true, type: MotivoProcesso })
    motivo = new MotivoProcesso();

    @Prop({ required: true, type: StatusProcesso })
    status = new StatusProcesso();

    @Prop()
    usuariocriacao: string;

    @Prop()
    datacriacao: Date;

    @Prop()
    observacao?: string;

    @Prop()
    aluno?: string;

    @Prop({ type: ItensProcesso })
    itensprocesso = new Array<ItensProcesso>();

    @Prop({ type: Partes })
    partes = new Array<Partes>();


}

export const ProcessoSchema = SchemaFactory.createForClass(Processo);