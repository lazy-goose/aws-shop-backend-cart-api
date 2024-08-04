import { Body, Injectable, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/database/entities/user.entity';
import { UserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  async findOne(id: string) {
    return this.users.findOneBy({ id });
  }

  async createOne({ name, password }: UserDto) {
    const user = this.users.create({
      name,
      password,
    });
    return this.users.save(user);
  }
}
