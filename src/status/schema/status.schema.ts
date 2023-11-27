import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatusDocument = Status & Document;

@Schema()
export class Status {
  @Prop({ required: true, unique: true })
  codigo: number;

  @Prop({ required: true })
  descricao: string;

  @Prop({ required: true })
  status: boolean;


  @Prop({ required: true })
  tipo: string;

  @Prop()
  usuariocriacao?: string;

  @Prop()
  datacriacao?: Date;

  @Prop()
  dataalteracao?: Date;

  @Prop()
  usuarioalteracao?: string;

}

export const StatusSchema = SchemaFactory.createForClass(Status);
