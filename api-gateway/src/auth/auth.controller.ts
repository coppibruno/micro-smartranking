import {
  Body,
  Controller,
  Logger,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthRegistroUsuarioDto } from './dtos/auth-registro-usuario.dto';
import { AuthLoginUsuarioDto } from './dtos/auth-login-usuario.dto';
import { AwsCognitoService } from '../aws/aws-cognito.service';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private awsCognitoService: AwsCognitoService) {}

  private logger = new Logger(AuthController.name);

  @Post('/registro')
  @UsePipes(ValidationPipe)
  async registro(@Body() authRegistroUsuarioDto: AuthRegistroUsuarioDto) {
    this.logger.log(
      `authRegistroUsuarioDto: ${JSON.stringify(authRegistroUsuarioDto)}`,
    );
    return await this.awsCognitoService.registrarUsuario(
      authRegistroUsuarioDto,
    );
  }

  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authLoginUsuarioDto: AuthLoginUsuarioDto) {
    return await this.awsCognitoService.autenticarUsuario(authLoginUsuarioDto);
  }
}
