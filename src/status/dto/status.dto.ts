import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

export class StatusDTO {

  codigo: number;

  @ApiProperty({
    description: 'Descrição é obrigatório',
    required: true
  })
  @IsNotEmpty(
    { message: 'O campo descrição é obrigatório' })
  @MinLength(4,
    { message: 'Minímo de 4 caracteres' })
  @MaxLength(60,
    { message: 'Máximo de 60 caracteres' })
  descricao: string;

  @ApiProperty({
    description: 'Status é obrigatório',
    required: true
  })
  @IsNotEmpty(
    { message: 'O campo status é obrigatório' })
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
