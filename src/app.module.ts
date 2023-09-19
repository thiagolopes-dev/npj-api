import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MotivosModule } from './motivos/motivos.module';
import { VarasModule } from './varas/varas.module';
import { ClientesModule } from './clientes/clientes.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [MotivosModule, VarasModule, ClientesModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
