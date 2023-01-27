import { IOrder } from "../interfaces/order";

export class Order implements IOrder {
    constructor(
        public id: number,
        public orderNumber: string,
        public description: string,
        public email: string
    ) { }
}
