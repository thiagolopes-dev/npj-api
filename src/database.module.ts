import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MotivoSchema } from './motivos/schema/motivo.schema';
import { VaraSchema } from './varas/schema/vara.schema';
import { ClienteSchema } from './clientes/schema/cliente.schema';
import { StatusSchema } from './status/schema/status.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/npj'),
    MongooseModule.forFeature([{ name: 'Motivo', schema: MotivoSchema }]),
    MongooseModule.forFeature([{ name: 'Vara', schema: VaraSchema }]),
    MongooseModule.forFeature([{ name: 'Cliente', schema: ClienteSchema}]),
    MongooseModule.forFeature([{ name: 'Status', schema: StatusSchema}])
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}
