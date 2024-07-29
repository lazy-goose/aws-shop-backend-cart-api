import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from 'src/database/entities/order.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { CartStatuses } from 'src/cart/models';
import { CartEntity } from 'src/database/entities/cart.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    @InjectRepository(OrderEntity)
    private readonly orders: Repository<OrderEntity>,
  ) {}

  async findById(id: string) {
    return this.orders.findOneBy({ id });
  }

  async create(orderData: DeepPartial<OrderEntity>) {
    const newOrder = this.orders.create(orderData);
    return this.dataSource.manager.transaction(async (tem) => {
      await tem.save(OrderEntity, newOrder);
      await tem.update(
        CartEntity,
        { userId: newOrder.id },
        { status: CartStatuses.ORDERED },
      );
      return newOrder;
    });
  }

  async update(id: string, data: DeepPartial<OrderEntity>) {
    return this.orders.update({ id }, data);
  }
}
