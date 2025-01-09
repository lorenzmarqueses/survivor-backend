import { Test, TestingModule } from '@nestjs/testing';
import { TradeLogService } from './trade-log.service';
import { PrismaService } from '../prisma.service';

describe('TradeLogService', () => {
  let tradeLogService: TradeLogService;
  let prismaService: PrismaService;

  const mockPrismaService = {
    tradeLog: {
      create: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TradeLogService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    tradeLogService = module.get<TradeLogService>(TradeLogService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('logTrade', () => {
    it('should log a trade between two survivors', async () => {
      const tradeLogData = {
        survivorFromId: 1,
        survivorToId: 2,
        itemId: 3,
        quantity: 5,
      };

      const createdTradeLog = {
        id: 1,
        ...tradeLogData,
      };

      mockPrismaService.tradeLog.create.mockResolvedValue(createdTradeLog);

      const result = await tradeLogService.logTrade(
        tradeLogData.survivorFromId,
        tradeLogData.survivorToId,
        tradeLogData.itemId,
        tradeLogData.quantity,
      );

      expect(result).toEqual(createdTradeLog);
      expect(mockPrismaService.tradeLog.create).toHaveBeenCalledWith({
        data: {
          survivorFrom: tradeLogData.survivorFromId,
          survivorTo: tradeLogData.survivorToId,
          itemId: tradeLogData.itemId,
          quantity: tradeLogData.quantity,
        },
      });
    });
  });

  describe('getTradeLogs', () => {
    it('should return all trade logs with related entities', async () => {
      const tradeLogs = [
        {
          id: 1,
          survivorFrom: 1,
          survivorTo: 2,
          itemId: 3,
          quantity: 5,
          createdAt: new Date(),
          survivorFromRel: { id: 1, name: 'John' },
          survivorToRel: { id: 2, name: 'Jane' },
          item: { id: 3, name: 'Water' },
        },
      ];

      mockPrismaService.tradeLog.findMany.mockResolvedValue(tradeLogs);

      const result = await tradeLogService.getTradeLogs();

      expect(result).toEqual(tradeLogs);
      expect(mockPrismaService.tradeLog.findMany).toHaveBeenCalledWith({
        include: {
          survivorFromRel: true,
          survivorToRel: true,
          item: true,
        },
      });
    });
  });
});
