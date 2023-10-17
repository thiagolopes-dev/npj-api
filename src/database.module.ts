import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AgendamentoSchema } from './agendamentos/schema/agendamento.schema';
import { ClienteSchema } from './clientes/schema/cliente.schema';
import { MotivoSchema } from './motivos/schema/motivo.schema';
import { StatusSchema } from './status/schema/status.schema';
import { UsuarioSchema } from './usuarios/schemas/usuario.schema';
import { VaraSchema } from './varas/schema/vara.schema';
import { AcompanhamentoSchema } from './acompanhamento/schema/acompanhamento.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/npj'),
    MongooseModule.forFeature([{ name: 'Motivo', schema: MotivoSchema }]),
    MongooseModule.forFeature([{ name: 'Vara', schema: VaraSchema }]),
    MongooseModule.forFeature([{ name: 'Cliente', schema: ClienteSchema }]),
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema }]),
    MongooseModule.forFeature([{ name: 'Usuario', schema: UsuarioSchema }]),
    MongooseModule.forFeature([{ name: 'Agendamento', schema: AgendamentoSchema }]),
    MongooseModule.forFeature([{ name: 'Acompanhamento', schema: AcompanhamentoSchema }])
  ],
  exports: [MongooseModule],
})
export class DatabaseModule { }
