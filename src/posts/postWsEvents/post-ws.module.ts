import { Module } from "@nestjs/common";
import { SharedModule } from "src/shared/shared.module";

import { PostGateway } from "./post-ws.gateway";

@Module({
    imports: [SharedModule],
    providers: [PostGateway]
})
export class GatewayModule { }
