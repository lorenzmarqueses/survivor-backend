import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../user/user.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  const mockUserService = {
    findOne: jest.fn(),
  };

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
        { provide: UserService, useValue: mockUserService },
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('validateUser', () => {
    it('should return user if email is valid', async () => {
      const email = 'test@example.com';
      const password = 'password123';
      const hashedPassword = bcrypt.hashSync(password, 10);
      const user = { id: 1, email, password: hashedPassword };

      // Mock the response from Prisma
      mockPrismaService.user.findUnique.mockResolvedValue(user);

      // Call the validateUser method
      const result = await authService.validateUser(email);

      // Assert that the returned user matches the mocked user
      expect(result).toEqual(user);
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });

    it('should return null if email is invalid', async () => {
      const email = 'test@example.com';

      // Mock the response for invalid email
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      // Call the validateUser method
      const result = await authService.validateUser(email);

      // Assert that null is returned for invalid user
      expect(result).toBeNull();
      expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email },
      });
    });
  });

  describe('login', () => {
    it('should successfully login and return a JWT token for valid credentials', async () => {
      const email = 'user@example.com';
      const password = 'correctPassword';
      const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password for the mock user

      const user = {
        id: 1,
        email,
        password: hashedPassword, // The hashed password in the database
      };

      const payload = { email: user.email, sub: user.id };
      const token = 'jwt_token';

      // Mocking userService.findOne to return the mock user
      mockUserService.findOne.mockResolvedValue(user);

      // Mocking bcrypt.compareSync to return true when comparing password and hashed password
      bcrypt.compareSync = jest.fn().mockReturnValue(true);

      // Mocking JWT service to return the JWT token
      mockJwtService.sign.mockReturnValue(token);

      // Calling the login function with the correct password
      const result = await authService.login(user);

      // Assertions
      expect(result).toEqual({ access_token: token });
      expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
      expect(mockUserService.findOne).toHaveBeenCalledWith(email);
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

      const result = await authService.register({ email, password });

      expect(result).toEqual({ access_token: token });
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: { email, password: expect.any(String) },
      });
    });
  });
});
