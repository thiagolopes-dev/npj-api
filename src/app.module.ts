import { Module } from '@nestjs/common';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientesModule } from './clientes/clientes.module';
import { MotivosModule } from './motivos/motivos.module';
import { StatusModule } from './status/status.module';
import { VarasModule } from './varas/varas.module';

@Module({
  imports: [
    MotivosModule,
    VarasModule,
    ClientesModule,
    StatusModule,
    AgendamentosModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule { }
