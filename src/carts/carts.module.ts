import { Module } from "@nestjs/common";

import { SharedModule } from "src/shared/shared.module";
import { CartsController } from "./carts.controller";
import { CartsService } from "./carts.service";

@Module({
    imports: [SharedModule],
    controllers: [CartsController],
    providers: [CartsService]
})
export class CartsModule {}
