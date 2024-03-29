import { HttpException, Injectable } from '@nestjs/common';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';
import { PrismaService } from '../prisma/prisma.service';
import * as Argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { EmailValidator } from '../utils/emailValidator';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService, private jwtService: JwtService, private emailValidator: EmailValidator) {}
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        userName: loginAuthDto.username,
      },
      include: {
        role: true
      }
    });

    if (!user) {
      throw new HttpException('Wrong Credential', 404);
    }

    const isPasswordMatch = await Argon2.verify(user.password, loginAuthDto.password);


    if (!isPasswordMatch) {
      throw new HttpException('Wrong Credential', 404);
    }

    const payload = {
      sub: user.id,
      username: user.userName,
      role: user.role
    };

    return {
      access_token: this.jwtService.sign(payload),
      userId: user.id,
      role: user.role
    };

  }

  async signup(signupDto: SignUpDto) {
    const hashPassword = await Argon2.hash(signupDto.password);

    const user = await this.prismaService.user.findFirst({
      where: {
        userName: signupDto.username,
      },
    });

    if (user) {
      throw new HttpException('Username already exists', 400);
    }

    if (signupDto.email) {
      if (!this.emailValidator.isValid(signupDto.email)) {
        throw new HttpException('Invalid email', 400);
      }
    }

    const newUser = await this.prismaService.user.create({
      data: {
        userName: signupDto.username,
        password: hashPassword,
        email: signupDto.email,
        name: signupDto.name,
        lastName: signupDto.name,
        role: {
          create: {
            name: signupDto.role
          }
        }
      },
      include: {
        role: true
      }
    });

    const payload = {
      sub: newUser.id,
      username: newUser.userName,
      role: newUser.role.name
    };

    return {
      access_token: this.jwtService.sign(payload),
      userId: newUser.id,
    };

  }

  async validateUserById(userId: number) {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return user; // Retorna el usuario encontrado o null si no se encuentra
  }
}