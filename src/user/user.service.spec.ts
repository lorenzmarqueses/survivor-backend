import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcryptjs';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    user: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should hash the password and create a new user', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const hashedPassword = 'hashedPassword123';

      jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword);

      const createdUser = {
        id: 1,
        email: userData.email,
        password: hashedPassword,
      };

      mockPrismaService.user.create.mockResolvedValue(createdUser);

      const result = await userService.create(userData);

      expect(result).toEqual(createdUser);
      expect(bcrypt.hashSync).toHaveBeenCalledWith(userData.password, 10);
      expect(mockPrismaService.user.create).toHaveBeenCalledWith({
        data: { email: userData.email, password: hashedPassword },
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [
        { id: 1, email: 'user1@example.com', password: 'hashedPassword1' },
        { id: 2, email: 'user2@example.com', password: 'hashedPassword2' },
      ];

      mockPrismaService.user.findMany.mockResolvedValue(users);

      const result = await userService.findAll();

      expect(result).toEqual(users);
      expect(mockPrismaService.user.findMany).toHaveBeenCalled();
    });
  });
});
