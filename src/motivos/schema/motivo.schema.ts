import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MotivoDocument = Motivo & Document;

@Schema()
export class Motivo {
  @Prop({})
  codigo: number;

  @Prop({ required: true, unique: true })
  descricao: string;

  @Prop({ required: true })
  status: boolean;
}

export const MotivoSchema = SchemaFactory.createForClass(Motivo);
