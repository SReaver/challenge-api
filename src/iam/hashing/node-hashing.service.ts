import { promisify } from 'node:util';
import { pbkdf2, randomBytes } from 'node:crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { HashingService } from './hashing.service';
import { HashWithSalt } from './hash-with-salt.interface';

const pbkdf2Promise = promisify(pbkdf2);

@Injectable()
export class NodeHashingService extends HashingService {
  async hash(data: string | Buffer): Promise<HashWithSalt> {
    if (!data) throw new BadRequestException('No data to hash');
    const salt = randomBytes(16).toString('hex');
    try {
      const hash = (
        await pbkdf2Promise(data, salt, 1000, 64, `sha512`)
      ).toString('hex');
      return { hash, salt };
    } catch (error) {
      throw new Error(`Hashing error: ${error.message}`);
    }
  }
  async compare(
    data: string | Buffer,
    salt: string,
    encrypted: string,
  ): Promise<boolean> {
    try {
      const hash = (
        await pbkdf2Promise(data, salt, 1000, 64, `sha512`)
      ).toString('hex');
      return encrypted === hash;
    } catch (error) {
      throw new Error(`Hash compare error: ${error.message}`);
    }
  }
}
