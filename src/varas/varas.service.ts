import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VaraDTO } from './dto/vara.dto';
import { VaraDocument } from './schema/vara.schema';

@Injectable()
export class VarasService {
  constructor(
    @InjectModel('Vara') private readonly varaModel: Model<VaraDTO>,
  ) { }

  async getAll() {
    return await this.varaModel.find().exec();
  }

  async getByID(id: string) {
    return await this.varaModel.findById(id).exec();
  }

  async create(vara: VaraDTO): Promise<VaraDocument> {
    const { descricao, ...rest } = vara;
    const descExits = await this.findByDescricao(descricao);
    if (descExits) {
      throw new ConflictException('Descrição já existente!');
    }
    const createdVara = new this.varaModel({
      ...rest,
      descricao,
    });
    return createdVara.save();
  }

  async update(id: string, vara: VaraDTO) {
    await this.varaModel.updateOne({ _id: id }, vara).exec();
    return this.getByID(id);
  }
  
  async delete(id: string) {
    return await this.varaModel.deleteOne({ _id: id }).exec();
  }

  async findByDescricao(descricao: string): Promise<VaraDocument> {
    return this.varaModel.findOne({ descricao }).exec();
  }
}
