import { IsNotEmpty } from 'class-validator';

export class VaraDTO {
  @IsNotEmpty({ message: 'O campo descrição é obrigatório' })
  descricao: string;
  @IsNotEmpty({ message: 'O campo status é obrigatório' })
  status: boolean;

  codigo: number;
}
