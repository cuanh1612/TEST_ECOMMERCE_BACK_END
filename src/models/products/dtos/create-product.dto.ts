import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
  @ApiProperty({
    example: 'product 1',
    description: 'name product',
    maxLength: 255,
    nullable: false,
    type: 'string'
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 10000,
    description: 'price product',
    nullable: false,
    type: 'number'
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'image product',
    nullable: false,
    type: 'string'
  })
  @IsString()
  image: string;

  @ApiProperty({
    example: 'product 1',
    description: 'description',
    nullable: false,
    type: 'string'
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'content detail',
    description: 'content detail',
    nullable: false,
    type: 'string'
  })
  @IsString()
  detail: string;
}