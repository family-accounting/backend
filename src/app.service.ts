import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isConnected(): object {
    return {
      status: 'OK',
      message: 'You are connected!',
      stauesCode: 200,
    };
  }
}
