import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import type { UserEntity } from './user.entity';
import type { CartEntity } from './cart.entity';
import type { CartItemEntity } from './cart-item.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  userId: string;

  @Column('uuid')
  cartId: string;

  @Column('json')
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };

  @Column('json')
  delivery: {
    type: string;
    address: any;
  };

  @Column('text', { nullable: true })
  comments: string;

  @Column('text')
  status: string;

  @Column('int')
  total: number;

  @ManyToOne('CartEntity')
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: Relation<UserEntity>;

  @ManyToOne('CartEntity')
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Relation<CartEntity>;

  @OneToMany('CartEntity', 'items')
  items: Relation<CartItemEntity>;
}
