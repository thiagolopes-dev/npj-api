import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';

import * as argon2 from 'argon2';
import { AtualizarSenhaDto } from './dto/atualizar-senha.dto';
import { AtualizarUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario.name) private usuarioModel: Model<UsuarioDocument>,
  ) { }

  async getAll(): Promise<UsuarioDto[]> {
    return this.usuarioModel.find({ status: true }).exec()
  }

  async getPagination(page: number, perPage: number, name: string, username: string, status: string, usuariocriacao: string, datacriacaode: string, datacriacaoate: string, usuarioalteracao: string, dataalteracaode: string, dataalteracaoate: string):
    Promise<{ data: UsuarioDto[], totalCount: number, totalPages: number }> {
    const query: any = {};
    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }

    if (username) {
      query.username = { $regex: username, $options: 'i' };
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

    const totalItems = await this.usuarioModel.countDocuments(query).exec();
    const totalPages = Math.ceil(totalItems / perPage);
    const skip = (page) * perPage;
    const usuarioDataArray: UsuarioDocument[] = await this.usuarioModel
      .find(query)
      .sort({ _id: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();


    return { data: usuarioDataArray, totalCount: totalItems, totalPages };
  }

  async criar(criarUsuarioDto: UsuarioDto): Promise<UsuarioDocument> {
    const { username, password, ...rest } = criarUsuarioDto;
    const usuarioExiste = await this.buscarUsuarioNome(username);
    if (usuarioExiste) {
      throw new ConflictException('O e-mail já está cadastrado');
    }
    const hash = await this.hashData(password);
    const novoUsuario = new this.usuarioModel({
      ...rest,
      username,
      password: hash,
    });
    return novoUsuario.save();
  }

  hashData(value: string) {
    return argon2.hash(value);
  }

  async buscarPorId(id: string): Promise<UsuarioDocument> {
    const usuario = await this.usuarioModel.findById(id).exec();
    if (!usuario) {
      throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
    }
    return usuario;
  }

  async buscarUsuarioNome(username: string): Promise<UsuarioDocument> {
    return this.usuarioModel.findOne({ username }).exec();
  }


  async atualizar(id: string, atualizarUsuarioDto: AtualizarUsuarioDto): Promise<UsuarioDocument> {
    if (atualizarUsuarioDto.password) {
      atualizarUsuarioDto.password = await this.hashData(atualizarUsuarioDto.password);
    }
    return this.usuarioModel.findByIdAndUpdate(id, atualizarUsuarioDto, { new: true })
      .exec();
  }

  async updateUserPassword(
    sub: string,
    updatePasswordDto: AtualizarSenhaDto,
  ): Promise<UsuarioDocument> {
    console.log('no inicio');
    // Verificar se o ID do usuário (sub) foi fornecido
    console.log(sub);
    if (!sub) {
      throw new Error('ID do usuário (sub) não fornecido');
    }
    // Buscar o usuário pelo ID (ou "sub") no banco de dados
    const user = await this.buscarPorId(sub);
    console.log(user);
    if (!user) {
      // Se o usuário não foi encontrado, lance uma exceção personalizada
      throw new NotFoundException('Usuário não encontrado');
    }
    try {
      if (updatePasswordDto.password) {
        console.log(updatePasswordDto.password);
        const hashedPassword = await argon2.hash(updatePasswordDto.password);
        // console.log('Senha hasheada:', hashedPassword);
        user.password = hashedPassword;
        console.log(user.password);
        const updatedUser = await user.save();
        return updatedUser;
      } else {
        throw new ConflictException('Nova senha não fornecida');
      }
    } catch (error) {
      // console.error('Erro ao salvar no banco de dados:', error);
      throw new InternalServerErrorException(
        'Não foi possível atualizar a senha.',
      );
    }
  }


  // async deletar(id: string): Promise<UsuarioDocument> {
  //     const usuario = await this.usuarioModel.findByIdAndDelete(id).exec();
  //     if (!usuario) {
  //         throw new NotFoundException(`Usuário com o ID ${id} não encontrado`);
  //     }
  //     return usuario;
  // }
}
