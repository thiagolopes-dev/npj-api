import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClienteDocument = Cliente & Document;

@Schema()
export class Cliente {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cpf: string;

  @Prop({ required: false })
  rg: string;

  @Prop({ required: true })
  logradouro: string;

  @Prop({ required: true })
  cep: string;

  @Prop({ required: true })
  bairro: string;

  @Prop({ required: true })
  numero: string;

  @Prop({})
  complemento: string;

  @Prop({ required: true })
  cidade: string;

  @Prop({ required: true })
  uf: string;

  @Prop({ required: false })
  telefone: string;

  @Prop({ required: false })
  whatsapp: string;

  @Prop({ required: true, unique: true })
  codigo: number;

  @Prop({ required: true })
  status: boolean;

  @Prop()
  usuariocriacao?: string;

  @Prop()
  datacriacao?: Date;

  @Prop()
  dataalteracao?: Date;

  @Prop()
  usuarioalteracao?: string;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
