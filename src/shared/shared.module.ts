import { HttpModule } from "@nestjs/axios";
import { BullModule } from "@nestjs/bull";
import { CacheModule, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ScheduleModule } from "@nestjs/schedule";

import { CacheService } from "./services/cache";
import { HttpService } from "./services/http";
import { HttpClientBase } from "./services/http/httpClientBase";
import { Logger } from "./services/logger";
import { NotificationService } from "./services/scheduler-crons/notifications";
import { TasksService } from "./services/scheduler-crons/tasks";

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
        }),
        ScheduleModule.forRoot(),
        BullModule.forRootAsync({
           useFactory: async (configService: ConfigService) => ({
            redis: {
                host: configService.get('BULL_REDIS_HOST'),
                port: configService.get('BULL_REDIS_PORT')
            }
           }),
           inject: [ConfigService]
        }),
        BullModule.registerQueue({
            name: 'file-upload-message-queue'
        })
    ],
    providers: [HttpClientBase, HttpService, Logger, CacheService, TasksService, NotificationService],
    exports: [HttpService, Logger, CacheService]
})
export class SharedModule { }
