import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AgendamentoDocument = Agendamento & Document;

@Schema()
export class Agendamento {
    @Prop({ required: true })
    cliente: string;

    @Prop({ required: true })
    dataatendimento: Date;

    username: string;


}

export const AgendamentoSchema = SchemaFactory.createForClass(Agendamento);
