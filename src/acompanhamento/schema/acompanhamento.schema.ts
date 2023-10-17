import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { MaxLength } from "class-validator";
import { Document } from 'mongoose';
import { type } from "os";

export type AcompanhamentoDocument = Acompanhamento & Document;

export class ClienteAcompanhamento {
    codigo: number;
    nome: string;
}

export class VaraAcompanhamento {
    descricao: string;
    codigo: number;
}

export class MotivoAcompanhamento {
    descricao: string;
    codigo: number;
}

export class StatusAcompanhamento {
    descricao: string;
    codigo: number;
}

export class ProcessoAcompanhamento {
    @MaxLength(6000)
    informacao: string;
    codigo: number;
    usuariocriacao: string;
    datacricacao: Date;
}

@Schema()
export class Acompanhamento {

    @Prop({ unique: true })
    numeroprocesso: number;

    @Prop({ required: true, type: ClienteAcompanhamento })
    cliente = new ClienteAcompanhamento();

    @Prop({ required: true, type: VaraAcompanhamento })
    vara = new VaraAcompanhamento();

    @Prop({ required: true, type: MotivoAcompanhamento })
    motivo = new MotivoAcompanhamento();

    @Prop({ required: true, type: StatusAcompanhamento })
    status = new StatusAcompanhamento();

    @Prop([])
    processoacompanhamento = new ProcessoAcompanhamento();

}

export const AcompanhamentoSchema = SchemaFactory.createForClass(Acompanhamento);