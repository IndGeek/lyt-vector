import NodeCache from "node-cache";

const cacheInstance = new NodeCache({ stdTTL: 3600 });

export function getFromCache(key: string): any | undefined {
    return cacheInstance.get(key);
}

export function setToCache(key: string, value: any, ttl: number = 3600): void {
    cacheInstance.set(key, value, ttl);
}

export async function cache(key: string, fn: () => Promise<any>, ttl: number = 3600) {
    const cachedValue = getFromCache(key);
    if (cachedValue) {
        return cachedValue;
    }
    const value = await fn();
    setToCache(key, value, ttl);
    return value;
}
