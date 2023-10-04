import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
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


  async create(motivoDTO: MotivoDTO, user: UsuarioDto): Promise<MotivoDocument> {
    const { descricao, ...rest } = motivoDTO;
    // Verificar se a descrição já existe
    const descExists = await this.findByDescricao(descricao);
    if (descExists) {
      throw new ConflictException('Motivo já cadastrado!');
    }
    // Define as informações de criação e atualização
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    //consulta no mongodb para obter o ultimo e maior valor
    const MaxId = await this.motivoModel.findOne({}, 'codigo')
      .sort({ codigo: -1 });
    const nextId = MaxId ? MaxId.codigo + 1 : 1;

    const createdMotivo = new this.motivoModel({
      ...rest,
      codigo: nextId,
      descricao,
      usuariocriacao: user.username,
      datacriacao: utcMinus3,
    });
    return createdMotivo.save();
  }

  async update(id: string, motivo: MotivoDTO, user: UsuarioDto) {
    const { descricao, ...rest } = motivo;

    // Verifique se há outros motivos com a mesma descrição e status true (exceto o motivo atual)
    const descExists = await this.motivoModel.findOne({
      descricao,
      status: true,
      _id: { $ne: id }, // exclua o motivo atual da consulta
    });
    if (descExists) {
      throw new ConflictException('Já existe um motivo com esta descrição!');
    }
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const updatedMotivo = {
      ...rest,
      descricao,
      usuarioalteracao: user.username,
      dataalteracao: utcMinus3,
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
