import { Injectable } from '@nestjs/common';
import { User } from './models';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  async findOne(id: string) {
    return this.users.findOneBy({ id });
  }

  async createOne({ name, password }: User) {
    const user = this.users.create({
      name,
      password,
    });
    return this.users.save(user);
  }
}
