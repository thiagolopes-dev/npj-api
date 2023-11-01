import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VaraDTO {

  @ApiProperty({
    description: 'Descrição é obrigatório',
    required: true
  })
  @IsNotEmpty({ message: 'O campo descrição é obrigatório' })
  descricao: string;

  @ApiProperty({
    description: 'Status é obrigatório',
    required: true
  })
  @IsNotEmpty({ message: 'O campo status é obrigatório' })
  status: boolean;

  codigo: number;

  usuariocriacao?: string;
  datacriacao?: Date;
  usuarioalteracao?: string;
  dataalteracao?: Date;
}
