import { Module } from '@nestjs/common';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { MotivosModule } from './motivos/motivos.module';
import { StatusModule } from './status/status.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { VarasModule } from './varas/varas.module';

@Module({
  imports: [
    AuthModule,
    MotivosModule,
    VarasModule,
    ClientesModule,
    UsuarioModule,
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
