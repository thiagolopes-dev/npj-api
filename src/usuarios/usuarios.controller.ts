import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AtualizarUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuariosService } from './usuarios.service';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

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
        console.log('cheguei no controller ');
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

}
