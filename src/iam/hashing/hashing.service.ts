import { Injectable } from '@nestjs/common';
import { HashWithSalt } from './hash-with-salt.interface';

@Injectable()
export abstract class HashingService {
  abstract hash(data: string | Buffer): Promise<HashWithSalt>;
  abstract compare(
    data: string | Buffer,
    salt: string,
    encrypted: string,
  ): Promise<boolean>;
}
