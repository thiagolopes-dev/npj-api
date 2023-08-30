import { Document } from 'mongoose';

export class Motivo extends Document {
  descricao: string;
  status: boolean;
}
