import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ClienteDTO {
  @IsNotEmpty()
  nome: string;

  @MinLength(11, { message: 'O CPF deve conter 11 digitos' })
  @MaxLength(11, { message: 'O CPF deve conter apenas 11 digitos' })
  @IsNotEmpty()
  cpf: string;

  rg: string;

  cep: string;

  logradouro: string;

  bairro: string;

  numero: string;

  complemento: string;

  cidade: string;

  uf: string;

  telefone: string;

  whatsapp: string;
}
