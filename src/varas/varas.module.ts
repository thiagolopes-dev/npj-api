import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';

import { VarasController } from './varas.controller';
import { VarasService } from './varas.service';

@Module({
  imports: [DatabaseModule],
  controllers: [VarasController],
  providers: [VarasService],
  exports: [VarasService],
})
export class VarasModule {}
