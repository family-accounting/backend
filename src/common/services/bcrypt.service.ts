import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Password } from '../types';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  hash(password: Password): string {
    const saltRounds =
      this.configService.getOrThrow<number>('BCRYPT_SALT_ROUNDS');
    const salt = genSaltSync(Number(saltRounds));
    return hashSync(password, salt);
  }

  compare(password: Password, hash: string): boolean {
    return compareSync(password, hash);
  }
}
