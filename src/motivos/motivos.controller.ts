/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MotivoDTO } from './dto/motivo.dto';
import { MotivosService } from './motivos.service';

@ApiTags('motivos')
@Controller('motivos')
export class MotivosController {
  constructor(private motivoService: MotivosService) { }

  @ApiResponse({
    status: 200,
    type: MotivoDTO,
    isArray: true,
    description: 'Lista de Motivos'
  })
  @Get()
  async getAll(): Promise<MotivoDTO[]> {
    return this.motivoService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: MotivoDTO,
    isArray: false,
    description: 'Get ByID de Motivos'
  })
  @Get(':id')
  async getByID(@Param('id') id: string): Promise<MotivoDTO> {
    return this.motivoService.getByID(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Motivo cadastro com sucesso'
  })
  @ApiResponse({
    status: 409,
    description: 'Motivo já cadastrado'
  })
  @ApiForbiddenResponse({
    description: 'Criação Negada'
  })
  @Post()
  async create(@Body() motivo: MotivoDTO): Promise<MotivoDTO> {
    return this.motivoService.create(motivo);
  }

  @ApiResponse({
    status: 200,
    description: 'Motivo atualizado'
  })
  @ApiResponse({
    status: 409,
    description: 'Motivo com descrição ja existente'
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() motivo: MotivoDTO,
  ): Promise<MotivoDTO> {
    return this.motivoService.update(id, motivo);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.motivoService.delete(id);
  // }
}
