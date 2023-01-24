import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

import { CreateOrderDto } from "./dto/create-order.dto";
import { IOrder } from "./interfaces/order";

@Injectable()
export class OrdersService {
    constructor(private eventEmitter: EventEmitter2) { }

    public orders: IOrder[] = [
        {
            id: 1,
            orderNumber: '#1',
            description: 'Description order #1',
            email: 'abc@abc.com'
        },
        {
            id: 2,
            orderNumber: '#2',
            description: 'Description order #2',
            email: 'abc@abc.com'
        }
    ];

    createOrder(createOrderDto: CreateOrderDto) {
        const order: IOrder = {
            id: this.orders.length + 1,
            ...createOrderDto
        }

        this.orders.push(order);

        this.eventEmitter.emit('order.created', order);

        return order;
    }
}
