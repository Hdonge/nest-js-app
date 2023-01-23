import { Controller, UploadedFile, Post, UseInterceptors, Body, Req } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";

@Controller('bulk-product')
export class BulkProductsController {
    constructor(@InjectQueue('file-upload-message-queue') private fileUploadQueue: Queue) { }

    @Post('creat-products/upload')
    @UseInterceptors(FileInterceptor('csv', {
        storage: diskStorage({
            destination: './csv',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 2)));
                cb(null, `${randomName}${extname(file.originalname)}`);
            }
        })
    }))
    uploadBulkProductsCreateCsv(
        @UploadedFile() file
    ) {
        this.fileUploadQueue.add('csv', { file: file });
    }
}
