import { Test, TestingModule } from '@nestjs/testing';
import { SharedExpensesController } from '../shared-expenses.controller';
import { SharedExpensesService } from '../shared-expenses.service';

describe('SharedExpensesController', () => {
  let controller: SharedExpensesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SharedExpensesController],
      providers: [SharedExpensesService],
    }).compile();

    controller = module.get<SharedExpensesController>(SharedExpensesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
