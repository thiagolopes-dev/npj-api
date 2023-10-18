import { Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { AtualizarProcessoDto } from './dto/atualizar-processo.dto';
import { ProcessoDTO } from './dto/processo.dto';
import { ProcessosService } from './processos.service';

@ApiTags('processo')
@Controller('processos')
export class ProcessosController {
    constructor(private processoService: ProcessosService) { }

    @UseGuards(AccessTokenGuard)
    @Get()
    async getAll(
        @Query('page') page: number,
        @Query('perPage') perPage: number,
        @Query('numeroprocesso') numeroprocesso?: string,
        @Query('cliente') cliente?: string,
        @Query('vara') vara?: string,
        @Query('motivo') motivo?: string,
        @Query('status') status?: string,
        @Query('processoProcesso') processoProcesso?: string,
        @Query('datacriacaode') datacriacaode?: string,
        @Query('datacriacaoate') datacriacaoate?: string,
    ): Promise<{ data: ProcessoDTO[], totalCount: number, totalPages: number }> {
        return this.processoService.getAll(page, perPage, numeroprocesso, cliente, vara,
            motivo, status, processoProcesso, datacriacaode, datacriacaoate)
    }

    @UseGuards(AccessTokenGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<ProcessoDTO> {
        return this.processoService.getByID(id);
    }

    @UseGuards(AccessTokenGuard)
    @Post()
    async create(@Body() processo: ProcessoDTO, @Req() req) {
        return this.processoService.create(processo, req.user)
    }

    @UseGuards(AccessTokenGuard)
    @Put(':id')
    atualizarProcesso(@Param('id') id: string, @Body() atualizarProcesso: AtualizarProcessoDto) {
        return this.processoService.atualizar(id, atualizarProcesso);
    }


}
