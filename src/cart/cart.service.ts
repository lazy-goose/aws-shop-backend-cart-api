import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CartEntity } from 'src/database/entities/cart.entity';
import { UpdateUserCartDto } from './dto/update-user-cart.dto';
import { CartItemEntity } from 'src/database/entities/cart-item.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly carts: Repository<CartEntity>,
    @InjectRepository(CartItemEntity)
    private readonly cartItems: Repository<CartItemEntity>,
  ) {}

  async findByUserId(userId: string, unfold = false) {
    return this.carts.findOne({
      where: { userId },
      relations: unfold ? ['items'] : [],
    });
  }

  async createByUserId(userId: string) {
    const userCart = this.carts.create({
      userId,
    });
    return this.carts.save(userCart);
  }

  async findOrCreateByUserId(userId: string, unfold = false) {
    const userCart = await this.findByUserId(userId, unfold);
    if (userCart) {
      return userCart;
    }
    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, updateCartDto: UpdateUserCartDto) {
    const userCart = await this.findOrCreateByUserId(userId, true);
    const itemsMap = new Map(
      userCart.items.map((item) => [item.productId, item]),
    );
    for (const updateItem of updateCartDto.items) {
      const productId = updateItem.productId;
      if (updateItem.count <= 0) {
        itemsMap.delete(productId);
        continue;
      }
      if (itemsMap.has(productId)) {
        const newItem = {
          ...itemsMap.get(productId),
          ...updateItem,
        };
        itemsMap.set(productId, newItem);
        continue;
      }
      const newItem = this.cartItems.create({
        cartId: userCart.id,
        productId: productId,
        count: updateItem.count,
      });
      itemsMap.set(productId, newItem);
    }
    userCart.items = Array.from(itemsMap).map(([, item]) => item);
    userCart.updatedAt = new Date().toISOString();
    return this.carts.save(userCart);
  }

  async removeByUserId(userId: string) {
    return this.carts.delete({ userId });
  }
}
