import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/database/entities/cart.entity';
import { OrderModule } from '../order/order.module';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { CartItemEntity } from 'src/database/entities/cart-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity, CartItemEntity]),
    forwardRef(() => OrderModule),
  ],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
