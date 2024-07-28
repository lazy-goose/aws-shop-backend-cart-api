import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import type { CartEntity } from './cart.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', { nullable: true, unique: true })
  email: string;

  @Column('text')
  password: string;

  @OneToMany('CartEntity', 'user')
  carts: Relation<CartEntity>[];
}
