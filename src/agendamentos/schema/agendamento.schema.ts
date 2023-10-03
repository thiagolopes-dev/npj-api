import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AgendamentoDocument = Agendamento & Document;

@Schema()
export class Agendamento {
    @Prop({ required: true })
    cliente: string;

    @Prop({ required: true })
    numeroprontuario: number;

    @Prop({ required: true })
    dataatendimento: Date;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    username: string;


}

export const AgendamentoSchema = SchemaFactory.createForClass(Agendamento);
