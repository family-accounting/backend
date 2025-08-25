import { Test, TestingModule } from '@nestjs/testing';
import { SharedExpensesService } from '../shared-expenses.service';

describe('SharedExpensesService', () => {
  let service: SharedExpensesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SharedExpensesService],
    }).compile();

    service = module.get<SharedExpensesService>(SharedExpensesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
