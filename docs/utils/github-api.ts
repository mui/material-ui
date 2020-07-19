import fetch from 'isomorphic-fetch';

let cacheRemaining = 0;
const cache = {
  tags: null as { name: string }[] | null,
};

type CacheType = typeof cache;

export function fetchGithubData<T extends keyof CacheType>(
  path: T
): Promise<NonNullable<CacheType[T]>> {
  if (cache[path] && new Date().getTime() < cacheRemaining) {
    return Promise.resolve(cache[path] || ([] as any));
  }

  return fetch('https://api.github.com/repos/mui-org/material-ui-pickers/' + path, {
    headers: {
      // just a super basic readonly token, that makes api rate limit = 5000/hour
      Authorization: 'token 14ef125b9fbcf138ff9042b45f89f8b3c28f510a',
    },
  })
    .then((res) => {
      cacheRemaining = Number(res.headers.get('X-RateLimit-Reset')) * 1000;
      if (res.status > 400) {
        // We cannot update the cache on this step
        throw new Error('Could not fetch the data');
      }

      return res.json();
    })
    .then((data: NonNullable<CacheType[T]>) => {
      cache[path] = data;
      return data;
    });
}
