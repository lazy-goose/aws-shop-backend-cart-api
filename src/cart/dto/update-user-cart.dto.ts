import { Type } from 'class-transformer';
import { IsNumber, IsUUID, Min, ValidateNested } from 'class-validator';

export class CartItemDto {
  @IsUUID()
  productId: string;

  @IsNumber()
  @Min(1)
  count: number;
}

export class UpdateUserCartDto {
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];
}
