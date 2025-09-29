import { Injectable } from '@nestjs/common';
import type { ResponseSuccess } from '@/common/interfaces/response';

@Injectable()
export class AppService {
  isConnected(): ResponseSuccess {
    return {
      status: 'OK',
      message: 'You are connected!',
      stauesCode: 200,
    };
  }
}
