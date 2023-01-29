import { Module } from "@nestjs/common";

import { SharedModule } from "src/shared/shared.module";
import { GatewayModule } from "./postWsEvents/post-ws.module";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";

@Module({
    imports: [SharedModule, GatewayModule],
    controllers: [PostsController],
    providers: [PostsService]
})
export class PostsModule{}
