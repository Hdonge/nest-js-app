import { Injectable } from "@nestjs/common";
import { createReadStream, statSync } from "fs";
import { join } from "path";

@Injectable()
export class VideosService {
    getVideoFileStream(videoName: string) {
        const path = join(process.cwd() + `/src/assets/videos/${videoName}.mp4`);
        return createReadStream(path);
    }
}
