/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Motivo } from './shared/motivo';
import { MotivoService } from './shared/motivo.service';

@Controller('motivos')
export class MotivoController {
  constructor(private motivoService: MotivoService) {}

  @Get()
  async getAll(): Promise<Motivo[]> {
    return this.motivoService.getAll();
  }

  @Get(':id')
  async getByID(@Param('id') id: string): Promise<Motivo> {
    return this.motivoService.getByID(id);
  }

  @Post()
  async create(@Body() motivo: Motivo): Promise<Motivo> {
    return this.motivoService.create(motivo);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() motivo: Motivo,
  ): Promise<Motivo> {
    return this.motivoService.update(id, motivo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.motivoService.delete(id);
  }
}
