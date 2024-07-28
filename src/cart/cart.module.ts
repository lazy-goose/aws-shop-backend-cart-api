import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartEntity } from 'src/database/entities/cart.entity';
import { OrderModule } from '../order/order.module';
import { OrderService } from 'src/order';
import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([CartEntity]),
    forwardRef(() => OrderModule),
  ],
  providers: [CartService, OrderService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
