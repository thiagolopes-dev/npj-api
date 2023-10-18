import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { ProcessosController } from './processos.controller';
import { ProcessosService } from './processos.service';

@Module({
    imports: [DatabaseModule],
    controllers: [ProcessosController],
    providers: [ProcessosService],
    exports: [ProcessosService]
})
export class ProcessosModule { }
