import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../products/entities/product.entity";
import { AddToCartDto } from "./dtos/add-to-cart-dto.dto";
import { Cart } from "./entities/cart.entity";
import { CartItem } from "./entities/cartItem.entity";

@Injectable()
export class CartsService {
    constructor(
        @InjectRepository(Cart)
        private cartRepository: Repository<Cart>,

        @InjectRepository(CartItem)
        private cartItemRepository: Repository<CartItem>,

        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async addToCart(userId: number, dto: AddToCartDto) {
        const { productId, quantity } = dto;

        // check product exist
        const product = await this.productRepository.findOne({
            where: { id: productId },
        });

        if (!product) {
            throw new NotFoundException('Product not found');
        }

        // found cart
        let cart = await this.cartRepository.findOne({
            where: { user: { id: userId } },
            relations: ['items'],
        });

        // create new
        if (!cart) {
            cart = this.cartRepository.create({
                user: { id: userId },
            });
            await this.cartRepository.save(cart);
        }

        // check exist product
        const existingItem = await this.cartItemRepository.findOne({
            where: {
                cart: { id: cart.id },
                product: { id: productId },
            },
            relations: ['product'],
        });

        if (existingItem) {
            existingItem.quantity += quantity;
            return await this.cartItemRepository.save(existingItem);
        }

        // create new cart item
        const newItem = this.cartItemRepository.create({
            cart,
            product,
            quantity,
        });

        return await this.cartItemRepository.save(newItem);
    }

    async removeProduct(userId: number, productId: number) {
        const item = await this.cartItemRepository.findOne({
            where: {
                cart: {
                    user: {
                        id: userId
                    }
                },
                product: { id: productId },
            },
            relations: ['cart', 'product'],
        });

        if (!item) {
            throw new NotFoundException('Product not found in cart');
        }

        await this.cartItemRepository.remove(item);

        return { message: 'Product removed from cart' };
    }

    async getCartItems(userId: number) {
        const items = await this.cartItemRepository.find({
            where: {
                cart: {
                    user: { id: userId },
                },
            },
            relations: ['product'],
        });

        return items;
    }

    async checkCart(userId: number) {
        const foundCartItem = await this.cartItemRepository.findOne({
            where: {
                cart: {
                    user: { id: userId },
                },
            },
        });

        return {
            checkCart: !!foundCartItem
        };
    }

}
