import NodeCache from "node-cache";

export const cache = new NodeCache({ stdTTL: 24 * 60 * 60 });

export function clearCacheDaily() {
  const now = new Date();
  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1,
    0,
    0,
    0
  );

  const timeUntilMidnight = midnight.getTime() - now.getTime();

  setTimeout(() => {
    cache.flushAll();
    clearCacheDaily();
  }, timeUntilMidnight);
}
