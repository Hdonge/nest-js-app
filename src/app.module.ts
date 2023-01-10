import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartsController } from './carts/carts.controller';
import { CartsModule } from './carts/carts.module';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { ProductModule } from './product/product.module';
import { AuthMiddleware } from './shared/middlewares/auth';
import { LoggerMiddleware } from './shared/middlewares/logger';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/.${process.env.NODE_ENV}.env`
    }),
    ProductModule,
    AuthModule,
    SharedModule,
    CartsModule,
    PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
      consumer
      .apply(LoggerMiddleware).forRoutes(CartsController, PostsController)
      .apply(AuthMiddleware).forRoutes(AppController);
  }
}
