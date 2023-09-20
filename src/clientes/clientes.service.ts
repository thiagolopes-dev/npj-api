import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClienteDTO } from './dto/cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel('Cliente') private readonly clienteModel: Model<ClienteDTO>,
  ) { }

  async getAll() {
    return await this.clienteModel.find().exec();
  }

  async getByID(id: string) {
    return await this.clienteModel.findById(id).exec();
  }

  async create(cliente: ClienteDTO) {
    const { cpf, rg, ...rest } = cliente;
    const cpfExistente = await this.findByCpf(cpf);
    const rgExistente = await this.findByRg(rg)

    if (cpfExistente) {
      throw new ConflictException('CPF já cadastrado!');
    } else if(rgExistente) {
      throw new ConflictException('RG já cadastrado!');
    }

    const createdCliente = new this.clienteModel({
      ...rest,
      rg,
      cpf
    });
    return createdCliente.save();
  }

  async update(id: string, cliente: ClienteDTO) {
    await this.clienteModel.updateOne({ _id: id }, cliente).exec();
    return this.getByID(id);
  }
  async delete(id: string) {
    return await this.clienteModel.deleteOne({ _id: id }).exec();
  }

  async findByCpf(cpf: string): Promise<any> {
    return this.clienteModel.findOne({ cpf }).exec();
  }

  async findByRg(rg: string): Promise<any> {
    return this.clienteModel.findOne({ rg }).exec();
  }
}
