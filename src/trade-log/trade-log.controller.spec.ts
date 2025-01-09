import { Test, TestingModule } from '@nestjs/testing';
import { TradeLogController } from './trade-log.controller';
import { TradeLogService } from './trade-log.service';

describe('TradeLogController', () => {
  let tradeLogController: TradeLogController;
  let tradeLogService: TradeLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TradeLogController],
      providers: [
        {
          provide: TradeLogService,
          useValue: {
            logTrade: jest.fn(),
            getTradeLogs: jest.fn(),
          },
        },
      ],
    }).compile();

    tradeLogController = module.get<TradeLogController>(TradeLogController);
    tradeLogService = module.get<TradeLogService>(TradeLogService);
  });

  describe('logTrade', () => {
    it('should log a trade and return the trade log', async () => {
      const data = {
        survivorFromId: 1,
        survivorToId: 2,
        itemId: 1,
        quantity: 10,
      };
      const result = {
        id: 1,
        survivorFrom: 1,
        survivorTo: 2,
        itemId: 1,
        quantity: 10,
        createdAt: new Date(),
      };
      jest.spyOn(tradeLogService, 'logTrade').mockResolvedValue(result);

      expect(await tradeLogController.logTrade(data)).toBe(result);
    });
  });

  describe('getTradeLogs', () => {
    it('should return an array of trade logs', async () => {
      const result = [
        {
          id: 1,
          survivorFrom: 1,
          survivorTo: 2,
          itemId: 1,
          quantity: 10,
          createdAt: new Date(),
        },

        {
          id: 2,
          survivorFrom: 3,
          survivorTo: 4,
          itemId: 2,
          quantity: 5,
          createdAt: new Date(),
        },
      ];
      jest.spyOn(tradeLogService, 'getTradeLogs').mockResolvedValue(result);

      expect(await tradeLogController.getTradeLogs()).toBe(result);
    });
  });
});
