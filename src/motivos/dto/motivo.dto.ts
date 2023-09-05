import { IsNotEmpty } from 'class-validator';

export class MotivoDTO {
  @IsNotEmpty()
  descricao: string;
  @IsNotEmpty()
  status: boolean;
}
