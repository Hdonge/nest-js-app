import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ProductService {
    products: Product[] = [];

    insertProduct(title: string, desc: string, price: string) {
        const newProductId = uuidv4();
        const newProduct = new Product(newProductId, title, desc, price);
        this.products.push(newProduct);
        return newProductId;
    }

    getProducts() {
        return [...this.products];
    }

    getProduct(productId) {
        const product = this.findProduct(productId);
        return { ...product }
    }

    updateProduct(productId: string, title: string, desc: string, price: string) {
        const product = this.findProduct(productId);
        if(title) product.title = title;
        if(desc) product.description = desc;
        if(price) product.price = price;
        return;
    }

    deleteProduct(productId: string){
        let productIndex = this.products.findIndex(product => product.id === productId);
        this.products.splice(productIndex, 1);
        return;
    }

    private findProduct(id: string): Product {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new NotFoundException('Product not found!');
        }
        return product;
    }
}
