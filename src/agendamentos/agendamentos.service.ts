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

    async getAll() {
        return await this.agendaModel.find().exec();
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

