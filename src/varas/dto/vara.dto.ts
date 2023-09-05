import { IsNotEmpty } from 'class-validator';

export class VaraDTO {
  @IsNotEmpty()
  descricao: string;
  @IsNotEmpty()
  status: boolean;
}
