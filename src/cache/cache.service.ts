import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async initTest() {
    await this.cacheManager.set('key1', 'value1');
    const value = await this.cacheManager.get('key1');
    console.log(value);
  }
  async setValue(key: string, value: string): Promise<void> {
    return await this.cacheManager.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.cacheManager.get(key);
  }
}
