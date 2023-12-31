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

    @Prop({ required: true, type: ClienteAgenda })
    cliente = new ClienteAgenda();

    @Prop({ required: true, type: StatusAgenda })
    status = new StatusAgenda();

    @Prop({ required: true, type: MotivoAgenda })
    motivo = new MotivoAgenda();

    @Prop()
    usuariocriacao?: string;

    @Prop()
    datacriacao?: Date;

    @Prop()
    usuarioalteracao?: string;

    @Prop()
    dataalteracao?: Date;

    @Prop()
    observacao?: string;

}

export const AgendamentoSchema = SchemaFactory.createForClass(Agendamento);
