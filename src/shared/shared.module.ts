import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { HttpService as AxiosHttpService } from "@nestjs/axios";

import { HttpService } from "./services/http";
import { HttpClientBase } from "./services/httpClientBase";

@Module({
    imports: [HttpModule.register({
        timeout: 5000,
        timeoutErrorMessage: "Request timeout! Please try again!",
    })],
    providers: [HttpClientBase, HttpService],
    exports: [HttpService]
})
export class SharedModule {}
