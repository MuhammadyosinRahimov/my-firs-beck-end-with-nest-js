import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entiti/user.entity';

@Injectable()
export class UserRepository {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByUsername(username: string) {
    return this.repo.findOne({ where: { username } });
  }

  async createUser(username: string, password: string) {
    const user = this.repo.create({ username, password });
    return this.repo.save(user);
  }
}
