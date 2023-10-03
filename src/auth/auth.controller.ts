/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('oauth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('token')
    logar(@Body() data: AuthDto) {
        return this.authService.login(data);
    }
}
