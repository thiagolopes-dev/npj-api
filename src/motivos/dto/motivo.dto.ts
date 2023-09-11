import { IsNotEmpty } from 'class-validator';

export class MotivoDTO {
  @IsNotEmpty({ message: 'O campo descrição é obrigatório' })
  descricao: string;
  @IsNotEmpty({ message: 'O campo status é obrigatório' })
  status: boolean;
}
