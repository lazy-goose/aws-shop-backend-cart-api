import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Relation,
} from 'typeorm';
import type { CartEntity } from './cart.entity';

@Entity('cart_items')
export class CartItemEntity {
  @PrimaryColumn('uuid')
  cartId: string;
  @PrimaryColumn('uuid')
  productId: string;

  @Column('int')
  count: number;

  @ManyToOne('CartEntity', {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'delete',
  })
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Relation<CartEntity>;
}
