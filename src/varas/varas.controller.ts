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
import { VaraDTO } from './dto/vara.dto';
import { VarasService } from './varas.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';


@ApiTags('varas')
@Controller('varas')
export class VarasController {
  constructor(private varaService: VarasService) { }

  @ApiResponse({
    status: 200,
    type: VaraDTO,
    isArray: true,
    description: 'Lista de Varas'
  })
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAll(): Promise<VaraDTO[]> {
    return this.varaService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: VaraDTO,
    isArray: false,
    description: 'Get ByID de Varas'
  })
  @UseGuards(AccessTokenGuard)
  @Get(':id')
  async getByID(@Param('id') id: string): Promise<VaraDTO> {
    return this.varaService.getByID(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Vara cadastrada com sucesso'
  })
  @ApiResponse({
    status: 409,
    description: 'Vara já cadastrada'
  })
  @ApiForbiddenResponse({
    description: 'Criação Negada'
  })
  @UseGuards(AccessTokenGuard)
  @Post()
  async create(@Body() vara: VaraDTO): Promise<VaraDTO> {
    return this.varaService.create(vara);
  }

  @ApiResponse({
    status: 200,
    description: 'Vara atualizado'
  })
  @ApiResponse({
    status: 409,
    description: 'Vara com descrição ja existente'
  })
  @UseGuards(AccessTokenGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() vara: VaraDTO,
  ): Promise<VaraDTO> {
    return this.varaService.update(id, vara);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.varaService.delete(id);
  // }
}
