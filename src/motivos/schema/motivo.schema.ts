import * as mongoose from 'mongoose';

export const MotivoSchema = new mongoose.Schema({
  descricao: String,
  status: Boolean,
});
