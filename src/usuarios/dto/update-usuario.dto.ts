import { PartialType } from '@nestjs/mapped-types';
import { UsuarioDto } from "./usuario.dto";

export class AtualizarUsuarioDto extends PartialType(UsuarioDto) { }