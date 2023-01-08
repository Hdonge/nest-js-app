import { Controller, Get, Query, HttpCode, Param, Post, Put, Delete, Body } from "@nestjs/common";

import { CartsService } from "./carts.service";
import { ICreateCartDto } from "./dtos/create-cart-dto";

@Controller('carts')
export class CartsController {
    constructor(private readonly cartsService: CartsService) { }

    @Get()
    @HttpCode(200)
    getCarts(
        @Query('limit') limit: number,
        @Query('skip') skip: number,
        @Query('filters') filters: any
    ) {
        return this.cartsService.getCarts(limit, skip, filters);
    }

    @Get(':id')
    @HttpCode(200)
    getCart(
        @Param('id') id: number
    ) {
        return this.cartsService.getCart(id);
    }

    @Get('/user/:id')
    @HttpCode(200)
    getCartsOfUser(
        @Param('id') userId: number
    ) {
        return this.cartsService.getCartsOfUser(userId);
    }

    @Post()
    createCart(
        @Body() createCartDto: ICreateCartDto
    ) {
        return this.cartsService.postCart(createCartDto);
    }

    @Put(':id')
    updateCart(
        @Param('id') id: number,
        @Body() updateCartDto: ICreateCartDto
    ) {
        return this.cartsService.putCart(id, updateCartDto);
    }

    @Delete(':id')
    deleteCart(
        @Param('id') id: number
    ) {
        return this.cartsService.deleteCart(id);
    }
}
