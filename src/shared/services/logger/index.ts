import { Injectable, LoggerService, ConsoleLogger, LogLevel, Scope } from "@nestjs/common";

@Injectable({scope : Scope.TRANSIENT})
export class Logger extends ConsoleLogger implements LoggerService {
    mainContext: string;

    log(message: any, context?: string) {
        super.log(message, `${this.mainContext}.${context}`);
    }
    error(message: any, stack?: string, context?: string) {
        super.error(message, stack, `${this.mainContext}.${context}`);
    }
    warn(message: any, context?: string) {
        super.warn(message, `${this.mainContext}.${context}`);
    }
    debug(message: any, context?: string) {
        super.debug(message, `${this.mainContext}.${context}`);
    }
    verbose(message: any, context?: string) {
        super.verbose(message, `${this.mainContext}.${context}`);
    }

    setLogLevels(levels: LogLevel[]): void {
        super.setLogLevels(levels);
    }
}
