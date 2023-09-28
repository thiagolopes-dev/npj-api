import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);