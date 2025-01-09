import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Request } from 'express';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

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
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
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
      const email = 'test@example.com';
      const password = 'incorrectpassword';

      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(authController.login({ email, password })).rejects.toThrow(
        'Invalid credentials',
      );
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
