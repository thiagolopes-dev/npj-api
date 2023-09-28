
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        UsuarioController
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        UsuarioService
    ]
})
export class UsuarioModule { }
