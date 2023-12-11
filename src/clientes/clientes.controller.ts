/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { ClientesService } from './clientes.service';
import { ClienteDTO } from './dto/cliente.dto';

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
  @Get('all')
  async getAll(): Promise<ClienteDTO[]> {
    return this.clienteService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: ClienteDTO,
    isArray: true,
    description: 'Lista de Clientes Paginada'
  })
  @UseGuards(AccessTokenGuard)
  @Get()
  async getPagination(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('codigo') codigo: string,
    @Query('nome') nome: string,
    @Query('cpf') cpf: string,
    @Query('rg') rg: string,
    @Query('cep') cep: string,
    @Query('logradouro') logradouro: string,
    @Query('numero') numero: string,
    @Query('bairro') bairro: string,
    @Query('complemento') complemento: string,
    @Query('cidade') cidade: string,
    @Query('uf') uf: string,
    @Query('telefone') telefone: string,
    @Query('whatsapp') whatsapp: string,
    @Query('status') status: string,
    @Query('usuariocriacao') usuariocriacao?: string,
    @Query('datacriacaode') datacriacaode?: string,
    @Query('datacriacaoate') datacriacaoate?: string,
    @Query('usuarioalteracao') usuarioalteracao?: string,
    @Query('dataalteracaode') dataalteracaode?: string,
    @Query('dataalteracaoate') dataalteracaoate?: string,
    @Query('datanascde') datanascde?: string,
    @Query('datanascate') datanascate?: string,
  ): Promise<{ data: ClienteDTO[], totalCount: number, totalPages: number }> {
    return this.clienteService.getPagination(page, perPage, codigo, nome, cpf, rg,
      cep, logradouro, numero, bairro, complemento, cidade, uf, telefone, whatsapp, status, usuariocriacao,
      datacriacaode, datacriacaoate, usuarioalteracao,
      dataalteracaode, dataalteracaoate, datanascde, datanascate);
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
  async create(@Body() cliente: ClienteDTO, @Req() req): Promise<ClienteDTO> {
    return this.clienteService.create(cliente, req.user);
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
    @Req() req
  ): Promise<ClienteDTO> {
    return this.clienteService.update(id, cliente, req.user);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.clienteService.delete(id);
  // }
}
