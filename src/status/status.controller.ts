/* eslint-disable prettier/prettier */
import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put
  } from '@nestjs/common';
  import { StatusDTO } from './dto/status.dto';
  import { StatusService } from './status.service';
  
  @Controller('status')
  export class StatusController {
    constructor(private statusService: StatusService) { }
  
    @Get()
    async getAll(): Promise<StatusDTO[]> {
      return this.statusService.getAll();
    }
  
    @Get(':id')
    async getByID(@Param('id') id: string): Promise<StatusDTO> {
      return this.statusService.getByID(id);
    }
  
    @Post()
    async create(@Body() status: StatusDTO): Promise<StatusDTO> {
      return this.statusService.create(status);
    }
  
    // @Post()
    // async create(@Body() status: Status): Promise<Status> {
    //   return this.statusService.create(status);
    // }
  
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
  