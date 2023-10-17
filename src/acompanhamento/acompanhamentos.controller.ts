import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AcompanhamentosService } from './acompanhamentos.service';
import { AcompanhamentoDTO } from './dto/acompanhamento.dto';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@ApiTags('acompanhamento')
@Controller('acompanhamentos')
export class AcompanhamentosController {
    constructor( private acompanhamentoService: AcompanhamentosService ) {}

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
        @Query('processoacompanhamento') processoacompanhamento?: string,
        @Query('datacriacaode') datacriacaode?: string,
        @Query('datacriacaoate') datacriacaoate?: string,
    ): Promise<{ data:AcompanhamentoDTO[], totalCount: number, totalPages: number }> {
        return this.acompanhamentoService.getAll(page, perPage, numeroprocesso, cliente, vara,
            motivo, status, processoacompanhamento, datacriacaode, datacriacaoate)
    }

    @UseGuards(AccessTokenGuard)
    @Get(':id')
    async getById(@Param('id') id: string): Promise<AcompanhamentoDTO> {
        return this.acompanhamentoService.getByID(id);
    }

    @UseGuards(AccessTokenGuard)
    @Post()
    async create(@Body() acompanhamento: AcompanhamentoDTO, @Req() req) {
        return this.acompanhamentoService.create(acompanhamento, req.user)
    }


}
