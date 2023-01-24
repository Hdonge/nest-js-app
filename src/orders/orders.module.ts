import { Module } from "@nestjs/common";

import { SharedModule } from "src/shared/shared.module";
import { OrderEmailService } from "./orders-email.service";
import { OrdersController } from "./orders.controller";
import { OrdersService } from "./orders.service";

@Module({
    imports: [SharedModule],
    controllers: [OrdersController],
    providers: [OrdersService, OrderEmailService]
})
export class OrdersModule {}
