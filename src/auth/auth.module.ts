import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';
import { UsuariosModule } from 'src/usuarios/usuarios.module';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';


@Module({
    imports: [JwtModule.register({}), UsuariosModule],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService, AccessTokenStrategy
    ],
})
export class AuthModule { }
