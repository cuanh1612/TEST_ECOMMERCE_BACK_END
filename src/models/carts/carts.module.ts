import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from '../products/products.module';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { Cart } from './entities/cart.entity';
import { CartItem } from './entities/cartItem.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cart, CartItem]), ProductsModule],
    providers: [CartsService],
    controllers: [CartsController],
})
export class CartsModule { }
