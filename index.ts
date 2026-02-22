import { Cache } from "./src/index";
import { LFU } from "./src/lfu";
import { LRU } from "./src/lru";

const cache1 = new Cache(3, new LRU<string>());
const cache2 = new Cache(3, new LFU<string>());
