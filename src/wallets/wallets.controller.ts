import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletsService } from './wallets.service';
import type { CreateWalletDto, ParamId, UpdateWalletDto } from './dto/wallet.dto';
import { createWalletSchema, paramIdSchema, updateWalletSchema } from './dto/wallet.dto';
import { ZodValidationPipe } from '@/common/pipes/zod-validation.pipe';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()
  createOne(@Body(new ZodValidationPipe(createWalletSchema)) createWalletDto: CreateWalletDto) {
    return this.walletsService.createOne(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  findOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.walletsService.findOneById(id);
  }

  @Patch(':id')
  updateOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId, @Body(new ZodValidationPipe(updateWalletSchema)) updateWalletDto: UpdateWalletDto) {
    return this.walletsService.updateOneById(id, updateWalletDto);
  }

  @Delete(':id')
  deleteOneById(@Param(new ZodValidationPipe(paramIdSchema)) { id }: ParamId) {
    return this.walletsService.deleteOneById(id);
  }
}
