import { Controller, Get, Put, Body, UseGuards } from "@nestjs/common";
import { AuthGuard } from "./shared/guards/authorization";

@UseGuards(AuthGuard) //Controller level gaurd to autorize all methods in controller
@Controller('validuser')
export class ValidUserController {
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
