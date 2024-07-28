import { Injectable } from '@nestjs/common';
import { Cart } from '../models';
import { InjectRepository } from '@nestjs/typeorm';
import { CartEntity } from 'src/database/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly carts: Repository<CartEntity>,
  ) {}

  async findByUserId(userId: string) {
    return this.carts.findOneBy({ userId });
  }

  async createByUserId(userId: string) {
    const userCart = this.carts.create({
      userId,
    });
    return this.carts.save(userCart);
  }

  async findOrCreateByUserId(userId: string) {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }
    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart) {
    await this.carts.update({ userId }, { items });
    return this.findByUserId(userId);
  }

  async removeByUserId(userId: string) {
    return this.carts.delete({ userId });
  }
}
