import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {

    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true })
    status: boolean;

    @Prop({ type: MongooseSchema.Types.Mixed })
    permissao: {
        motivos: boolean;
        varas: boolean;
        status: boolean;
        clientes: boolean;
        agendamentos: boolean;
        processos: boolean;
        usuarios: boolean;
    };
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);