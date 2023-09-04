import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { VaraService } from './shared/vara.service';
import { VaraController } from './vara.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [VaraController],
  providers: [VaraService],
  exports: [VaraService],
})
export class VarasModule {}
