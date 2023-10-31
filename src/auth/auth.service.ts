import {
  BadRequestException,
  Injectable
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Permissao } from 'src/usuarios/dto/usuario.dto';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { accessConstants } from './constants';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsuariosService,
    private jwtService: JwtService
  ) { }


  async entrar(data: AuthDto) {
    // Check if user exists
    const user = await this.usersService.buscarUsuarioNome(data.username);
    if (!user) throw new BadRequestException('E-mail  inválido');

    // Check if user status is active (true)
    if (!user.status) {
      throw new BadRequestException('Usuário desativado, não é possível efetuar o login.');
    }

    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('E-mail ou senha inválidos.');

    const tokens = await this.getTokens(user._id, user.username, user.permissao);
    //  await this.updateRefreshToken(user._id, tokens.refreshToken);
    return tokens;
  }


  async logout(userId: string) {
    this.usersService.atualizar(userId, { refreshToken: null });
  }

  async getTokens(userId: string, username: string, permissao: Permissao) {
    const [accessToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
          permissao
        },
        {
          secret: accessConstants.secret,
          expiresIn: '7d',
        },
      )
    ]);

    return {
      accessToken
    };
  }
}
