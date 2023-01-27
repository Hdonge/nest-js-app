import { Controller, Sse, Get, Post } from "@nestjs/common";
import { interval, Observable, map } from 'rxjs';

@Controller('sse')
export class ServerSideEventsController {

    @Sse('event')
    sendEvent(): Observable<any> {
        return interval(2000).pipe(
            map((num: number) => ({
                data: 'hello ' + num
            }))
        );
    }
}
