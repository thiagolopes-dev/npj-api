import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClienteDTO } from './dto/cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel('Cliente') private readonly clienteModel: Model<ClienteDTO>,
  ) {}

  async getAll() {
    return await this.clienteModel.find().exec();
  }

  async getByID(id: string) {
    return await this.clienteModel.findById(id).exec();
  }

  async create(vara: ClienteDTO) {
    const createdCliente = new this.clienteModel(vara);
    return await createdCliente.save();
  }

  async update(id: string, vara: ClienteDTO) {
    await this.clienteModel.updateOne({ _id: id }, vara).exec();
    return this.getByID(id);
  }
  async delete(id: string) {
    return await this.clienteModel.deleteOne({ _id: id }).exec();
  }
}
