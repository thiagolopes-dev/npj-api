import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
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
        status: 200,
        type: UsuarioDto,
        isArray: true,
        description: 'Lista de Usuarios'
    })
    @UseGuards(AccessTokenGuard)
    @Get('all')
    async getAll(): Promise<UsuarioDto[]> {
        return this.usuarioService.getAll();
    }

    @ApiResponse({
        status: 200,
        type: UsuarioDto,
        isArray: true,
        description: 'Lista de Usuários Paginada'
    })
    @UseGuards(AccessTokenGuard)
    @Get()
    async getPagination(
        @Query('page') page: number,
        @Query('perPage') perPage: number,
        @Query('name') name?: string,
        @Query('username') username?: string,
        @Query('status') status?: string,
        @Query('usuariocriacao') usuariocriacao?: string,
        @Query('datacriacaode') datacriacaode?: string,
        @Query('datacriacaoate') datacriacaoate?: string,
        @Query('usuarioalteracao') usuarioalteracao?: string,
        @Query('dataalteracaode') dataalteracaode?: string,
        @Query('dataalteracaoate') dataalteracaoate?: string,
    ): Promise<{ data: UsuarioDto[], totalCount: number, totalPages: number }> {
        return this.usuarioService.getPagination(page, perPage, name, username, status, usuariocriacao, datacriacaode, datacriacaoate, usuarioalteracao, dataalteracaode, dataalteracaoate);
    }

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
    @Get(':id')
    buscarPorID(@Param('id') id: string) {
        return this.usuarioService.buscarPorId(id);
    }



    @UseGuards(AccessTokenGuard)
    @Put(':id')
    atualizarUsuario(@Param('id') id: string, @Body() atualizarUsuario: AtualizarUsuarioDto) {
        return this.usuarioService.atualizar(id, atualizarUsuario);
    }

    @Put('/senha/alterar')
    @UseGuards(AccessTokenGuard) // Protege a rota com o guard de autenticação JWT
    async updatePassword(@Request() req: any, @Body('password') newPassword: string) {
        if (!newPassword) {
            throw new BadRequestException('Nova senha não fornecida.');
        }
        try {
            const user = req.user;
            const updatedUser = await this.usuarioService.updateUserPassword(user._id, { password: newPassword });
            return updatedUser;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao atualizar a senha do usuário.');
        }
    }
}
