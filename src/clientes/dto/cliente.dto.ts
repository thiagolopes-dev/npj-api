import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ClienteDTO {
  @ApiProperty({
    description: 'Nome é obrigatório',
    required: true
  })
  nome: string;

  @ApiProperty({
    description: 'CPF é obrigatório',
    required: true
  })
  cpf: string;

  @ApiProperty({
    description: 'RG é opcional',
    required: false
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
    required: false
  })
  telefone: string;

  @ApiProperty({
    description: 'Whatsapp é opcional',
    required: false
  })
  whatsapp: string;

  codigo: number;

  @ApiProperty({
    description: 'Status é obrigatório',
    required: true
  })
  status: boolean;

  @IsOptional()
  usuariocriacao?: string;
  @IsOptional()
  datacriacao?: Date;
  @IsOptional()
  usuarioalteracao?: string;
  @IsOptional()
  dataalteracao?: Date;
}
