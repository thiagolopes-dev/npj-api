import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotivoDTO } from './dto/motivo.dto';
import { MotivoDocument } from './schema/motivo.schema';

@Injectable()
export class MotivosService {
  constructor(
    @InjectModel('Motivo') private readonly motivoModel: Model<MotivoDTO>,
  ) { }

  async getAll(): Promise<MotivoDTO[]> {
    return await this.motivoModel.find().exec();
  }

  async getByID(id: string) {
    return await this.motivoModel.findById(id).exec();
  }

  async create(motivoDTO: MotivoDTO): Promise<MotivoDocument> {
    const { descricao, ...rest } = motivoDTO;
    // Verificar se a descrição já existe
    const descExits = await this.findByDescricao(descricao);
    if (descExits) {
      throw new ConflictException('Motivo já cadastrado !');
    }
    const createdMotivo = new this.motivoModel({
      ...rest,
      descricao,
    });
    return createdMotivo.save();
  }

  async update(id: string, motivo: MotivoDTO) {
    const { descricao, ...rest } = motivo;
    const descExits = await this.findByDescricao(descricao);
    if (descExits) {
      throw new ConflictException('Motivo já cadastrado !');
    }
    const updatedMotivo = {
      ...rest,
      descricao,
    };

    await this.motivoModel.updateOne({ _id: id }, { $set: updatedMotivo }).exec();
    return this.getByID(id);
  }

  async delete(id: string) {
    return await this.motivoModel.deleteOne({ _id: id }).exec();
  }

  async findByDescricao(descricao: string): Promise<MotivoDocument> {
    return this.motivoModel.findOne({ descricao }).exec();
  }
}
