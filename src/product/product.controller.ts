import { Body, Controller, Delete, Get, Header, Param, Patch, Post } from '@nestjs/common';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: string): any {
        const generatedId = this.productService.insertProduct(prodTitle, prodDesc, prodPrice);
        return { id: generatedId }
    }

    @Get()
    @Header('Cache-Control', 'none')
    getAllProducts() {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') productId:string){
        return this.productService.getProduct(productId);
    }
    
    @Patch(':id')
    updateProduct(
        @Param('id') productId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: string
    ){
        return this.productService.updateProduct(productId, prodTitle, prodDesc, prodPrice);
    }

    @Delete(':id')
    deleteProduct(
        @Param('id') productId: string
    ){
        return this.productService.deleteProduct(productId);
    }
}
