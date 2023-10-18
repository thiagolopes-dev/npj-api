import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import * as moment from 'moment';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthMiddleware } from './auth/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { ClientesModule } from './clientes/clientes.module';
import { MotivosModule } from './motivos/motivos.module';
import { ProcessosModule } from './processos/processos.module';
import { StatusModule } from './status/status.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { VarasModule } from './varas/varas.module';

@Module({
  imports: [
    AuthModule,
    MotivosModule,
    VarasModule,
    ClientesModule,
    UsuariosModule,
    StatusModule,
    AgendamentosModule,
    ProcessosModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'MomentWrapper',
      useValue: moment,
    },
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // Aplica o middleware a todas as rotas e métodos
  }
}
