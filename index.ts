import { Cache } from "./src/index";
import { LFU } from "./src/eviction/lfu";
import { LRU } from "./src/eviction/lru";
import { Random } from "./src/eviction/random";

const cache1 = new Cache(3, new LRU<string>());
const cache2 = new Cache(3, new LFU<string>());
const cache3 = new Cache(3, new Random<string>());
const cache5 = new Cache(3);
const cache4 = new Cache();
