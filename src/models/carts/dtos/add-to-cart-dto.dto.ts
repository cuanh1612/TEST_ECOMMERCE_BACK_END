import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class AddToCartDto {
    @ApiProperty({
        example: 1,
        description: 'id product',
        nullable: false,
        type: 'number'
    })
    @Type(() => Number)
    @IsInt()
    productId: number;

    @ApiProperty({
        example: 1,
        description: 'quantity',
        nullable: false,
        type: 'number'
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    quantity: number;
}