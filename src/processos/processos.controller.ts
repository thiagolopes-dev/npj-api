import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { AtualizarProcessoDto } from './dto/atualizar-processo.dto';
import { ProcessoDTO } from './dto/processo.dto';
import { ProcessosService } from './processos.service';
import { FlatProcessoDTO } from './dto/flat-processo.dto';

@ApiTags('processo')
@Controller('processos')
export class ProcessosController {
    constructor(private processoService: ProcessosService) { }

    @ApiResponse({
        status: 200,
        type: ProcessoDTO,
        isArray: true,
        description: 'Lista de Processos'
    })
      @UseGuards(AccessTokenGuard)
      @Get('all')
      async getAll(): Promise<ProcessoDTO[]> {
        return this.processoService.getAll();
    }

    @ApiResponse({
        status: 200,
        type: ProcessoDTO,
        isArray: true,
        description: 'Lista de Processos Paginada'
    })
    @UseGuards(AccessTokenGuard)
    @Get()
    async getPagination(
        @Query('page') page: number,
        @Query('perPage') perPage: number,
        @Query('numeroprocesso') numeroprocesso?: string,
        @Query('cliente') descliente?: string,
        @Query('vara') descvara?: string,
        @Query('motivo') descmotivo?: string,
        @Query('status') descstatus?: string,
        @Query('processoProcesso') processoProcesso?: string,
        @Query('datacriacaode') datacriacaode?: string,
        @Query('datacriacaoate') datacriacaoate?: string,
    ): Promise<{ data: FlatProcessoDTO[], totalCount: number, totalPages: number }> {
        return this.processoService.getPagination(page, perPage, numeroprocesso, descliente, descvara,
            descmotivo, descstatus, processoProcesso, datacriacaode, datacriacaoate)
    }

    @ApiResponse({
        status: 200,
        type: ProcessoDTO,
        isArray: false,
        description: 'Get ByID de Processos'
      })
    @UseGuards(AccessTokenGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<ProcessoDTO> {
        return this.processoService.getByID(id);
    }

    @ApiResponse({
        status: 201,
        description: 'Processo cadastro com sucesso'
      })
      @ApiResponse({
        status: 409,
        description: 'Processo já cadastrado'
      })
      @ApiForbiddenResponse({
        description: 'Criação Negada'
    })
    @UseGuards(AccessTokenGuard)
    @Post()
    async create(@Body() processo: ProcessoDTO, @Req() req) {
        return this.processoService.create(processo, req.user)
    }

    @UseGuards(AccessTokenGuard)
    @Post(':id')
    atualizarProcesso(@Param('id') id: string, @Body() atualizarProcesso: AtualizarProcessoDto, @Req() req) {
        return this.processoService.atualizarInfo(id, atualizarProcesso, req.user);
    }


}
