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
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('codigo') codigo?: string,
    @Query('descricao') descricao?: string,
    @Query('status') status?: string,
    @Query('usuariocriacao') usuariocriacao?: string,
    @Query('datacriacaode') datacriacaode?: string,
    @Query('datacriacaoate') datacriacaoate?: string,
    @Query('usuarioalteracao') usuarioalteracao?: string,
    @Query('dataalteracaode') dataalteracaode?: string,
    @Query('dataalteracaoate') dataalteracaoate?: string,
  ): Promise<{ data: MotivoDTO[], totalCount: number, totalPages: number }> {
    return this.motivoService.getAll(page, perPage, codigo, descricao, status, usuariocriacao, datacriacaode, datacriacaoate, usuarioalteracao, dataalteracaode, dataalteracaoate);
  }

  @ApiResponse({
    status: 200,
    type: MotivoDTO,
    isArray: false,
    description: 'Get ByID de Motivos'
  })
  @UseGuards(AccessTokenGuard)
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
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() motivo: MotivoDTO, @Req() req): Promise<MotivoDTO> {
    return this.motivoService.create(motivo, req.user);
  }

  @ApiResponse({
    status: 200,
    description: 'Motivo atualizado'
  })
  @ApiResponse({
    status: 409,
    description: 'Motivo com descrição ja existente'
  })
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() motivo: MotivoDTO,
    @Req() req
  ): Promise<MotivoDTO> {
    return this.motivoService.update(id, motivo, req.user);
  }

  // @Delete(':id')
  // @UseGuards(AccessTokenGuard)
  // async delete(@Param('id') id: string) {
  //   return this.motivoService.delete(id);
  // }
}
