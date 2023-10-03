import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class ClienteDTO {
  @ApiProperty({
    description: 'Nome é obrigatório',
    required: true
  })
  @IsNotEmpty()
  nome: string;

  @MinLength(11, { message: 'O CPF deve conter 11 digitos' })
  @MaxLength(11, { message: 'O CPF deve conter apenas 11 digitos' })
  @IsNotEmpty()
  @ApiProperty({
    description: 'CPF é obrigatório',
    required: true
  })
  cpf: string;

  @ApiProperty({
    description: 'RG é obrigatório',
    required: true
  })
  rg: string;

  @ApiProperty({
    description: 'CEP é obrigatório',
    required: true
  })
  cep: string;

  @ApiProperty({
    description: 'Logradouro é obrigatório',
    required: true
  })
  logradouro: string;

  @ApiProperty({
    description: 'Bairro é obrigatório',
    required: true
  })
  bairro: string;

  @ApiProperty({
    description: 'Numero é obrigatório',
    required: true
  })
  numero: string;

  @ApiProperty({})
  complemento: string;

  @ApiProperty({
    description: 'Cidade é obrigatório',
    required: true
  })
  cidade: string;

  @ApiProperty({
    description: 'UF é obrigatório',
    required: true
  })
  uf: string;

  @ApiProperty({
    description: 'Telefone é obrigatório',
    required: true
  })
  telefone: string;

  @ApiProperty({
    description: 'Whatsapp é obrigatório',
    required: true
  })
  whatsapp: string;

  codigo: number;
}
