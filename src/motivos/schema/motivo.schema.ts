import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MotivoDocument = Motivo & Document;

@Schema()
export class Motivo {
  @Prop({ required: true, unique: true })
  codigo: number;

  @Prop({ required: true, unique: true })
  descricao: string;

  @Prop({ required: true })
  status: boolean;

  @Prop()
  usuariocriacao?: string;

  @Prop()
  datacriacao?: Date;

  @Prop()
  usuarioalteracao?: string;

  @Prop()
  dataalteracao?: Date;
}

export const MotivoSchema = SchemaFactory.createForClass(Motivo);
