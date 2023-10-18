
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MaxLength } from "class-validator";
import { Document } from 'mongoose';

export type ProcessoDocument = Processo & Document;

export class ClienteProcesso {
    codigo: number;
    nome: string;
}

export class VaraProcesso {
    descricao: string;
    codigo: number;
}

export class MotivoProcesso {
    descricao: string;
    codigo: number;
}

export class StatusProcesso {
    descricao: string;
    codigo: number;
}

export class ItensProcesso {
    codigo: number;

    @MaxLength(6000)
    informacao: string;

    @Prop()
    itensusuariocriacao: string;

    @Prop()
    itensdatacriacao: Date;
}

@Schema()
export class Processo {

    @Prop({ unique: true })
    numeroprocesso: number;

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

    @Prop({ type: ItensProcesso })
    itensprocesso = new Array<ItensProcesso>();

}

export const ProcessoSchema = SchemaFactory.createForClass(Processo);