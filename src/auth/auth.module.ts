import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { Module } from '@nestjs/common';


@Module({
    imports: [JwtModule.register({}),],
    controllers: [
        AuthController
    ],
    providers: [
        AuthService,],
})
export class AuthModule { }
