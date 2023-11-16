import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusDTO } from './dto/status.dto';
import { StatusDocument } from './schema/status.schema';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel('Status') private readonly statusModel: Model<StatusDTO>,
  ) { }

  async getAll() {
    return this.statusModel.find({ status: true }).exec();
  }

  async getPagination(page: number, perPage: number, codigo: string, descricao: string, status: string, usuariocriacao: string, datacriacaode: string, datacriacaoate: string, usuarioalteracao: string, dataalteracaode: string, dataalteracaoate: string):
  Promise<{ data: StatusDTO[], totalCount: number, totalPages: number }> {
  const query: any = {};
  if(codigo) {
    query.codigo = codigo
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
      $lt: endDateTime
    };
  } else if (datacriacaode) {
    const startDateTime = new Date(datacriacaode);
    startDateTime.setUTCHours(0, 0, 0, 0);

    query.datacriacao = {
      $gte: startDateTime
    };
  } else if (datacriacaoate) {
    const endDateTime = new Date(datacriacaoate);
    endDateTime.setUTCHours(23, 59, 59, 999);

    query.datacriacaoa = {
      $lt: endDateTime
    };
  }

  if (dataalteracaode && dataalteracaoate) {
    const startDateTime = new Date(dataalteracaode);
    startDateTime.setUTCHours(0, 0, 0, 0);

    const endDateTime = new Date(dataalteracaoate);
    endDateTime.setUTCHours(23, 59, 59, 999);
    query.dataalteracao = {
      $gte: startDateTime,
      $lt: endDateTime
    };
  } else if (dataalteracaode) {
    const startDateTime = new Date(dataalteracaode);
    startDateTime.setUTCHours(0, 0, 0, 0);

    query.dataalteracao = {
      $gte: startDateTime
    };
  } else if (dataalteracaoate) {
    const endDateTime = new Date(dataalteracaoate);
    endDateTime.setUTCHours(23, 59, 59, 999);

    query.dataalteracao = {
      $lt: endDateTime
    };
  }

  const totalItems = await this.statusModel.countDocuments(query).exec();
  const totalPages = Math.ceil(totalItems / perPage);
  const skip = (page) * perPage;
  const statusDataArray: StatusDocument[] = await this.statusModel
    .find(query)
    .sort({ _id: -1 })
    .skip(skip)
    .limit(perPage)
    .exec();


  return { data: statusDataArray, totalCount: totalItems, totalPages };
}

  async getByID(id: string) {
    return await this.statusModel.findById(id).exec();
  }

  async create(statusDTO: StatusDTO, user: UsuarioDto): Promise<StatusDocument> {
    const { descricao, ...rest } = statusDTO;
    const descExits = await this.findByDescricao(descricao);
    if (descExits) {
      throw new ConflictException('Status já cadastrado !');
    }
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const MaxId = await this.statusModel.findOne({}, 'codigo')
      .sort({ codigo: -1 });
    const nextId = MaxId ? MaxId.codigo + 1 : 1;
    const createdStatus = new this.statusModel({
      ...rest,
      codigo: nextId,
      descricao,
      usuariocriacao: user.username,
      datacriacao: utcMinus3.toDate(),
    });
    return createdStatus.save();
  }

  async update(id: string, status: StatusDTO, user: UsuarioDto) {
    const { descricao, ...rest } = status;
    const descExists = await this.statusModel.findOne({
      descricao,
      status: true,
      _id: { $ne: id },
    });
    if (descExists) {
      throw new ConflictException('Já existe um status com esta descrição!');
    }
    
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const updatedStatus = {
      ...rest,
      descricao,
      usuarioalteracao: user.username,
      dataalteracao: utcMinus3.toDate(),
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
