import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Request, Response } from "express";
import * as crypto from "crypto";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
    constructor() { }
    private cache = new Map<string, any>();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request: Request = context.switchToHttp().getRequest();
        const response: Response = context.switchToHttp().getResponse();
        const key = this.getCacheKey(request);
        const cachedResponse = this.cache.get(key);

        if (cachedResponse) {
            response.setHeader('X-Cache', 'Cache Hit');
            return cachedResponse;
        }

        return next.handle().pipe(
            map(data => {
                response.setHeader('X-Cache', 'Cache Miss');
                this.cache.set(key, data);
                return data;
            })
        )
    }
    private getCacheKey(request: Request) {
        const { method, url } = request;
        return crypto.createHash('md5').update(`${method}${url}`).digest('hex');
    }
}
