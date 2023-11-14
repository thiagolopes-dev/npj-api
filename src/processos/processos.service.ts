import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
import { AtualizarProcessoDto } from './dto/atualizar-processo.dto';
import { ProcessoDTO } from './dto/processo.dto';
import { ProcessoDocument, ItensProcesso } from './schema/processo.schema';
import { FlatProcessoDTO } from './dto/flat-processo.dto';

@Injectable()
export class ProcessosService {
  constructor(
    @InjectModel('Processo') private readonly processoModel: Model<ProcessoDTO>,
  ) {}

  async getAll() {
    return this.processoModel.find({ status: true }).exec();
  }

  async getPagination(
    page: number,
    perPage: number,
    numeroprocesso: string,
    desccliente: string,
    descvara: string,
    descmotivo: string,
    descstatus: string,
    processoacompanhamento: string,
    datacriacaode: string,
    datacriacaoate: string,
  ): Promise<{
    data: FlatProcessoDTO[];
    totalCount: number;
    totalPages: number;
  }> {
    const query: any = {};

    if (numeroprocesso) {
      query.numeroprocesso = { $regex: numeroprocesso, $options: 'i' };
    }
    if (desccliente) {
      query.desccliente = { $regex: desccliente, $options: 'i' };
    }
    if (descvara) {
      query.descvara = { $regex: descvara, $options: 'i' };
    }
    if (descmotivo) {
      query.descmotivo = { $regex: descmotivo, $options: 'i' };
    }
    if (descstatus) {
      query.descstatus = { $regex: descstatus, $options: 'i' };
    }
    if (processoacompanhamento) {
      query.processoacompanhamento = {
        $regex: processoacompanhamento,
        $options: 'i',
      };
    }

    if (datacriacaode && datacriacaoate) {
      const startDateTime = new Date(datacriacaode);
      startDateTime.setUTCHours(0, 0, 0, 0);

      const endDateTime = new Date(datacriacaoate);
      endDateTime.setUTCHours(23, 59, 59, 999);

      query.ProcessoAcompanhamento.datacriacao = {
        $gte: startDateTime,
        $lt: endDateTime,
      };
    } else if (datacriacaode) {
      const startDateTime = new Date(datacriacaode);
      startDateTime.setUTCHours(0, 0, 0, 0);

      query.ProcessoAcompanhamento.datacriacao = {
        $gte: startDateTime,
      };
    } else if (datacriacaoate) {
      const endDateTime = new Date(datacriacaoate);
      endDateTime.setUTCHours(23, 59, 59, 999);

      query.ProcessoAcompanhamento.datacriacao = {
        $lt: endDateTime,
      };
    }

    const totalItems = await this.processoModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / perPage);
    const skip = page * perPage;
    const processoDataArray: ProcessoDocument[] = await this.processoModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();
    const flatDataArray: FlatProcessoDTO[] = [];

    for (const processoData of processoDataArray) {
      const flatData: FlatProcessoDTO = {
        _id: processoData._id,
        numeroprocesso: processoData.numeroprocesso,
        desccliente: processoData.cliente.nome,
        descvara: processoData.vara.descricao,
        descmotivo: processoData.motivo.descricao,
        descstatus: processoData.status.descricao,
        usuariocriacao: processoData.usuariocriacao,
        datacriacao: processoData.datacriacao,
        codigointensproc: null,
        infoitensproc: '',
        itemusuariocriacao: '',
        itemdatacriacao: undefined,
      };

      for (const itemProcesso of processoData.itensprocesso) {
        flatData.codigointensproc = itemProcesso.codigo;
        flatData.infoitensproc = itemProcesso.informacao;
        flatData.itemusuariocriacao = itemProcesso.itemusuariocriacao;
        flatData.itemdatacriacao = itemProcesso.itemdatacriacao;
      }

      flatDataArray.push(flatData);
    }

    return { data: flatDataArray, totalCount: totalItems, totalPages };
  }

  async create(
    processoDTO: ProcessoDTO,
    user: UsuarioDto,
  ): Promise<ProcessoDocument> {
    const { numeroprocesso, ...rest } = processoDTO;
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const MaxId = await this.processoModel
      .findOne({}, 'numeroprocesso')
      .sort({ numeroprocesso: -1 });
    const nextId = MaxId ? MaxId.numeroprocesso + 1 : 1;
    // Mapear os itens do processo para adicionar o usuário
    const itensProcessoComUsuario = processoDTO.itensprocesso.map((item) => ({
      ...item,
      itensusuariocriacao: user.username,
      itensdatacriacao: utcMinus3.toISOString(),
      codigo: 1,
    }));
    const createdProcesso = new this.processoModel({
      ...rest,
      numeroprocesso: nextId,
      status: 'AGUARDANDO DESPACHO',
      usuariocriacao: user.username,
      datacriacao: utcMinus3,
      itensprocesso: itensProcessoComUsuario,
    });
    return createdProcesso.save();
  }

  async atualizarInfo(
    id: string,
    atualizarProcessoDto: AtualizarProcessoDto,
    user: UsuarioDto,
  ): Promise<ProcessoDocument> {
    const { informacao, ...rest } = atualizarProcessoDto;
    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');

    const obj = await this.processoModel.findById(id).exec();

    let maxCodigo = 0;
    for (const item of obj.itensprocesso) {
      if (item.codigo > maxCodigo) {
        maxCodigo = item.codigo;
      }
    }

    const nextId = maxCodigo + 1;

    const newItem = new AtualizarProcessoDto();
    newItem.itemusuariocriacao = user.username;
    newItem.itemdatacriacao = utcMinus3.toDate();
    newItem.informacao = informacao;
    newItem.codigo = nextId;

    const itensProcessoCopy = [...obj.itensprocesso];

    itensProcessoCopy.push(newItem);

    obj.itensprocesso = itensProcessoCopy;

    return obj.save();
  }

  async getByID(id: string) {
    return this.processoModel.findById(id).exec();
  }
}
