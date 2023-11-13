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
    @InjectModel('Agendamento') private readonly agendaModel: Model<AgendamentoDTO>,
  ) { }

  async getAll() {
    return this.agendaModel.find({ status: true }).exec();
  }

  async getPagination(page: number, perPage: number, atendimento: string, desccliente: string, descstatus: string, descmotivo: string,
    usuariocriacao: string, datacriacaode: string, datacriacaoate: string, usuarioalteracao: string, dataalteracaode: string, dataalteracaoate: string):
    Promise<{ data: FlatAgendamentoDTO[], totalCount: number, totalPages: number }> {
    const query: any = {};
    if (atendimento) {
      query.atendimento = atendimento;
    }

    if (desccliente) {
      query.desccliente = { $regex: desccliente, $options: 'i' };
    }
    if (descstatus) {
      query.descstatus = { $regex: descstatus, $options: 'i' };
    }
    if (descmotivo) {
      query.descmotivo = { $regex: descmotivo, $options: 'i' };
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

    const totalItems = await this.agendaModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page) * perPage;
    const agendamentoDataArray: AgendamentoDocument[] = await this.agendaModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();
    const flatDataArray: FlatAgendamentoDTO[] = [];

    // Percorre os dados do XML (NFE e CTE)
    for (const agendaData of agendamentoDataArray) {
      // Realiza a junção dos dados em formato FLAT
      const flatData: FlatAgendamentoDTO = {
        _id: agendaData._id,
        atendimento: agendaData.atendimento,
        numeroprontuario: agendaData.numeroprontuario,
        dataatendimento: agendaData.dataatendimento,
        desccliente: agendaData.cliente.nome,
        descmotivo: agendaData.motivo.descricao,
        descstatus: agendaData.status.descricao,
        usuariocriacao: agendaData.usuariocriacao,
        datacriacao: agendaData.datacriacao,
        usuarioalteracao: agendaData.usuarioalteracao,
        dataalteracao: agendaData.dataalteracao
      };

      flatDataArray.push(flatData);
    }
    return { data: flatDataArray, totalCount: totalItems, totalPages };
    // return { data: agendamentoDataArray, totalCount: totalItems, totalPages };
  }

  async getByID(id: string) {
    return await this.agendaModel.findById(id).exec();
  }

  async create(agendaDTO: AgendamentoDTO, user: UsuarioDto): Promise<AgendamentoDocument> {
    const { numeroprontuario, ...rest } = agendaDTO;
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const MaxId = await this.agendaModel.findOne({}, 'atendimento')
      .sort({ atendimento: -1 });
    const nextId = MaxId ? MaxId.atendimento + 1 : 1;
    const createdAgenda = new this.agendaModel({
      ...rest,
      atendimento: nextId,
      numeroprontuario: agendaDTO.cliente.codigo,
      usuariocriacao: user.username,
      datacriacao: utcMinus3
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
      dataalteracao: utcMinus3
    };

    await this.agendaModel.updateOne({ _id: id }, { $set: updatedAgendamento }).exec();
    return this.getByID(id);
  }

  async delete(id: string) {
    return await this.agendaModel.deleteOne({ _id: id }).exec();
  }

  async findByProntuario(numeroprontuario: number): Promise<AgendamentoDocument> {
    return this.agendaModel.findOne({ numeroprontuario }).exec();
  }
}

