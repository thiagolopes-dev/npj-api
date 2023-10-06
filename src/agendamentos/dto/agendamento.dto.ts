import { IsEmpty, IsNotEmpty } from 'class-validator';
import { ClienteAgenda, MotivoAgenda, StatusAgenda } from '../schema/agendamento.schema';

export class AgendamentoDTO {


    atendimento: number;

    @IsEmpty()
    numeroprontuario: number;

    @IsNotEmpty()
    dataatendimento: Date;

    @IsNotEmpty()
    cliente = new ClienteAgenda();

    @IsNotEmpty()
    status = new StatusAgenda();

    @IsNotEmpty()
    motivo = new MotivoAgenda();

    @IsNotEmpty()
    usuariocriacao?: string;

    @IsNotEmpty()
    datacriacao?: Date;

    @IsNotEmpty()
    usuarioalteracao?: string;

    @IsNotEmpty()
    dataalteracao?: Date;
}
