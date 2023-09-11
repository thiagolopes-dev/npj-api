import { IsNotEmpty } from 'class-validator';

export class ClienteDTO {
  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  cpf: string;

  rg: string;

  logradouro: string;

  bairro: string;

  numero: string;

  complemento: string;

  cidade: string;

  uf: string;

  telefone: string;

  whatsapp: string;
}
