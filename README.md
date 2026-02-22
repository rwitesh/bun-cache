# BunCache

## Pluggable in-memory cache with swappable eviction policies. Built for [Bun](https://bun.com).

### Install

```bash
bun install
```

### API

#### `Cache<K, V>`

In-memory key-value cache with a fixed maximum size and an optional eviction policy.

##### Constructor

```ts
new Cache<K, V>(maxSize?, policy?)
```

| Argument   | Type   | Default         | Description                                      |
| ---------- | ------ | --------------- | ------------------------------------------------ |
| `maxSize`  | number | `Infinity`      | Maximum number of entries. When full, eviction runs. |
| `policy`   | object | `NoEviction`    | Eviction policy implementing the policy interface.   |

##### Methods

- **`get(key: K): V | undefined`**  
  Returns the value for `key`, or `undefined` if missing. 

- **`set(key: K, value: V): void`**  
  Stores `value` under `key`. 

- **`delete(key: K): void`**  
  Removes `key` from the cache.

---

### Eviction policies

Policies live under `src/eviction/`. You can use a built-in one or implement the same interface for a custom policy.

### Built-in policies

| Policy        | Import                         | Behavior |
| ------------- | ------------------------------ | -------- |
| **LRU**       | `./src/eviction/lru`           | Evicts the **least recently used** key. Good default for most caches. |
| **LFU**       | `./src/eviction/lfu`           | Evicts the **least frequently used** key. Good when access frequency matters more than recency. |
| **Random**    | `./src/eviction/random`        | Evicts a **random** key. Simple and fast; no access tracking. |
| **NoEviction**| `./src/eviction/none` (default)| Never evicts (`evict()` returns `null`). When at capacity, `set` does nothing for new keys. |

#### Using a policy

```ts
import { Cache } from "./src/index";
import { LRU } from "./src/eviction/lru";
import { LFU } from "./src/eviction/lfu";
import { Random } from "./src/eviction/random";

// LRU: drop least recently used when full
const lruCache = new Cache(100, new LRU<string>());

// LFU: drop least frequently used when full
const lfuCache = new Cache(100, new LFU<string>());

// Random: drop a random key when full
const randomCache = new Cache(100, new Random<string>());

// No eviction (default): unbounded or reject new keys when at maxSize
const noEvictionCache = new Cache(100); // or new Cache(100, new NoEviction())
```

### Run

```bash
bun run index.ts
```

Or run the main entry point directly:

```bash
bun index.ts
```

