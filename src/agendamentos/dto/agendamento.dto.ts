import { Cliente } from 'src/clientes/schema/cliente.schema';
import { Status } from 'src/status/schema/status.schema';

export class AgendamentoDTO {
    numeroprontuario: string;
    dataatendimento: Date;
    status = new Status();
    cliente = new Cliente();
    username: string;
}
