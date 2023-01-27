import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";

@Processor('file-upload-message-queue')
export class BulkProductsCsvProcessor {

    @Process('csv')
    async handleBulkCsvFile(job: Job) {
        const csv = require('csvtojson');
        const csvFilePath = process.cwd() + '/' + job.data.file.path;
        const productsArray = await csv().fromFile(csvFilePath);
        console.log(productsArray);
        //Bulk product create service from here.
    }
}