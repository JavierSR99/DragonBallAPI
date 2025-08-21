import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './models/dto/register.dto';
import { ApiOperation } from '@nestjs/swagger';
import { LoginAuthDto } from './models/dto/login.dto';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}


  @Post('register')
  @HttpCode(200)
  @ApiOperation({ summary: 'Registra un nuevo usuario' })
  handleRegister(@Body() user: RegisterAuthDto) {
    return this.authService.registerUser(user);
  }

  
  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Inicio de sesión de usuario' })
  handleLogin(@Body() user: LoginAuthDto) {
    return this.authService.loginUser(user);
  }
  

}
