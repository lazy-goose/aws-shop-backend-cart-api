import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  HttpStatus,
  ValidationPipe,
  Post,
} from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './cart.service';
import { UpdateUserCartDto } from './dto/update-user-cart.dto';
import { CheckoutDto } from 'src/order/dto/checkout.dto';
import { CartStatuses } from './models';

@Controller('cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  @Get()
  async findUserCart(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req);
    const foundCart = await this.cartService.findOrCreateByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart: foundCart,
      },
    };
  }

  @Put()
  async updateUserCart(
    @Req() req: AppRequest,
    @Body(new ValidationPipe()) updateCartDto: UpdateUserCartDto,
  ) {
    const userId = getUserIdFromRequest(req);
    const updatedCart = await this.cartService.updateByUserId(
      userId,
      updateCartDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart: updatedCart,
      },
    };
  }

  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    const userId = getUserIdFromRequest(req);
    await this.cartService.removeByUserId(userId);
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @Post('checkout')
  async checkout(
    @Req() req: AppRequest,
    @Body(new ValidationPipe()) checkoutDto: CheckoutDto,
  ) {
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);
    if (!(cart && cart.items.length)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cart is empty',
      };
    }
    const { id: cartId } = cart;
    const createdOrder = await this.orderService.create({
      ...checkoutDto,
      userId,
      cartId,
      status: CartStatuses.ORDERED,
      total: cart.items.length,
    });
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        order: createdOrder,
      },
    };
  }
}
