import { Controller, Get, Header, Param, Res, StreamableFile } from "@nestjs/common";
import { Response } from "express";

import { VideosService } from "./videos.service";

@Controller('videos')
export class VideosController {
    constructor(private readonly videosService: VideosService) { }

    @Get(':name')
    @Header('content-type', 'video/mp4')
    async getVideo(
        @Param('name') name: string,
        @Res() res: Response
    ) {
        const file = this.videosService.getVideoFileStream(name);
        file.pipe(res);
    }
}