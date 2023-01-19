import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Interval, Timeout } from "@nestjs/schedule";

import { Logger } from "../logger";

@Injectable()
export class TasksService {
    constructor(private readonly logger: Logger) {
        this.logger.mainContext = 'TasksService';
    }

    @Cron('45 * * * * *')
    handleCronWithExpression() {
        this.logger.debug('Called when the current second is 45');
    }

    @Cron(CronExpression.EVERY_10_SECONDS)
    handleCron() {
        this.logger.log('Called at every 10 seconds', 'handlCron');
    }

    @Interval('notifications', 2500)
    handleInterval() {
        this.logger.log('Called at every 2.5 seconds', 'handleInterval');
    }

    @Timeout(5000)
    handleTimeout() {
        this.logger.debug('Called once after 5 seconds', 'handleTimeout');
    }
}
