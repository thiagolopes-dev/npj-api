import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
import { AgendamentoDTO } from './dto/agendamento.dto';
import { FlatAgendamentoDTO } from './dto/flat-agendamento.dto';
import { AgendamentoDocument } from './schema/agendamento.schema';

@Injectable()
export class AgendamentosService {
  constructor(
    @InjectModel('Agendamento')
    private readonly agendaModel: Model<AgendamentoDTO>,
  ) { }

  async getAll() {
    return this.agendaModel.find({ status: true }).exec();
  }

  async getPagination(
    page: number,
    perPage: number,
    atendimento: string,
    numeroprontuario: string,
    dataatendimentode: string,
    dataatendimentoate: string,
    dataalteracaode: string,
    dataalteracaoate: string,
    desccliente: string,
    descmotivo: string,
    descstatus: string,
    datacriacaode: string,
    datacriacaoate: string,
    usuariocriacao: string,
    usuarioalteracao: string
  ): Promise<{
    data: FlatAgendamentoDTO[];
    totalCount: number;
    totalPages: number;
  }> {
    const query: any = {};
    if (atendimento) {
      const parsedCodigo = parseInt(atendimento, 10); // Tente converter a string para um número
      if (!isNaN(parsedCodigo)) {
        // A conversão foi bem-sucedida, atribua o valor convertido à query
        query.atendimento = parsedCodigo;
      }
    }
    if (numeroprontuario) {
      const parsedCodigo = parseInt(numeroprontuario, 10); // Tente converter a string para um número
      if (!isNaN(parsedCodigo)) {
        // A conversão foi bem-sucedida, atribua o valor convertido à query
        query.numeroprontuario = parsedCodigo;
      }
    }
    if (desccliente) {
      const descricaoRegex = new RegExp(desccliente, 'i');
      query['cliente.nome'] = descricaoRegex;
    }

    if (descmotivo) {
      const descricaoRegex = new RegExp(descmotivo, 'i');
      query['motivo.descricao'] = descricaoRegex;
    }
    if (descstatus) {
      const descricaoRegex = new RegExp(descstatus, 'i');
      query['status.descricao'] = descricaoRegex;
    }

    if (usuariocriacao) {
      query.usuariocriacao = { $regex: usuariocriacao, $options: 'i' };
    }
    if (usuarioalteracao) {
      query.usuarioalteracao = { $regex: usuarioalteracao, $options: 'i' };
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

    if (dataatendimentode && dataatendimentoate) {
      const startDateTime = new Date(dataatendimentode);
      startDateTime.setUTCHours(0, 0, 0, 0);

      const endDateTime = new Date(dataatendimentoate);
      endDateTime.setUTCHours(23, 59, 59, 999);
      query.dataatendimento = {
        $gte: startDateTime,
        $lt: endDateTime,
      };
    } else if (dataatendimentode) {
      const startDateTime = new Date(dataatendimentode);
      startDateTime.setUTCHours(0, 0, 0, 0);

      query.dataatendimento = {
        $gte: startDateTime,
      };
    } else if (dataatendimentoate) {
      const endDateTime = new Date(dataatendimentoate);
      endDateTime.setUTCHours(23, 59, 59, 999);

      query.dataatendimento = {
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

    const totalItems = await this.agendaModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / perPage);
    const skip = page * perPage;
    const agendaDataArray: AgendamentoDocument[] = await this.agendaModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();
    const flatDataArray: FlatAgendamentoDTO[] = [];

    for (const agendaData of agendaDataArray) {
      const flatData: FlatAgendamentoDTO = {
        _id: agendaData._id,
        atendimento: agendaData.atendimento,
        numeroprontuario: agendaData.numeroprontuario,
        dataatendimento: agendaData.dataatendimento,
        desccliente: agendaData.cliente.nome,
        descmotivo: agendaData.motivo.descricao,
        descstatus: agendaData.status.descricao,
        usuariocriacao: agendaData.usuariocriacao,
        dataalteracao: agendaData.dataalteracao,
        usuarioalteracao: agendaData.usuarioalteracao,
        datacriacao: agendaData.datacriacao,
      };

      flatDataArray.push(flatData);
    }

    return { data: flatDataArray, totalCount: totalItems, totalPages };
  }

  async getByID(id: string) {
    return await this.agendaModel.findById(id).exec();
  }

  async create(
    agendaDTO: AgendamentoDTO,
    user: UsuarioDto,
  ): Promise<AgendamentoDocument> {
    const { numeroprontuario, ...rest } = agendaDTO;
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const MaxId = await this.agendaModel
      .findOne({}, 'atendimento')
      .sort({ atendimento: -1 });
    const nextId = MaxId ? MaxId.atendimento + 1 : 1;
    const createdAgenda = new this.agendaModel({
      ...rest,
      atendimento: nextId,
      numeroprontuario: agendaDTO.cliente.codigo,
      usuariocriacao: user.username,
      datacriacao: utcMinus3,
    });
    return createdAgenda.save();
  }

  async update(id: string, status: AgendamentoDTO, user: UsuarioDto) {
    const { atendimento, ...rest } = status;
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const updatedAgendamento = {
      ...rest,
      atendimento,
      usuarioalteracao: user.username,
      dataalteracao: utcMinus3,
    };

    await this.agendaModel
      .updateOne({ _id: id }, { $set: updatedAgendamento })
      .exec();
    return this.getByID(id);
  }

  async delete(id: string) {
    return await this.agendaModel.deleteOne({ _id: id }).exec();
  }

  async findByProntuario(
    numeroprontuario: number,
  ): Promise<AgendamentoDocument> {
    return this.agendaModel.findOne({ numeroprontuario }).exec();
  }
}
