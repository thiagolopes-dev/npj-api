import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { AgendamentosService } from './agendamentos.service';
import { AgendamentoDTO } from './dto/agendamento.dto';

@ApiTags('agendamento')

@Controller('agendamentos')
export class AgendamentosController {

    constructor(private agendaService: AgendamentosService) { }

    @ApiResponse({
        status: 200,
        type: AgendamentoDTO,
        isArray: true,
        description: 'Lista de Status'
    })
    @UseGuards(AccessTokenGuard)
    @Get()
    async getAll(): Promise<AgendamentoDTO[]> {
        return this.agendaService.getAll();
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
    async create(@Body() agenda: AgendamentoDTO): Promise<AgendamentoDTO> {
        return this.agendaService.create(agenda);
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
    ): Promise<AgendamentoDTO> {
        return this.agendaService.update(id, agenda);
    }

}
