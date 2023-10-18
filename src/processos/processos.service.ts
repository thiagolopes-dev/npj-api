import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
import { AtualizarProcessoDto } from './dto/atualizar-processo.dto';
import { ProcessoDTO } from './dto/processo.dto';
import { ProcessoDocument } from './schema/processo.schema';


@Injectable()
export class ProcessosService {
    constructor(
        @InjectModel('Processo') private readonly processoModel: Model<ProcessoDTO>
    ) { }

    async getAll(page: number, perPage: number, numeroprocesso: string, cliente: string,
        vara: string, motivo: string, status: string, processoacompanhamento: string,
        datacriacaode: string, datacriacaoate: string):
        Promise<{ data: ProcessoDTO[], totalCount: number, totalPages: number }> {
        const query: any = {};

        if (numeroprocesso) {
            query.numeroprocesso = numeroprocesso
        }
        if (cliente) {
            query.cliente = cliente
        }
        if (vara) {
            query.vara = vara
        }
        if (motivo) {
            query.motivo = motivo
        }
        if (status) {
            query.status = status
        }
        if (processoacompanhamento) {
            query.processoacompanhamento = processoacompanhamento
        }

        if (datacriacaode && datacriacaoate) {
            const startDateTime = new Date(datacriacaode)
            startDateTime.setUTCHours(0, 0, 0, 0);

            const endDateTime = new Date(datacriacaoate);
            endDateTime.setUTCHours(23, 59, 59, 999)

            query.ProcessoAcompanhamento.datacriacao = {
                $gte: startDateTime,
                $lt: endDateTime
            };
        } else if (datacriacaode) {
            const startDateTime = new Date(datacriacaode)
            startDateTime.setUTCHours(0, 0, 0, 0)

            query.ProcessoAcompanhamento.datacriacao = {
                $gte: startDateTime
            };
        } else if (datacriacaoate) {
            const endDateTime = new Date(datacriacaoate)
            endDateTime.setUTCHours(23, 59, 59, 999)

            query.ProcessoAcompanhamento.datacriacao = {
                $lt: endDateTime
            }
        }

        const totalItems = await this.processoModel.countDocuments(query).exec();
        const totalPages = Math.ceil(totalItems / perPage)
        const skip = (page) * perPage
        const processoDataArray: ProcessoDocument[] = await this.processoModel
            .find(query)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(perPage)
            .exec();

        return { data: processoDataArray, totalCount: totalItems, totalPages }
    }

    async create(processoDTO: ProcessoDTO, user: UsuarioDto): Promise<ProcessoDocument> {
        const { numeroprocesso, ...rest } = processoDTO;
        //TODO Validação de cadastro
        // const descExits = await this.findByDescricao(numeroprontuario);
        // if (descExits) {
        //   throw new ConflictException('Agendamento já cadastrado !');
        // }
        const currentDate = moment.utc();
        const utcMinus3 = currentDate.clone().subtract(3, 'hours');
        const MaxId = await this.processoModel.findOne({}, 'numeroprocesso')
            .sort({ numeroprocesso: -1 });
        const nextId = MaxId ? MaxId.numeroprocesso + 1 : 1;
        const createdProcesso = new this.processoModel({
            ...rest,
            numeroprocesso: nextId,
            status: 'AGUARDANDO DESPACHO',
            usuariocriacao: user.username,
            datacriacao: utcMinus3,
        });
        console.log(createdProcesso);
        return createdProcesso.save();
    }

    async atualizar(id: string, atualizarProcessoDto: AtualizarProcessoDto): Promise<ProcessoDocument> {
        return this.processoModel.findByIdAndUpdate(id, atualizarProcessoDto, { new: true })
            .exec();
    }

    async getByID(id: string) {
        return this.processoModel.findById(id).exec();
    }

}
