import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { AgendamentosService } from './agendamentos.service';
import { AgendamentoDTO } from './dto/agendamento.dto';
import { FlatAgendamentoDTO } from './dto/flat-agendamento.dto';

@ApiTags('agendamento')

@Controller('agendamentos')
export class AgendamentosController {

    constructor(private agendaService: AgendamentosService) { }

    @ApiResponse({
        status: 200,
        type: AgendamentoDTO,
        isArray: true,
        description: 'Lista de Agendamentos'
    })
    @UseGuards(AccessTokenGuard)
    @Get('all')
    async getAll(): Promise<AgendamentoDTO[]> {
        return this.agendaService.getAllAprovados();
    }

    @ApiResponse({
        status: 200,
        type: AgendamentoDTO,
        isArray: true,
        description: 'Lista de Agendamentos Paginada'
    })
    @UseGuards(AccessTokenGuard)
    @Get()
    async getPagination(
        @Query('page') page: number,
        @Query('perPage') perPage: number,
        @Query('atendimento') atendimento?: string,
        @Query('numeroprontuario') numeroprontuario?: string,
        @Query('dataatendimentode') dataatendimentode?: string,
        @Query('dataatendimentoate') dataatendimentoate?: string,
        @Query('dataalteracaode') dataalteracaode?: string,
        @Query('dataalteracaoate') dataalteracaoate?: string,
        @Query('desccliente') desccliente?: string,
        @Query('descmotivo') descmotivo?: string,
        @Query('descstatus') descstatus?: string,
        @Query('datacriacaode') datacriacaode?: string,
        @Query('datacriacaoate') datacriacaoate?: string,
        @Query('usuariocriacao') usuariocriacao?: string,
        @Query('usuarioalteracao') usuarioalteracao?: string,
    ): Promise<{ data: FlatAgendamentoDTO[], totalCount: number, totalPages: number }> {
        return this.agendaService.getPagination(page, perPage, atendimento, numeroprontuario, dataatendimentode, dataatendimentoate, dataalteracaode, dataalteracaoate, desccliente,
            descmotivo, descstatus, datacriacaode, datacriacaoate, usuariocriacao, usuarioalteracao)
    }

    @ApiResponse({
        status: 200,
        type: AgendamentoDTO,
        isArray: false,
        description: 'Get ByID de Agendamento'
    })
    @UseGuards(AccessTokenGuard)
    @Get(':id')
    async getByID(@Param('id') id: string): Promise<AgendamentoDTO> {
        return this.agendaService.getByID(id);
    }

    @ApiResponse({
        status: 201,
        description: 'Agendamento cadastrado com sucesso'
    })
    @ApiResponse({
        status: 409,
        description: 'Agendamento já cadastrado'
    })
    @ApiForbiddenResponse({
        description: 'Criação Negada'
    })
    @UseGuards(AccessTokenGuard)
    @Post()
    async create(@Body() agenda: AgendamentoDTO, @Req() req): Promise<AgendamentoDTO> {
        return this.agendaService.create(agenda, req.user);
    }

    @ApiResponse({
        status: 200,
        description: 'Agendamento atualizado'
    })
    @ApiResponse({
        status: 409,
        description: 'Agendamento já existente'
    })
    @UseGuards(AccessTokenGuard)
    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() agenda: AgendamentoDTO,
        @Req() req
    ): Promise<AgendamentoDTO> {
        return this.agendaService.update(id, agenda, req.user);
    }

}
