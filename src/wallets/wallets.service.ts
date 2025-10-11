import { Injectable } from '@nestjs/common';
import type { CreateWalletDto, Id, UpdateWalletDto } from './dto/wallet.dto';
import { Repository } from 'typeorm';
import { WalletEntity } from './entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(WalletEntity)
    private readonly walletRepository: Repository<WalletEntity>,
    private readonly i18n: I18nService,
  ) {}
  createOne(createWalletDto: CreateWalletDto) {
    const wallet = this.walletRepository.create(createWalletDto);
    return this.walletRepository.save(wallet);
  }

  findAll() {
    return this.walletRepository.find();
  }

  findOneById(id: Id) {
    return this.walletRepository.findOneBy({ id });
  }

  updateOneById(id: Id, updateWalletDto: UpdateWalletDto) {
    return this.walletRepository.update(id, updateWalletDto);
  }

  deleteOneById(id: Id) {
    return this.walletRepository.delete(id);
  }
}
