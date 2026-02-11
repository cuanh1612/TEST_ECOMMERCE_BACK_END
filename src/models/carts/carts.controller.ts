import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/auth/guards/auth.guard';
import { CartsService } from './carts.service';
import { AddToCartDto } from './dtos/add-to-cart-dto.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('carts')
export class CartsController {
    constructor(private cartService: CartsService) { }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthenticationGuard)
    @Post('add')
    async addToCart(
        @Body() body: AddToCartDto,
        @Request() req,
    ) {
        const userId = req.user.id;
        return this.cartService.addToCart(userId, body);
    }

    @ApiBearerAuth('access-token')
    @UseGuards(AuthenticationGuard)
    @Delete('/product/:productId')
    removeProduct(
        @Param('productId', ParseIntPipe) productId: number,
        @Request() req,
    ) {
        return this.cartService.removeProduct(req.user.id, productId);
    }

    
    @UseGuards(AuthenticationGuard)
    @Get('/items')
    getCartItems(
        @Request() req,
    ) {
        return this.cartService.getCartItems(req.user.id);
    }
}
