import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MotivoDTO } from './dto/motivo.dto';
import { MotivoDocument } from './schema/motivo.schema';

@Injectable()
export class MotivosService {
  constructor(
    @InjectModel('Motivo') private readonly motivoModel: Model<MotivoDTO>,
  ) {}

  private validateMotivoDTO(dto: MotivoDTO) {
    const errors: string[] = [];

    if (!dto.descricao) {
      errors.push('O campo descrição é obrigatório.');
    }

    if (!dto.status) {
      errors.push('O campo status é obrigatório.');
    }

    if (errors.length > 0) {
      throw new BadRequestException(errors.join('| '));
    }
  }

  async getAll() {
    return await this.motivoModel.find().exec();
  }

  async getByID(id: string) {
    return await this.motivoModel.findById(id).exec();
  }

  async create(motivoDTO: MotivoDTO): Promise<MotivoDocument> {
    this.validateMotivoDTO(motivoDTO);
    const { descricao, ...rest } = motivoDTO;
    // Verificar se a descrição já existe
    const cnpjExits = await this.findByDescricao(descricao);
    if (cnpjExits) {
      throw new UnauthorizedException('Motivo já cadastrado !');
    }

    const createdMotivo = new this.motivoModel({
      ...rest,
      descricao,
    });
    return createdMotivo.save();
  }

  // Metodo Antigo
  // async create(motivo: MotivoDTO) {
  //   this.validateShippingCreateDTO(motivo);
  //   const createdMotivo = new this.motivoModel(motivo);
  //   return await createdMotivo.save();
  // }

  async update(id: string, motivo: MotivoDTO) {
    await this.motivoModel.updateOne({ _id: id }, motivo).exec();
    return this.getByID(id);
  }

  async delete(id: string) {
    return await this.motivoModel.deleteOne({ _id: id }).exec();
  }

  async findByDescricao(descricao: string): Promise<MotivoDocument> {
    return this.motivoModel.findOne({ descricao }).exec();
  }
}
