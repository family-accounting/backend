import { Injectable } from '@nestjs/common';
import type { CreateInvestmentDto, UpdateInvestmentDto } from './dto/investment.dto';

@Injectable()
export class InvestmentsService {
  create(createInvestmentDto: CreateInvestmentDto) {
    return 'This action adds a new investment';
  }

  findAll() {
    return `This action returns all investments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} investment`;
  }

  update(id: number, updateInvestmentDto: UpdateInvestmentDto) {
    return `This action updates a #${id} investment`;
  }

  remove(id: number) {
    return `This action removes a #${id} investment`;
  }
}
