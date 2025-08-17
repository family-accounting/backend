import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { V1Module } from './v1/v1.module';
@Module({
  imports: [

    V1Module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
