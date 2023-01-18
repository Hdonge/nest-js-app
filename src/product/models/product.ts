import { IProduct } from "../interfaces/product";

export class Product implements IProduct {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public price: string
    ) { };
}
