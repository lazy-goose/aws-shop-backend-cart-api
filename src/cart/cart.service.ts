import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CartEntity } from 'src/database/entities/cart.entity';

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

  async updateByUserId(userId: string, update: DeepPartial<CartEntity>) {
    await this.carts.update({ userId }, update);
    return this.findByUserId(userId);
  }

  async removeByUserId(userId: string) {
    return this.carts.delete({ userId });
  }
}
