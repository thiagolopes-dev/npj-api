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
    //consulta no mongodb para obter o ultimo e maior valor
    const MaxId = await this.motivoModel.findOne({}, 'codigo')
      .sort({ codigo: -1 });
    const nextId = MaxId ? MaxId.codigo + 1 : 1;
    const createdMotivo = new this.motivoModel({
      ...rest,
      codigo: nextId,
      descricao,
    });
    return createdMotivo.save();
  }

  async update(id: string, motivo: MotivoDTO) {
    const { descricao, ...rest } = motivo;

    // Verifique se há outros motivos com a mesma descrição e status true (exceto o motivo atual)
    const descExists = await this.motivoModel.findOne({
      descricao,
      status: true,
      _id: { $ne: id }, // exclua o motivo atual da consulta
    });
    console.log(descExists);
    if (descExists) {
      throw new ConflictException('Já existe um motivo com esta descrição!');
    }

    const updatedMotivo = {
      ...rest,
      descricao,
    };

    await this.motivoModel
      .updateOne({ _id: id }, { $set: updatedMotivo })
      .exec();

    return this.getByID(id);
  }


  async delete(id: string) {
    return await this.motivoModel.deleteOne({ _id: id }).exec();
  }

  async findByDescricao(descricao: string): Promise<MotivoDocument> {
    return this.motivoModel.findOne({ descricao }).exec();
  }
}
