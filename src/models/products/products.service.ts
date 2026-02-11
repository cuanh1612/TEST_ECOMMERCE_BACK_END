import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async create(input: CreateProductDto) {
        const newProduct = this.productRepository.create({
            ...input
        })

        return this.productRepository.save(newProduct)
    }

    async find() {
        return this.productRepository.find({})
    }

    async findOne(id: number) {
        const foundProduct = await this.productRepository.findOne({
            where: {
                id
            }
        })

        if (!id) throw new NotFoundException()

        return foundProduct
    }
}
