import { redis } from "./upstash";

export async function rateLimit(ip: string) {
    const key = `rate-limit:${ip}`;

    const requests = await redis.incr(key);

    if (requests === 1) {
        await redis.expire(key, 600);
    }

    return requests <= 5;
}
