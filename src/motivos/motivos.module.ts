import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { MotivoController } from './motivo.controller';
import { MotivoService } from './shared/motivo.service';

@Module({
  imports: [
    DatabaseModule,
    // MongooseModule.forFeature([{ name: 'Motivo', schema: MotivoSchema }]),
  ],
  controllers: [MotivoController],
  providers: [MotivoService],
  exports: [MotivoService],
})
export class MotivosModule {}
