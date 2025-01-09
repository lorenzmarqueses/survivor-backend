import { Test, TestingModule } from '@nestjs/testing';
import { SurvivorController } from './survivor.controller';

describe('SurvivorController', () => {
  let controller: SurvivorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurvivorController],
    }).compile();

    controller = module.get<SurvivorController>(SurvivorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
