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
        this.logger.debug('Called when the current second is 45', 'handleCronWithExpression');
    }

    @Cron(CronExpression.EVERY_10_MINUTES)
    handleCron() {
        this.logger.log('Called at every 10 Minutes', 'handlCron');
    }

    @Interval('notifications', 250000)
    handleInterval() {
        this.logger.log('Called at every 250 seconds', 'handleInterval');
    }

    @Timeout(5000)
    handleTimeout() {
        this.logger.debug('Called once after 5 seconds', 'handleTimeout');
    }
}
