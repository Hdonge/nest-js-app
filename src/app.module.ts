import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ThrottlerModule } from "@nestjs/throttler";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartsController } from './carts/carts.controller';
import { CartsModule } from './carts/carts.module';
import { OrdersModule } from './orders/orders.module';
import { PostsController } from './posts/posts.controller';
import { PostsModule } from './posts/posts.module';
import { ProductModule } from './product/product.module';
import { ServerSideEventsController } from './server-events.controller';
import { AuthMiddleware } from './shared/middlewares/authentication';
import { LoggerMiddleware } from './shared/middlewares/logger';
import { SharedModule } from './shared/shared.module';
import { ValidUserController } from './validUser.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/config/.${process.env.NODE_ENV}.env`
    }),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10
    }),
    ProductModule,
    AuthModule,
    SharedModule,
    CartsModule,
    PostsModule,
    OrdersModule
  ],
  controllers: [AppController, ValidUserController, ServerSideEventsController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer){
      consumer
      .apply(LoggerMiddleware).forRoutes(CartsController, PostsController)
      .apply(AuthMiddleware).forRoutes(AppController, ValidUserController);
  }
}
