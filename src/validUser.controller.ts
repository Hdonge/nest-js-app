import { Controller, Get, Put, Body, UseGuards } from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common/decorators";
import { SkipThrottle, ThrottlerGuard } from "@nestjs/throttler";
import { AuthGuard } from "./shared/guards/authorization";
import { CacheInterceptor } from "./shared/interceptors/cache";

@UseInterceptors(CacheInterceptor)
@UseGuards(AuthGuard, ThrottlerGuard) //Controller level gaurd to autorize all methods in controller
@Controller('validuser')
export class ValidUserController {
    @SkipThrottle()
    @Get()
    getValidUserDetails() {
        return {
            name: 'Foo',
            id: '12344'
        }
    }

    @UseGuards(AuthGuard) //Method level gaurd to autorize specific method in controller
    @Put()
    updateValidUserDetails(
        @Body('name') name: string,
        @Body('id') id: string
    ) {
        return {
            name: name,
            id: id
        }
    }
}
