import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailValidator } from '../utils/emailValidator';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';
import * as Argon2 from 'argon2';

interface User {
  id: number;
  userName: string;
  password: string;
  name: string;
  lastName: string;
  email: string;
  loginAttemps: Int32Array;

  // Otras propiedades del usuario
}

describe('AuthService', () => {
  let service: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, EmailValidator, JwtService],
    }).compile();

    service = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('login', () => {
    it('should throw an error if user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);
      await expect(service.login({ username: 'nonexistent', password: '123456' } as LoginAuthDto)).rejects.toThrowError('Wrong Credential');
    });

    it('should throw an error if password does not match', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue({} as User);
      await expect(service.login({ username: 'existingUser', password: 'wrongPassword' } as LoginAuthDto)).rejects.toThrowError('Wrong Credential');
    });

    it('should return an access token if credentials are correct', async () => {
      const user: User = { id: 1, userName: 'existingUser', password: 'hashedPassword' };
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(user);
      jest.spyOn(Argon2, 'verify').mockResolvedValue(true);
      jest.spyOn(service['jwtService'], 'sign').mockReturnValue('mockedToken');

      const result = await service.login({ username: 'existingUser', password: 'correctPassword' } as LoginAuthDto);
      expect(result.access_token).toBe('mockedToken');
      expect(result.userId).toBe(1);
    });
  });

  describe('signup', () => {
    it('should throw an error if username already exists', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue({} as User);
      await expect(service.signup({ username: 'existingUser', password: '123456', email: 'test@example.com', name: 'John' } as SignUpDto)).rejects.toThrowError('Username already exists');
    });

    it('should throw an error if email is invalid', async () => {
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);
      jest.spyOn(service['emailValidator'], 'isValid').mockReturnValue(false);

      await expect(service.signup({ username: 'newUser', password: '123456', email: 'invalidEmail', name: 'John' } as SignUpDto)).rejects.toThrowError('Invalid email');
    });

    it('should create a new user and return an access token', async () => {
      const newUser: User = { id: 1, userName: 'newUser', password: 'hashedPassword' };
      jest.spyOn(prismaService.user, 'findFirst').mockResolvedValue(null);
      jest.spyOn(Argon2, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(newUser);
      jest.spyOn(service['jwtService'], 'sign').mockReturnValue('mockedToken');

      const result = await service.signup({ username: 'newUser', password: '123456', email: 'test@example.com', name: 'John' } as SignUpDto);
      expect(result.access_token).toBe('mockedToken');
      expect(result.userId).toBe(1);
    });
  });

  describe('validateUserById', () => {
    it('should return user if user exists', async () => {
      const existingUser: User = { id: 1, userName: 'existingUser', password: 'hashedPassword' };
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(existingUser);

      const result = await service.validateUserById(1);
      expect(result).toEqual(existingUser);
    });

    it('should return null if user does not exist', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      const result = await service.validateUserById(2);
      expect(result).toBeNull();
    });
  });
});