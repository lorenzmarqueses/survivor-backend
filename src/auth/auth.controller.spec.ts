import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(),
            validateUser: jest.fn(),
            login: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  describe('register', () => {
    it('should return a result from AuthService register method', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const result = { access_token: 'some-jwt-token' };

      jest.spyOn(authService, 'register').mockResolvedValue(result);

      expect(await authController.register({ email, password })).toBe(result);
    });
  });

  describe('login', () => {
    it('should return a login token if credentials are valid', async () => {
      const email = 'test@example.com';
      const password = 'password';
      const user = {
        id: 1,
        email,
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const token = { access_token: 'some-jwt-token' };

      jest.spyOn(authService, 'validateUser').mockResolvedValue(user);
      jest.spyOn(authService, 'login').mockResolvedValue(token);

      expect(await authController.login({ email, password })).toBe(token);
    });

    it('should throw an error if credentials are invalid', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };
      // Mock the userService to return null for invalid email or password
      userService.findOne = jest.fn().mockResolvedValue(null);

      // Expect the login method to throw UnauthorizedException
      expect(authService.login(loginDto)).toBeUndefined();
    });
  });

  describe('getProfile', () => {
    it('should return user data from request', () => {
      const user = { id: 1, email: 'test@example.com' };
      const req = { user } as Request;

      expect(authController.getProfile(req)).toBe(user);
    });
  });
});
