import { Type } from 'class-transformer';
import {
  IsCreditCard,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class PaymentDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsCreditCard()
  @IsOptional()
  creditCard?: string;
}

class DeliveryDto {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsOptional()
  address?: string;
}

export class CheckoutDto {
  @ValidateNested()
  @Type(() => PaymentDto)
  payment: PaymentDto;

  @ValidateNested()
  @Type(() => DeliveryDto)
  delivery: DeliveryDto;

  @IsString()
  @IsOptional()
  comments?: string;
}
