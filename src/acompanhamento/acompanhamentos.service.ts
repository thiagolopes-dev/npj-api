import { AcompanhamentoDocument, ProcessoAcompanhamento } from './schema/acompanhamento.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { AcompanhamentoDTO } from './dto/acompanhamento.dto';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
import * as moment from 'moment-timezone';

@Injectable()
export class AcompanhamentosService {
    constructor(
        @InjectModel('Acompanhamento') private readonly acompanhamentoModel: Model<AcompanhamentoDTO>
    ) {}

    async getAll(page: number, perPage: number, numeroprocesso: string, cliente: string,
        vara: string, motivo: string, status: string, processoacompanhamento: string,
        datacriacaode: string, datacriacaoate: string):
        Promise<{ data: AcompanhamentoDTO[], totalCount: number, totalPages: number }> {
            const query: any = {};

            if(numeroprocesso) {
                query.numeroprocesso = numeroprocesso
            }
            if(cliente) {
                query.cliente = cliente
            }
            if(vara) {
                query.vara = vara
            }
            if(motivo) {
                query.motivo = motivo
            }
            if(status) {
                query.status = status
            }
            if(processoacompanhamento) {
                query.processoacompanhamento = processoacompanhamento
            }

            if(datacriacaode && datacriacaoate) {
                const startDateTime = new Date(datacriacaode)
                startDateTime.setUTCHours(0, 0, 0, 0);

                const endDateTime = new Date(datacriacaoate);
                endDateTime.setUTCHours(23, 59, 59, 999)

                query.ProcessoAcompanhamento.datacriacao = {
                    $gte: startDateTime,
                    $lt:  endDateTime
                };
            } else if (datacriacaode) {
                const startDateTime = new Date(datacriacaode)
                startDateTime.setUTCHours(0, 0, 0, 0)

                query.ProcessoAcompanhamento.datacriacao = {
                    $gte: startDateTime
                };
            } else if(datacriacaoate) {
                const endDateTime = new Date(datacriacaoate)
                endDateTime.setUTCHours(23, 59, 59, 999)

                query.ProcessoAcompanhamento.datacriacao = {
                    $lt: endDateTime
                }
            }

            const totalItems = await this.acompanhamentoModel.countDocuments(query).exec();
            const totalPages = Math.ceil(totalItems / perPage)
            const skip = (page) * perPage
            const acompanhamentoDataArray: AcompanhamentoDocument[] = await this.acompanhamentoModel
             .find(query)
             .sort({ _id: -1})
             .skip(skip)
             .limit(perPage)
             .exec();

             return { data: acompanhamentoDataArray, totalCount: totalItems, totalPages }
        }

    async getByID(id: string) {
        return this.acompanhamentoModel.findById(id).exec();
    }

    async create(acompanhamentoDTO: AcompanhamentoDTO, user: UsuarioDto): Promise<AcompanhamentoDocument> {
        const { numeroprocesso, ...rest } = acompanhamentoDTO

        const numProcesso = acompanhamentoDTO.numeroprocesso;

        const MaxIdCod = await this.acompanhamentoModel.findOne({}, 'codigo')
        .sort({ codigo: -1 });
        const nextIdCod = MaxIdCod ? MaxIdCod.processoacompanhamento.codigo + 1 : 1;

        if(!numProcesso) {
            const MaxIdProc = await this.acompanhamentoModel.findOne({}, 'numeroprocesso')
            .sort({ numeroprocesso: -1 });
            const nextIdProc = MaxIdProc ? MaxIdProc.numeroprocesso + 1 : 1;

            const createdAcompanhamento1 = new this.acompanhamentoModel ({
                ...rest,
                numeroprocesso: nextIdProc,
                codigo: nextIdCod,
                usuariocriacao: user.username
            })

            return createdAcompanhamento1.save()

        } else {
            const createdAcompanhamento2 = new this.acompanhamentoModel ({
                ...rest,
                numeroprocesso: acompanhamentoDTO.numeroprocesso,
                codigo: nextIdCod,
                usuariocriacao: user.username
            })
            
            return createdAcompanhamento2.save()
        }   
    }
}
