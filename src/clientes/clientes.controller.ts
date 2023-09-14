/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClienteDTO } from './dto/cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private clienteService: ClientesService) { }

  @Get()
  async getAll(): Promise<ClienteDTO[]> {
    return this.clienteService.getAll();
  }

  @Get(':id')
  async getByID(@Param('id') id: string): Promise<ClienteDTO> {
    return this.clienteService.getByID(id);
  }

  @Post()
  async create(@Body() motivo: ClienteDTO): Promise<ClienteDTO> {
    return this.clienteService.create(motivo);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() motivo: ClienteDTO,
  ): Promise<ClienteDTO> {
    return this.clienteService.update(id, motivo);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.clienteService.delete(id);
  // }
}
