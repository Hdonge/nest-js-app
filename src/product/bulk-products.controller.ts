import { Controller, UploadedFile, Post, UseInterceptors, Body, Req } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import { Queue } from "bull";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";

@Controller('bulk-product')
export class BulkProductsController {
    constructor(@InjectQueue('file-upload-message-queue') private fileUploadQueue: Queue) { }

    @Post('creat-products/upload')
    @UseInterceptors(FileInterceptor('csv', {
        storage: diskStorage({
            destination: './csv',
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        })
    }))
    uploadBulkProductsCreateCsv(
        @UploadedFile() file
    ) {
        this.fileUploadQueue.add('csv', { file: file });
    }
}
