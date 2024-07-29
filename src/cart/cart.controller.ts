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
  Logger,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from 'src/order/order.service';
import { AppRequest, getUserIdFromRequest } from '../shared';
import { CartService } from './cart.service';
import { UpdateUserCartDto } from './dto/update-user-cart.dto';
import { CheckoutDto } from 'src/order/dto/checkout.dto';
import { CartStatuses } from './models';
import { BasicAuthGuard } from 'src/auth';

@Controller('cart')
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  private log(value: string | object, context?: string) {
    return typeof value === 'string'
      ? this.logger.log(value, context)
      : this.logger.log(JSON.stringify(value), context);
  }

  private logRequest({
    method,
    path,
    params,
    query,
    headers,
    body,
  }: AppRequest) {
    this.log({ method, path, params, query, headers, body }, 'REQUEST');
  }

  @UseGuards(BasicAuthGuard)
  @Get()
  async findUserCart(@Req() req: AppRequest) {
    this.logRequest(req);
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findOrCreateByUserId(userId);
    this.log(cart, 'FIND CART');
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Put()
  async updateUserCart(
    @Req() req: AppRequest,
    @Body(new ValidationPipe()) updateCartDto: UpdateUserCartDto,
  ) {
    this.logRequest(req);
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.updateByUserId(userId, updateCartDto);
    this.log(cart, 'UPDATE CART');
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
      },
    };
  }

  @UseGuards(BasicAuthGuard)
  @Delete()
  async clearUserCart(@Req() req: AppRequest) {
    this.logRequest(req);
    const userId = getUserIdFromRequest(req);
    const deleteResult = await this.cartService.removeByUserId(userId);
    this.log(deleteResult, 'DELETE CART');
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  @UseGuards(BasicAuthGuard)
  @Post('checkout')
  async checkout(
    @Req() req: AppRequest,
    @Body(new ValidationPipe()) checkoutDto: CheckoutDto,
  ) {
    this.logRequest(req);
    const userId = getUserIdFromRequest(req);
    const cart = await this.cartService.findByUserId(userId);
    this.log(cart, 'CHECKOUT. FIND CART');
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
    this.log(createdOrder, 'CHECKOUT. CREATE ORDER');
    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        order: createdOrder,
      },
    };
  }
}
