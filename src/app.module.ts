import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MotivoController } from './motivos/motivo.controller';
import { MotivoSchema } from './motivos/schema/motivo.schema';
import { MotivoService } from './motivos/shared/motivo.service';
import { VaraSchema } from './varas/schema/varas';
import { VaraService } from './varas/shared/vara.service';
import { VaraController } from './varas/vara.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/npj'),
    MongooseModule.forFeature([{ name: 'Motivo', schema: MotivoSchema }]),
    MongooseModule.forFeature([{ name: 'Vara', schema: VaraSchema }]),
  ],
  controllers: [AppController, MotivoController, VaraController],
  providers: [AppService, MotivoService, VaraService],
})
export class AppModule {}
