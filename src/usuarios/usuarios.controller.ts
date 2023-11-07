import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { AtualizarUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuariosService } from './usuarios.service';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuariosController {

    constructor(
        private readonly usuarioService: UsuariosService
    ) { }

    @ApiResponse({
        description: 'Usuário criado com sucesso',
        type: UsuarioDto
    })
    @ApiResponse({
        description: 'Usuário já cadastrado',
        status: 409,
        type: UsuarioDto
    })
    @ApiForbiddenResponse(
        {
            description: 'Criação negada'
        }
    )
    @UseGuards(AccessTokenGuard)
    @Post()
    criarUsuario(@Body() criarDto: UsuarioDto) {
        return this.usuarioService.criar(criarDto);
    }

    @UseGuards(AccessTokenGuard)
    @Get()
    buscarTodos() {
        return this.usuarioService.buscarTodos();
    }

    @UseGuards(AccessTokenGuard)
    @Get(':id')
    buscarPorID(@Param('id') id: string) {
        return this.usuarioService.buscarPorId(id);
    }

    @UseGuards(AccessTokenGuard)
    @Put(':id')
    atualizarUsuario(@Param('id') id: string, @Body() atualizarUsuario: AtualizarUsuarioDto) {
        return this.usuarioService.atualizar(id, atualizarUsuario);
    }

    @Put('alterarsenha')
    @UseGuards(AccessTokenGuard) // Protege a rota com o guard de autenticação JWT
    async updatePassword(@Request() req: any, @Body('password') newPassword: string) {
        if (!newPassword) {
            throw new BadRequestException('Nova senha não fornecida.');
        }
        try {
            const user = req.user;
            const updatedUser = await this.usuarioService.atualizarSenha(user.sub, { password: newPassword });
            return updatedUser;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao atualizar a senha do usuário.');
        }
    }

}
