import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { AcompanhamentosController } from './acompanhamentos.controller';
import { AcompanhamentosService } from './acompanhamentos.service';

@Module({
    imports: [DatabaseModule],
    controllers: [AcompanhamentosController],
    providers: [AcompanhamentosService],
    exports: [AcompanhamentosService]
})
export class AcompanhamentosModule {}
