import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClienteDocument = Cliente & Document;

@Schema()
export class Cliente {
  @Prop({ required: true, unique: true })
  codigo: number;

  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  datanasc: Date;

  @Prop()
  cpf: string;

  @Prop()
  rg: string;

  @Prop()
  logradouro: string;

  @Prop()
  cep: string;

  @Prop()
  bairro: string;

  @Prop()
  numero: string;

  @Prop({})
  complemento: string;

  @Prop()
  cidade: string;

  @Prop()
  uf: string;

  @Prop()
  telefone: string;

  @Prop()
  whatsapp: string;

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
