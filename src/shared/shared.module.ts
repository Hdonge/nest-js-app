import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";

import { HttpService } from "./services/http";
import { HttpClientBase } from "./services/http/httpClientBase";
import { Logger } from "./services/logger";

@Module({
    imports: [HttpModule.register({
        timeout: 5000,
        timeoutErrorMessage: "Request timeout! Please try again!",
    })],
    providers: [HttpClientBase, HttpService, Logger],
    exports: [HttpService, Logger]
})
export class SharedModule {}
