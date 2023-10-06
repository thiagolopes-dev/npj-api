
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { AgendamentosController } from './agendamentos.controller';
import { AgendamentosService } from './agendamentos.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        AgendamentosController
    ],
    providers: [
        AgendamentosService
    ],
    exports: [
        AgendamentosService
    ]
})
export class AgendamentosModule { }
