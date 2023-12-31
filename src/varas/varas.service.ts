import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
import { VaraDTO } from './dto/vara.dto';
import { VaraDocument } from './schema/vara.schema';

@Injectable()
export class VarasService {
  constructor(
    @InjectModel('Vara') private readonly varaModel: Model<VaraDTO>,
  ) { }

  async getAll() {
    return this.varaModel.find({ status: true }).exec();
  }

  async getPagination(page: number, perPage: number, codigo: string, descricao: string, status: string, usuariocriacao: string, datacriacaode: string, datacriacaoate: string, usuarioalteracao: string, dataalteracaode: string, dataalteracaoate: string):
    Promise<{ data: VaraDTO[], totalCount: number, totalPages: number }> {
    const query: any = {};
    if (codigo) {
      const parsedCodigo = parseInt(codigo, 10); // Tente converter a string para um número
      if (!isNaN(parsedCodigo)) {
        // A conversão foi bem-sucedida, atribua o valor convertido à query
        query.codigo = parsedCodigo;
      }
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

    const totalItems = await this.varaModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page) * perPage;
    const varaDataArray: VaraDocument[] = await this.varaModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();


    return { data: varaDataArray, totalCount: totalItems, totalPages };
  }

  async getByID(id: string) {
    return await this.varaModel.findById(id).exec();
  }

  async create(vara: VaraDTO, user: UsuarioDto): Promise<VaraDocument> {
    const { descricao, ...rest } = vara;
    const descExits = await this.findByDescricao(descricao);
    if (descExits) {
      throw new ConflictException('Descrição já existente!');
    }
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const MaxId = await this.varaModel.findOne({}, 'codigo')
      .sort({ codigo: -1 });
    const nextId = MaxId ? MaxId.codigo + 1 : 1;
    const createdVara = new this.varaModel({
      ...rest,
      codigo: nextId,
      descricao,
      usuariocriacao: user.username,
      datacriacao: utcMinus3,
    });
    return createdVara.save();
  }

  async update(id: string, vara: VaraDTO, user: UsuarioDto) {
    const { descricao, ...rest } = vara;
    const descExists = await this.varaModel.findOne({
      descricao,
      status: true,
      _id: { $ne: id },
    });
    if (descExists) {
      throw new ConflictException('Já existe uma vara com esta descrição!');
    }
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const updatedVara = {
      ...rest,
      descricao,
      usuarioalteracao: user.username,
      dataalteracao: utcMinus3.toDate(),
    };

    await this.varaModel.updateOne({ _id: id }, { $set: updatedVara }).exec();
    return this.getByID(id);
  }

  async delete(id: string) {
    return await this.varaModel.deleteOne({ _id: id }).exec();
  }

  async findByDescricao(descricao: string): Promise<VaraDocument> {
    return this.varaModel.findOne({ descricao }).exec();
  }
}
