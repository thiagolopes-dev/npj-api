import { PartialType } from "@nestjs/swagger";
import { UsuarioDto } from "./usuario.dto";

export class AtualizarUsuarioDto extends PartialType(UsuarioDto) { }