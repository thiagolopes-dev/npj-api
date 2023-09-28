import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusDTO } from './dto/status.dto';
import { StatusDocument } from './schema/status.schema';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel('Status') private readonly statusModel: Model<StatusDTO>,
  ) { }

  async getAll() {
    return await this.statusModel.find().exec();
  }

  async getByID(id: string) {
    return await this.statusModel.findById(id).exec();
  }

  async create(statusDTO: StatusDTO): Promise<StatusDocument> {
    const { descricao, ...rest } = statusDTO;
    const descExits = await this.findByDescricao(descricao);
    if (descExits) {
      throw new ConflictException('Status já cadastrado !');
    }
    const MaxId = await this.statusModel.findOne({}, 'codigo')
      .sort({ codigo: -1 });
    const nextId = MaxId ? MaxId.codigo + 1 : 1;
    const createdStatus = new this.statusModel({
      ...rest,
      codigo: nextId,
      descricao,
    });
    return createdStatus.save();
  }

  async update(id: string, status: StatusDTO) {
    const { descricao, ...rest } = status;
    const descExits = await this.findByDescricao(descricao);
    if (descExits && status.status != status.status) {
      throw new ConflictException('Status já cadastrado !');
    }
    
    const updatedStatus = {
      ...rest,
      descricao,
    };

    await this.statusModel.updateOne({ _id: id }, { $set: updatedStatus }).exec();
    return this.getByID(id);
  }

  async delete(id: string) {
    return await this.statusModel.deleteOne({ _id: id }).exec();
  }

  async findByDescricao(descricao: string): Promise<StatusDocument> {
    return this.statusModel.findOne({ descricao }).exec();
  }
}
