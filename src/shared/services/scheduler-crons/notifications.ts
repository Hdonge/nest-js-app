import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Timeout, SchedulerRegistry } from "@nestjs/schedule";

import { Logger } from "../logger";

@Injectable()
export class NotificationService {
    constructor(private readonly logger: Logger, private readonly schedulerRegistry: SchedulerRegistry) {
        this.logger.mainContext = 'NotificationService';
    }

    @Cron('1 * * * * *', {
        name: 'notifications',
        timeZone: 'Europe/Paris',
    })
    triggerNotifications() {
        this.logger.debug('Notifications are triggered', 'triggerNotifications');
    }

    @Cron(CronExpression.EVERY_5_SECONDS, {
        name: 'notificationWithInterval'
    })
    triggerNotificationWithInterval() {
        this.logger.debug('Notifications are triggered with interval of five seconds', 'triggerNotificationWithInterval');
    }

    @Timeout(20000)
    stopNotificationWithInterval() {
        const job = this.schedulerRegistry.getCronJob('notificationWithInterval');
        job.stop();
        this.logger.warn('Stopped notificationWithInterval', 'stopNotificationWithInterval');
    }
}
