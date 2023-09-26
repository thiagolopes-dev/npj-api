import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ClienteDocument = Cliente & Document;

@Schema()
export class Cliente {
  @Prop({ required: true })
  nome: string;

  @Prop({ required: true })
  cpf: string;
  
  @Prop({ required: true })
  rg: string;
  
  @Prop({ required: true })
  logradouro: string;
  
  @Prop({ required: true })
  cep: string;
  
  @Prop({ required: true })
  bairro: string;
  
  @Prop({ required: true })
  numero: string;
  
  @Prop({ required: true })
  complemento: string;
  
  @Prop({ required: true })
  cidade: string;
  
  @Prop({ required: true })
  uf: string;
  
  @Prop({ required: true })
  telefone: string;
  
  @Prop({ required: true })
  whatsapp: string;
  
  @Prop({ required: true, unique: true })
  codigo: number;
}

export const ClienteSchema = SchemaFactory.createForClass(Cliente);
