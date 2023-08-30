import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Motivo } from './motivo';

@Injectable()
export class MotivoService {
  constructor(
    @InjectModel('Motivo') private readonly motivoModel: Model<Motivo>,
  ) {}

  async getAll() {
    return await this.motivoModel.find().exec();
  }
  async getByID(id: string) {
    return await this.motivoModel.findById(id).exec();
  }
  async create(motivo: Motivo) {
    const createdMotivo = new this.motivoModel(motivo);
    return await createdMotivo.save();
  }
  async update(id: string, motivo: Motivo) {
    await this.motivoModel.updateOne({ _id: id, motivo }).exec();
    return this.getByID(id);
  }
  async delete(id: string) {
    return await this.motivoModel.deleteOne({ _id: id }).exec();
  }
}
