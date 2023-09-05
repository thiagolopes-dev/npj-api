import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { MotivosController } from './motivos.controller';
import { MotivosService } from './motivos.service';

@Module({
  imports: [
    DatabaseModule,
    // MongooseModule.forFeature([{ name: 'Motivo', schema: MotivoSchema }]),
  ],
  controllers: [MotivosController],
  providers: [MotivosService],
  exports: [MotivosService],
})
export class MotivosModule {}
