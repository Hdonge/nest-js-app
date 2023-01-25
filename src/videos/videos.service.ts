import { Injectable } from "@nestjs/common";
import { createReadStream } from "fs";
import { join } from "path";

@Injectable()
export class VideosService {
    getVideoFileStream(videoName: string) {
        const path = join(process.cwd() + `/videos/${videoName}.mp4`);
        return createReadStream(path);
     }
}
