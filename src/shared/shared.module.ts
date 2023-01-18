import { HttpModule } from "@nestjs/axios";
import { CacheModule, Module } from "@nestjs/common";
import { CacheService } from "./services/cache";

import { HttpService } from "./services/http";
import { HttpClientBase } from "./services/http/httpClientBase";
import { Logger } from "./services/logger";

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            timeoutErrorMessage: "Request timeout! Please try again!",
        }),
        CacheModule.register({
            ttl: 10000,
            max: 5,
            isGlobal: true
        })
    ],
    providers: [HttpClientBase, HttpService, Logger, CacheService],
    exports: [HttpService, Logger, CacheService]
})
export class SharedModule { }
