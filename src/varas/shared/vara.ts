import { Document } from 'mongoose';

export class Vara extends Document {
  descricao: string;
  status: boolean;
}
