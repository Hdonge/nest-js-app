import { Body, Controller, Head, HttpCode, HttpStatus, Post, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

import { AuthService } from "./auth.service";
import { registerUserDto } from "./dtos/register-user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    register(
        @Body() registerUserDto: registerUserDto
    ) {
        return this.authService.registerUser(registerUserDto.username, registerUserDto.password);
    }

    @Post('login')
    @HttpCode(200)
    login(
        @Body('username') username: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response //If you want to leave the response handling logic to the framework, remember to set the passthrough option to true

    ): string {
        const [userId, userSession] = this.authService.login(username, password);
        response.cookie('auth-session', userSession, { secure: false, httpOnly: true });
        response.status(HttpStatus.OK);
        return userId;
    }

    @Put('logout')
    @HttpCode(200)
    logout(
        @Body('username') username: string,
        @Req() request: Request,
        @Res({ passthrough: true }) response: Response //If you want to leave the response handling logic to the framework, remember to set the passthrough option to true
    ) {
        const session = request.cookies['auth-session'];
        response.cookie('auth-session', '', { secure: false, httpOnly: true });
        response.status(HttpStatus.OK);
        return this.authService.logout(username, session);
    }

    @Head('varify')
    @HttpCode(200)
    varifySession(
        @Req() request: Request
    ){
        const session = request.cookies['auth-session'];
        return this.authService.varifySession(session);
    }
}