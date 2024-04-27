import { Module } from '@nestjs/common/decorators/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { MiddlewareConsumer, NestModule, ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/logger.middleware';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { RolesGuard } from './roles/roles.guard';
import { AuthGuard } from './auth/auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesModule } from './roles/roles.module';
import { CacheCustomModule } from './cache/cache.module';
import { ConfigModule } from '@nestjs/config';
import { SocketGateway } from './socket/socket.gateway';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URL,{
      dbName: 'nestjs-project',
      connectionName: "mongoDB"
    }),
    ChatModule,
    MessagesModule,
    RolesModule,
    AuthModule,
    UsersModule,
    SocketModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_PIPE,
      useFactory:() => new ValidationPipe({
        transform: true,
        whitelist: true,
        disableErrorMessages: false
      })
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes("*");
  }
}

