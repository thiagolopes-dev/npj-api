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
import { Vara } from './shared/vara';
import { VaraService } from './shared/vara.service';

@Controller('varas')
export class VaraController {
  constructor(private varaService: VaraService) {}

  @Get()
  async getAll(): Promise<Vara[]> {
    return this.varaService.getAll();
  }

  @Get(':id')
  async getByID(@Param('id') id: string): Promise<Vara> {
    return this.varaService.getByID(id);
  }

  @Post()
  async create(@Body() motivo: Vara): Promise<Vara> {
    return this.varaService.create(motivo);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() motivo: Vara): Promise<Vara> {
    return this.varaService.update(id, motivo);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.varaService.delete(id);
  }
}
