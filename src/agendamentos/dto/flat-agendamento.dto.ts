export class FlatAgendamentoDTO {
    _id: string;
    atendimento?: number;
    numeroprontuario?: number;
    dataatendimento?: Date;
    desccliente?: string;
    descmotivo?: string;
    descstatus?: string
    usuariocriacao?: string;
    datacriacao?: Date;
    usuarioalteracao?: string;
    dataalteracao?: Date;
}