import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type VaraDocument = Vara & Document;

@Schema()
export class Vara {
  @Prop({ required: true, unique: true })
  descricao: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true, unique: true })
  codigo: number;

  @Prop()
  usuariocriacao?: string;

  @Prop()
  datacriacao?: Date;

  @Prop()
  dataalteracao?: Date;

  @Prop()
  usuarioalteracao?: string;
}

export const VaraSchema = SchemaFactory.createForClass(Vara);
