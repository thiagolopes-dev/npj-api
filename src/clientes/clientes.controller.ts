/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ClientesService } from './clientes.service';
import { ClienteDTO } from './dto/cliente.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('clientes')
@Controller('clientes')
export class ClientesController {
  constructor(private clienteService: ClientesService) { }

  @ApiResponse({
    status: 200,
    type: ClienteDTO,
    isArray: true,
    description: 'Lista de Clientes'
  })
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAll(): Promise<ClienteDTO[]> {
    return this.clienteService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: ClienteDTO,
    isArray: false,
    description: 'Get ByID de Clientes'
  })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getByID(@Param('id') id: string): Promise<ClienteDTO> {
    return this.clienteService.getByID(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Cliente cadastrado com sucesso'
  })
  @ApiResponse({
    status: 409,
    description: 'Cliente já cadastrado'
  })
  @ApiForbiddenResponse({
    description: 'Criação Negada'
  })
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() cliente: ClienteDTO): Promise<ClienteDTO> {
    return this.clienteService.create(cliente);
  }

  @ApiResponse({
    status: 200,
    description: 'Cliente atualizado'
  })
  @ApiResponse({
    status: 409,
    description: 'Cliente com e-mail já existente'
  })
  @UseGuards(AccessTokenGuard)
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
