import { Global, Module } from '@nestjs/common';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-ioredis-yet';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        return {
          store: await redisStore({
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
            port: +process.env.REDIS_PORT,
            ttl: +process.env.REDIS_TTL,
            
          }),
        };
      },
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheCustomModule {}
