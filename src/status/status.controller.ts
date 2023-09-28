/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @Get()
  async getAll(): Promise<StatusDTO[]> {
    return this.statusService.getAll();
  }

  @ApiResponse({
    status: 200,
    type: StatusDTO,
    isArray: false,
    description: 'Get ByID de Status'
  })
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
  @Post()
  async create(@Body() status: StatusDTO): Promise<StatusDTO> {
    return this.statusService.create(status);
  }

  // @Post()
  // async create(@Body() status: Status): Promise<Status> {
  //   return this.statusService.create(status);
  // }

  @ApiResponse({
    status: 200,
    description: 'Status atualizado'
  })
  @ApiResponse({
    status: 409,
    description: 'Status com descrição ja existente'
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() status: StatusDTO,
  ): Promise<StatusDTO> {
    return this.statusService.update(id, status);
  }

  // @Delete(':id')
  // async delete(@Param('id') id: string) {
  //   return this.statusService.delete(id);
  // }
}
