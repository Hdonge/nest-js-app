import { Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";

import { Logger } from "src/shared/services/logger";
import { IOrder } from "./interfaces/order";

@Injectable()
export class OrderEmailService {
    constructor(private readonly logger: Logger) { }

    @OnEvent('order.created')
    handleOrderCreatedEvent(orderPayload: IOrder) {
        this.logger.debug(`Order is created with orderid ${orderPayload.id} & email sent to ${orderPayload.email}`);
    }
}
