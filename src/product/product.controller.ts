import { Body, Controller, Delete, Get, Head, Header, Param, Patch, Post, Query, Redirect } from '@nestjs/common';

import { createProductDto } from './dtos/create-product';
import { UpdateProductDto } from './dtos/update-product';
import { IProduct } from './interfaces/product';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    addProduct(
        @Body() createProductDto: createProductDto
    ): any {
        const generatedId = this.productService.insertProduct(createProductDto.title, createProductDto.description, createProductDto.price);
        return { id: generatedId }
    }

    @Get('list')
    @Header('Cache-Control', 'none')
    getAllProducts() : IProduct[] {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') productId: string) {
        return this.productService.getProduct(productId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') productId: string,
        @Body() updateProductDto: UpdateProductDto
    ) {
        return this.productService.updateProduct(productId, updateProductDto.title, updateProductDto.description, updateProductDto.price);
    }

    @Delete(':id')
    deleteProduct(
        @Param('id') productId: string
    ) {
        return this.productService.deleteProduct(productId);
    }
}
