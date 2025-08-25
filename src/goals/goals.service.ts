import { Injectable } from '@nestjs/common';
import type { CreateGoalDto, UpdateGoalDto } from './dto/goal.dto';

@Injectable()
export class GoalsService {
  create(createGoalDto: CreateGoalDto) {
    return 'This action adds a new goal';
  }

  findAll() {
    return `This action returns all goals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goal`;
  }

  update(id: number, updateGoalDto: UpdateGoalDto) {
    return `This action updates a #${id} goal`;
  }

  remove(id: number) {
    return `This action removes a #${id} goal`;
  }
}
