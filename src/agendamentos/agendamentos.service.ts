import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AgendamentoDTO } from './dto/agendamento.dto';
import { AgendamentoDocument } from './schema/agendamento.schema';

@Injectable()
export class AgendamentosService {
    constructor(
        @InjectModel('Agendamento') private readonly agendaModel: Model<AgendamentoDTO>,
    ) { }

    async getAll(page: number, perPage: number, atendimento: string, numeroprontuario: string, cliente: string, status: string, motivo: string,
         usuariocriacao: string, datacriacaode: string, datacriacaoate: string, usuarioalteracao: string, dataalteracaode: string, dataalteracaoate: string):
  Promise<{ data: AgendamentoDTO[], totalCount: number, totalPages: number }> {
  const query: any = {};
  if (atendimento) {
    query.atendimento = atendimento;
  }
  if (numeroprontuario) {
    query.numeroprontuario = numeroprontuario;
  }
  if (cliente) {
    query.cliente = cliente;
  }
  if (status) {
    query.status = status;
  }
  if (motivo) {
    query.motivo = motivo;
  }
  if (usuariocriacao) {
    query.usuariocriacao = usuariocriacao;
  }
  if (usuarioalteracao) {
    query.usuarioalteracao = usuarioalteracao;
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


  return { data: agendamentoDataArray, totalCount: totalItems, totalPages };
}

    async getByID(id: string) {
        return await this.agendaModel.findById(id).exec();
    }

    async create(agendaDTO: AgendamentoDTO): Promise<AgendamentoDocument> {
        const { numeroprontuario, ...rest } = agendaDTO;
        //TODO Validação de cadastro
        // const descExits = await this.findByDescricao(numeroprontuario);
        // if (descExits) {
        //   throw new ConflictException('Agendamento já cadastrado !');
        // }
        const MaxId = await this.agendaModel.findOne({}, 'atendimento')
            .sort({ atendimento: -1 });
        const nextId = MaxId ? MaxId.atendimento + 1 : 1;
        const createdAgenda = new this.agendaModel({
            ...rest,
            atendimento: nextId,
            numeroprontuario: agendaDTO.cliente.codigo,
        });
        return createdAgenda.save();
    }

    async update(id: string, status: AgendamentoDTO) {
        const { numeroprontuario, ...rest } = status;
        const descExists = await this.agendaModel.findOne({
            numeroprontuario,
            status: true,
            _id: { $ne: id },
        });
        if (descExists) {
            throw new ConflictException('Já existe uma agenda com esta descrição!');
        }

        const updatedStatus = {
            ...rest,
            numeroprontuario,
        };

        await this.agendaModel.updateOne({ _id: id }, { $set: updatedStatus }).exec();
        return this.getByID(id);
    }

    async delete(id: string) {
        return await this.agendaModel.deleteOne({ _id: id }).exec();
    }

    async findByProntuario(numeroprontuario: number): Promise<AgendamentoDocument> {
        return this.agendaModel.findOne({ numeroprontuario }).exec();
    }
}

