
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database.module';

import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        UsuariosController
    ],
    providers: [
        UsuariosService
    ],
    exports: [
        UsuariosService
    ]
})
export class UsuariosModule { }
