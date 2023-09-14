import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class MotivoDTO {
  @IsNotEmpty(
    { message: 'O campo descrição é obrigatório' })
  @MinLength(4,
    { message: 'Minímo de 4 caracteres' })
  @MaxLength(60,
    { message: 'Máximo de 60 caracteres' })
  descricao: string;

  @IsNotEmpty(
    { message: 'O campo status é obrigatório' })
  status: boolean;
}
