import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import type{ ResponseSuccess } from './interfaces/response';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('isConnected', () => {
      expect(appController.isConnected()).toStrictEqual({message: 'You are connected!', status: 'OK', stauesCode: 200} as ResponseSuccess);
    });
  });
});
