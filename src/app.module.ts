import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MotivosModule } from './motivos/motivos.module';
import { VarasModule } from './varas/varas.module';

@Module({
  imports: [MotivosModule, VarasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
