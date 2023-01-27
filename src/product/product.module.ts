import { Module } from '@nestjs/common';
import { BullModule } from "@nestjs/bull";
import { ConfigService } from "@nestjs/config";

import { BulkProductsController } from './bulk-products.controller';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MulterModule } from '@nestjs/platform-express';
import { BulkProductsCsvProcessor } from './bulk-upload.processor';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('BULL_REDIS_HOST'),
          port: configService.get('BULL_REDIS_PORT')
        }
      }),
      inject: [ConfigService]
    }),
    BullModule.registerQueue({
      name: 'file-upload-message-queue'
    }),
    MulterModule.register()
  ],
  controllers: [ProductController, BulkProductsController],
  providers: [ProductService, BulkProductsCsvProcessor]
})
export class ProductModule { }
