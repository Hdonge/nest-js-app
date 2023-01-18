import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { Logger } from "../services/logger";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor(private readonly logger: Logger) {
        this.logger.mainContext = 'LoggerMiddleware';
    }
    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();
        next();
        const end = Date.now();
        const requestTime = end - start;
        this.logger.verbose(`Request to ${req.url} took ${requestTime}ms`, 'responsePerformanceMatrix');
        //Here entire request and response coming to API from client can be logged.
    }
}
