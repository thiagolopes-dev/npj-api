/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { StatusDTO } from './dto/status.dto';
import { StatusService } from './status.service';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private statusService: StatusService) { }

  @ApiResponse({
    status: 200,
    type: StatusDTO,
    isArray: true,
    description: 'Lista de Status'
  })
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('descricao') descricao?: string,
    @Query('status') status?: string,
    @Query('usuariocriacao') usuariocriacao?: string,
    @Query('datacriacaode') datacriacaode?: string,
    @Query('datacriacaoate') datacriacaoate?: string,
    @Query('usuarioalteracao') usuarioalteracao?: string,
    @Query('dataalteracaode') dataalteracaode?: string,
    @Query('dataalteracaoate') dataalteracaoate?: string,
  ): Promise<{ data: StatusDTO[], totalCount: number, totalPages: number }> {
    return this.statusService.getAll(page, perPage, descricao, status, usuariocriacao, datacriacaode, datacriacaoate, usuarioalteracao, dataalteracaode, dataalteracaoate);
  }

  @ApiResponse({
    status: 200,
    type: StatusDTO,
    isArray: false,
    description: 'Get ByID de Status'
  })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getByID(@Param('id') id: string): Promise<StatusDTO> {
    return this.statusService.getByID(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Status cadastro com sucesso'
  })
  @ApiResponse({
    status: 409,
    description: 'Status já cadastrado'
  })
  @ApiForbiddenResponse({
    description: 'Criação Negada'
  })
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() status: StatusDTO): Promise<StatusDTO> {
    return this.statusService.create(status);
  }

  @ApiResponse({
    status: 200,
    description: 'Status atualizado'
  })
  @ApiResponse({
    status: 409,
    description: 'Status com descrição ja existente'
  })
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() status: StatusDTO,
  ): Promise<StatusDTO> {
    return this.statusService.update(id, status);
  }

}
