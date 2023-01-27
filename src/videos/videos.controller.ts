import { Controller, Get, Header, Param, Res, Headers } from "@nestjs/common";
import { Response } from "express";

import { VideosService } from "./videos.service";

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Get(':name')
    @Header('Content-Type', 'video/mp4')
    async getVideo(
        @Param('name') name: string,
        @Res() res: Response
    ) {
        this.videosService.getVideoFileStream(name).pipe(res);
    }
}
