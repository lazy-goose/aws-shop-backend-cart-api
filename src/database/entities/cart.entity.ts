import { CartStatuses } from 'src/cart/models';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import type { UserEntity } from './user.entity';
import type { CartItemEntity } from './cart-item.entity';
import type { OrderEntity } from './order.entity';

@Entity('carts')
export class CartEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({
    type: 'enum',
    enum: CartStatuses,
    default: CartStatuses.OPEN,
  })
  status: CartStatuses;

  @ManyToOne('UserEntity')
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Relation<UserEntity>;

  @OneToMany('CartItemEntity', 'cart', { cascade: true })
  items: Relation<CartItemEntity>[];

  @OneToMany('OrderEntity', 'cart', { cascade: true })
  orders: Relation<OrderEntity>;
}
