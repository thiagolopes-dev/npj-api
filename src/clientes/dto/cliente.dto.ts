import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class ClienteDTO {
  @ApiProperty({
    description: 'Nome é obrigatório',
    required: true
  })
  nome: string;

  @ApiProperty({
    description: 'Data Nascimento',
    required: true
  })
  datanasc: Date;

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
