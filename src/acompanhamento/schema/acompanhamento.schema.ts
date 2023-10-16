import { Prop, SchemaFactory } from "@nestjs/mongoose";

export type AgendamentoDocument = Acompanhamento & Document;

export class ClienteAcompanhamento {
    codigo: number;
    nome: string;
}

export class VaraAcompanhamento {
    descricao: string;
    codigo: number;
}

export class Acompanhamento {

    @Prop({ required: true, unique: true })
    numeroProcesso: string;

    @Prop({ required: true })
    datainicio: Date;

    @Prop({})
    informacoes: string;

    @Prop({ required: true })
    cliente = new ClienteAcompanhamento();

    @Prop({ required: true })
    vara = new VaraAcompanhamento();

    @Prop({})
    usuariocriacao?: string;

    @Prop({})
    datacriacao?: Date;

    @Prop({})
    usuarioalteracao?: string;

    @Prop({})
    dataalteracao?: Date;

}

export const AcompanhamentoSchema = SchemaFactory.createForClass(Acompanhamento);