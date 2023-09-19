import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StatusDocument = Status & Document;

@Schema()
export class Status {
  @Prop({ required: true, unique: true })
  descricao: string;

  @Prop({ required: true })
  status: boolean;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
