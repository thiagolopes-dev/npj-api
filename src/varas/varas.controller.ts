/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VaraDTO } from './dto/vara.dto';
import { VarasService } from './varas.service';


@ApiTags('varas')
@Controller('varas')
export class VarasController {
  constructor(private varaService: VarasService) { }

  @Get()
  async getAll(): Promise<VaraDTO[]> {
    return this.varaService.getAll();
  }

  @Get(':id')
  async getByID(@Param('id') id: string): Promise<VaraDTO> {
    return this.varaService.getByID(id);
  }

  @Post()
  async create(@Body() vara: VaraDTO): Promise<VaraDTO> {
    return this.varaService.create(vara);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() vara: VaraDTO,
  ): Promise<VaraDTO> {
    return this.varaService.update(id, vara);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.varaService.delete(id);
  // }
}
