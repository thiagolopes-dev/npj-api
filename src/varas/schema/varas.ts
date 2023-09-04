import * as mongoose from 'mongoose';

export const VaraSchema = new mongoose.Schema({
  descricao: String,
  status: Boolean,
});
