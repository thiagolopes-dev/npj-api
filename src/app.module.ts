import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MotivoController } from './motivos/motivo.controller';
import { MotivoSchema } from './motivos/schema/motivo.schema';
import { MotivoService } from './motivos/shared/motivo.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/npj'),
    MongooseModule.forFeature([{ name: 'Motivo', schema: MotivoSchema }]),
  ],
  controllers: [AppController, MotivoController],
  providers: [AppService, MotivoService],
})
export class AppModule {}
