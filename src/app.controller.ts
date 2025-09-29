import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import type { ResponseSuccess } from './common/interfaces/response';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  isConnected(): ResponseSuccess {
    return this.appService.isConnected();
  }
}
