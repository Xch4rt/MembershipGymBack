import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';
import { sign } from 'crypto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  create(@Body() loginDto: LoginAuthDto) {
    return this.authService.login(loginDto);
  }

  @Post('signup')
  findAll(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }
}