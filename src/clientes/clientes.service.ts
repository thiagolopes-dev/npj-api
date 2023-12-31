import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as moment from 'moment-timezone';
import { Model } from 'mongoose';
import { UsuarioDto } from 'src/usuarios/dto/usuario.dto';
import { ClienteDTO } from './dto/cliente.dto';
import { ClienteDocument } from './schema/cliente.schema';

@Injectable()
export class ClientesService {
  constructor(
    @InjectModel('Cliente') private readonly clienteModel: Model<ClienteDTO>,
  ) { }

  async getAll() {
    return this.clienteModel.find({ status: true }).exec();
  }

  async getPagination(page: number, perPage: number, codigo: string, nome: string, cpf: string, rg: string, cep: string,
    logradouro: string, numero: string, bairro: string, complemento: string, cidade: string, uf: string,
    telefone: string, whatsapp: string, status: string, usuariocriacao: string,
    datacriacaode: string, datacriacaoate: string, usuarioalteracao: string, dataalteracaode: string, dataalteracaoate: string, datanascde: string, datanascate: string):
    Promise<{ data: ClienteDTO[], totalCount: number, totalPages: number }> {

    const query: any = {};

    if (codigo) {
      const parsedCodigo = parseInt(codigo, 10); // Tente converter a string para um número
      if (!isNaN(parsedCodigo)) {
        // A conversão foi bem-sucedida, atribua o valor convertido à query
        query.codigo = parsedCodigo;
      }
    }
    if (nome) {
      query.nome = { $regex: nome, $options: 'i' };
    }
    if (cpf) {
      query.cpf = { $regex: cpf, $options: 'i' };
    }
    if (rg) {
      query.rg = { $regex: rg, $options: 'i' };
    }
    if (cep) {
      query.cep = { $regex: cep, $options: 'i' };
    }
    if (logradouro) {
      query.logradouro = { $regex: logradouro, $options: 'i' };
    }
    if (numero) {
      query.numero = { $regex: numero, $options: 'i' };
    }
    if (bairro) {
      query.bairro = { $regex: bairro, $options: 'i' };
    }
    if (complemento) {
      query.complemento = { $regex: complemento, $options: 'i' };
    }
    if (cidade) {
      query.cidade = { $regex: cidade, $options: 'i' };
    }
    if (uf) {
      query.uf = { $regex: uf, $options: 'i' };
    }
    if (telefone) {
      query.telefone = { $regex: telefone, $options: 'i' };
    }
    if (whatsapp) {
      query.whatsapp = { $regex: whatsapp, $options: 'i' };
    }
    if (status) {
      query.status = status;
    }
    if (usuariocriacao) {
      query.usuariocriacao = { $regex: usuariocriacao, $options: 'i' };
    }
    if (usuarioalteracao) {
      query.usuarioalteracao = { $regex: usuarioalteracao, $options: 'i' };
    }


    if (datanascde && datanascate) {
      const startDateTime = new Date(datanascde);
      startDateTime.setUTCHours(0, 0, 0, 0);

      const endDateTime = new Date(datanascate);
      endDateTime.setUTCHours(23, 59, 59, 999);
      query.datanasc = {
        $gte: startDateTime,
        $lt: endDateTime
      };
    } else if (datanascde) {
      const startDateTime = new Date(datanascde);
      startDateTime.setUTCHours(0, 0, 0, 0);

      query.datanasc = {
        $gte: startDateTime
      };
    } else if (datanascate) {
      const endDateTime = new Date(datanascate);
      endDateTime.setUTCHours(23, 59, 59, 999);

      query.datanasc = {
        $lt: endDateTime
      };
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

    const totalItems = await this.clienteModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page) * perPage;
    const clienteDataArray: ClienteDocument[] = await this.clienteModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();


    return { data: clienteDataArray, totalCount: totalItems, totalPages };
  }

  async getByID(id: string) {
    return await this.clienteModel.findById(id).exec();
  }

  async create(cliente: ClienteDTO, user: UsuarioDto) {
    const { cpf, ...rest } = cliente;

    const [cpfExistente] = await Promise.all([
      this.findByCpf(cpf)
    ]);

    if (cpfExistente) {
      throw new ConflictException('CPF já cadastrado');
    }
    // if (rgExistente && rgExistente.rg !== null) {
    //   throw new ConflictException('RG já cadastrado');
    // }

    // if (cliente.cpf.length > 11 || cliente.cpf.length < 11) {
    //   throw new ConflictException('CPF deve conter 11 digitos')
    // }

    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');
    const MaxId = await this.clienteModel.findOne({}, 'codigo')
      .sort({ codigo: -1 });
    const nextId = MaxId ? MaxId.codigo + 1 : 1;
    const createdCliente = new this.clienteModel({
      ...rest,
      codigo: nextId,
      cpf,
      usuariocriacao: user.username,
      datacriacao: utcMinus3,
    });

    try {
      return await createdCliente.save();
    } catch (error) {
      throw new NotFoundException('Cliente não pôde ser criado', error.message);
    }
  }

  async update(id: string, cliente: ClienteDTO, user: UsuarioDto) {
    const { nome, ...rest } = cliente

    const currentDate = moment.utc();
    const utcMinus3 = currentDate.clone().subtract(3, 'hours');

    const updatedCliente = {
      ...rest,
      nome,
      usuarioalteracao: user.username,
      dataalteracao: utcMinus3
    }

    await this.clienteModel.updateOne({ _id: id }, { $set: updatedCliente }).exec();
    return this.getByID(id);
  }

  async delete(id: string) {
    return await this.clienteModel.deleteOne({ _id: id }).exec();
  }

  async findByCpf(cpf: string): Promise<any> {
    return this.clienteModel.findOne({ cpf }).exec();
  }

  async findByRg(rg: string): Promise<any> {
    return this.clienteModel.findOne({ rg }).exec();
  }

}
