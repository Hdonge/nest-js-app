import { Injectable, CACHE_MANAGER, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class CacheService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) { }
    //private cache = new Map<string, any>();

    get(key: string) {
        return this.cache.get(key);
    }

    set(key: string, data: any) {
        this.cache.set(key, data);
    }

    delete(key: string) {
        this.cache.del(key);
    }

    reset(){
        this.cache.reset();
    }
}
