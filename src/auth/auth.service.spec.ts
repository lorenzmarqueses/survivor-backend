import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockPrismaService = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  };

  const mockJwtService = {
    sign: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return user if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = { id: 1, email, password: hashedPassword };

      mockPrismaService.user.findUnique.mockResolvedValue(user);
      const result = await authService.validateUser(email, password);

      expect(result).toEqual(user);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null if credentials are invalid', async () => {
      const email = 'test@example.com';
      const password = 'wrongpassword';

      mockPrismaService.user.findUnique.mockResolvedValue(null);
      const result = await authService.validateUser(email, password);

      expect(result).toBeNull();
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('login', () => {
    it('should return a JWT token', async () => {
      const user = { id: 1, email: 'test@example.com' };
      const payload = { email: user.email, sub: user.id };
      const token = 'jwt_token';

      mockJwtService.sign.mockReturnValue(token);
      const result = await authService.login(user);

      expect(result).toEqual({ access_token: token });
      expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
    });
  });

  describe('register', () => {
    it('should create a new user and return a JWT token', async () => {
      const email = 'newuser@example.com';
      const password = 'password123';
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = { id: 1, email, password: hashedPassword };
      const token = 'jwt_token';

      mockPrismaService.user.create.mockResolvedValue(user);
      mockJwtService.sign.mockReturnValue(token);

      const result = await authService.register(email, password);

      expect(result).toEqual({ access_token: token });
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: { email, password: expect.any(String) },
      });
    });
  });
});
