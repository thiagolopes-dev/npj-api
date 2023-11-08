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
  ) {}

  async getAll() {
    return await this.motivoModel.find().exec();
  }

  async getPagination(
    page: number,
    perPage: number,
    codigo: string,
    descricao: string,
    status: string,
    usuariocriacao: string,
    datacriacaode: string,
    datacriacaoate: string,
    usuarioalteracao: string,
    dataalteracaode: string,
    dataalteracaoate: string,
  ): Promise<{ data: MotivoDTO[]; totalCount: number; totalPages: number }> {
    const query: any = {};
    if (codigo) {
      query.codigo = codigo;
    }
    if (descricao) {
      query.descricao = { $regex: descricao, $options: 'i' };
    }
    if (usuariocriacao) {
      query.usuariocriacao = { $regex: usuariocriacao, $options: 'i' };
    }
    if (usuarioalteracao) {
      query.usuarioalteracao = { $regex: usuarioalteracao, $options: 'i' };
    }

    if (status) {
      query.status = status;
    }

    if (datacriacaode && datacriacaoate) {
      const startDateTime = new Date(datacriacaode);
      startDateTime.setUTCHours(0, 0, 0, 0);

      const endDateTime = new Date(datacriacaoate);
      endDateTime.setUTCHours(23, 59, 59, 999);
      query.datacriacao = {
        $gte: startDateTime,
        $lt: endDateTime,
      };
    } else if (datacriacaode) {
      const startDateTime = new Date(datacriacaode);
      startDateTime.setUTCHours(0, 0, 0, 0);

      query.datacriacao = {
        $gte: startDateTime,
      };
    } else if (datacriacaoate) {
      const endDateTime = new Date(datacriacaoate);
      endDateTime.setUTCHours(23, 59, 59, 999);

      query.datacriacaoa = {
        $lt: endDateTime,
      };
    }

    if (dataalteracaode && dataalteracaoate) {
      const startDateTime = new Date(dataalteracaode);
      startDateTime.setUTCHours(0, 0, 0, 0);

      const endDateTime = new Date(dataalteracaoate);
      endDateTime.setUTCHours(23, 59, 59, 999);
      query.dataalteracao = {
        $gte: startDateTime,
        $lt: endDateTime,
      };
    } else if (dataalteracaode) {
      const startDateTime = new Date(dataalteracaode);
      startDateTime.setUTCHours(0, 0, 0, 0);

      query.dataalteracao = {
        $gte: startDateTime,
      };
    } else if (dataalteracaoate) {
      const endDateTime = new Date(dataalteracaoate);
      endDateTime.setUTCHours(23, 59, 59, 999);

      query.dataalteracao = {
        $lt: endDateTime,
      };
    }

    const totalItems = await this.motivoModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / perPage);
    const skip = page * perPage;
    const motivoDataArray: MotivoDocument[] = await this.motivoModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();

    return { data: motivoDataArray, totalCount: totalItems, totalPages };
  }

  async getByID(id: string) {
    return await this.motivoModel.findById(id).exec();
  }

  async create(
    motivoDTO: MotivoDTO,
    user: UsuarioDto,
  ): Promise<MotivoDocument> {
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
    const MaxId = await this.motivoModel
      .findOne({}, 'codigo')
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
      dataalteracao: utcMinus3.toDate(),
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
