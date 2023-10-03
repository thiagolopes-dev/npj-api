import { accessConstants } from './constants';

import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { AuthDto } from './dto/auth.dto';

import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

    constructor(
        private usuarioService: UsuariosService,
        private jwtService: JwtService
    ) { }

    async login(data: AuthDto) {
        const usuario = await this.usuarioService.buscarUsuarioNome(data.username);
        if (!usuario) {
            throw new BadRequestException('E-mail não existe');
        }
        if (!usuario.status) {
            throw new BadRequestException('Usuário desativado, não é possível efetuar o login')
        }

        const passwordMatches = await argon2.verify(usuario.password, data.password);
        if (!passwordMatches) {
            throw new BadRequestException('E-mail ou senha inválidos');
        }

        const tokens = await this.getTokens(usuario._id, usuario.username);
        return tokens;
    }

    async getTokens(userId: string, username: string) {
        const [accessToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userId,
                    username,
                },
                {
                    secret: accessConstants.secret,
                    expiresIn: '7d',
                }
            )
        ]);
        return accessToken;
    }

    logout(userId: string) {
        console.log(userId);
    }
}
