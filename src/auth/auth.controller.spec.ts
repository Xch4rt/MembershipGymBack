import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { EmailValidator } from '../utils/emailValidator';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { SignUpDto } from './dto/signup-auth.dto';
import { UserRole } from '../enums/roles.enum';


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, PrismaService, EmailValidator, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a token on successful login', async () => {
      const loginDto: LoginAuthDto = {
        username: 'testuser',
        password: 'testpassword',
      };
      const mockUserData = {
        access_token: 'mocked_token',
        userId: 1,
        role: 'user', // Aquí debes proporcionar el valor correcto del tipo Role
      };

      jest.spyOn(authService, 'login').mockImplementation(async () => ({
        access_token: 'mocked_token',
        userId: 1,
        role: 'user', // Aquí debes proporcionar el valor correcto del tipo Role
      } as any)); // Utiliza 'as any' para indicar al TypeScript que estás convirtiendo tipos
  
      const result = await controller.create(loginDto);
      expect(result).toBeDefined(); // Verifica que el resultado no sea nulo
      expect(typeof result).toBe('object'); 
    });

    // Add more test cases for error scenarios, invalid credentials, etc. if needed
  });

  describe('findAll', () => {
    it('should create a new user and return the user data', async () => {
      const signupDto: SignUpDto = {
        username: 'newuser',
        password: 'newpassword',
        name: 'New User',
        email: 'newuser@example.com',
        role: UserRole.ADMIN
      };
      const mockUserData = {
        access_token: 'mocked_token',
        userId: 1,
      };
  
      jest.spyOn(authService, 'signup').mockImplementation(async () => mockUserData as any);
  
      const result = await controller.findAll(signupDto);
      expect(result).toEqual(mockUserData);
    });
  });
});
