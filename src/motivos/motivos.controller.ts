/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { MotivoDTO } from './dto/motivo.dto';
import { MotivosService } from './motivos.service';

@Controller('motivos')
export class MotivosController {
  constructor(private motivoService: MotivosService) { }

  @Get()
  async getAll(): Promise<MotivoDTO[]> {
    return this.motivoService.getAll();
  }

  @Get(':id')
  async getByID(@Param('id') id: string): Promise<MotivoDTO> {
    return this.motivoService.getByID(id);
  }

  @Post()
  async create(@Body() motivo: MotivoDTO): Promise<MotivoDTO> {
    return this.motivoService.create(motivo);
  }

  // @Post()
  // async create(@Body() motivo: Motivo): Promise<Motivo> {
  //   return this.motivoService.create(motivo);
  // }

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
