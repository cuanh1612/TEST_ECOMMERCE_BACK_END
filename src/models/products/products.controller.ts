import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(
        private productService: ProductsService,
    ) { }

    @Post()
    async create(@Body() body: CreateProductDto) {
        return await this.productService.create(body);
    }

    @Get()
    async findAll() {
        return await this.productService.find();
    }

    @Get(':id')
    async findOne(
        @Param('id', ParseIntPipe) id: number,
    ) {
        return await this.productService.findOne(id);
    }
}
