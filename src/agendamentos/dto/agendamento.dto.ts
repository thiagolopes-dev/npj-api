import { IsNotEmpty, IsOptional } from 'class-validator';
import { ClienteAgenda, MotivoAgenda, StatusAgenda } from '../schema/agendamento.schema';

export class AgendamentoDTO {

    atendimento: number;

    @IsOptional()
    numeroprontuario: number;

    @IsNotEmpty()
    dataatendimento: Date;

    @IsNotEmpty()
    cliente = new ClienteAgenda();

    @IsNotEmpty()
    status = new StatusAgenda();

    @IsNotEmpty()
    motivo = new MotivoAgenda();

    @IsOptional()
    usuariocriacao?: string;

    @IsOptional()
    datacriacao?: Date;

    @IsOptional()
    usuarioalteracao?: string;

    @IsOptional()
    dataalteracao?: Date;

    @IsOptional()
    observacao?: string;
}
