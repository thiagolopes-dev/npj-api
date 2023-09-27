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
import { ClientesService } from './clientes.service';
import { ClienteDTO } from './dto/cliente.dto';

@ApiTags('clientes')
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
  async create(@Body() cliente: ClienteDTO): Promise<ClienteDTO> {
    return this.clienteService.create(cliente);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() cliente: ClienteDTO,
  ): Promise<ClienteDTO> {
    return this.clienteService.update(id, cliente);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.clienteService.delete(id);
  // }
}
