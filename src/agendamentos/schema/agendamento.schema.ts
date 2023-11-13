import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AgendamentoDocument = Agendamento & Document;

export class ClienteAgenda {
    @Prop({ unique: false })
    codigo: number;
    nome: string;
}

export class StatusAgenda {
    @Prop({ unique: false })
    codigo: number;
    descricao: string;
}

export class MotivoAgenda {
    @Prop({ unique: false })
    codigo: number;
    descricao: string;
}


@Schema()
export class Agendamento {

    @Prop({ required: true, unique: true })
    atendimento: number;

    @Prop({ required: false })
    numeroprontuario: number;

    @Prop({ required: true })
    dataatendimento: Date;

    @Prop({ required: true, })
    cliente: ClienteAgenda;

    @Prop({ required: false })
    status: StatusAgenda;

    @Prop({ required: true })
    motivo: MotivoAgenda;

    @Prop()
    usuariocriacao?: string;

    @Prop()
    datacriacao?: Date;

    @Prop()
    usuarioalteracao?: string;

    @Prop()
    dataalteracao?: Date;

}

export const AgendamentoSchema = SchemaFactory.createForClass(Agendamento);
