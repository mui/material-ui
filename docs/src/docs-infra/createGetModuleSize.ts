const cache = new Map();

async function fetchBundlephobia(packageName: string, packageVersion: string) {
  if (false && process.env.DEPLOY_ENV !== 'production' && process.env.DEPLOY_ENV !== 'staging') {
    return {
      assets: [],
    };
  }

  if (cache.has(packageName)) {
    return cache.get(packageName);
  }

  const bundlephobiaResponse = await fetch(`https://bundlephobia.com/api/exports-sizes?package=${packageName}@${packageVersion}`);
  const data = await bundlephobiaResponse.json();
  cache.set(packageName, data);
  return data;
}

export default function createGetModuleSize({ packageVersion, productIdPackage }: { packageVersion: Object, productIdPackage: Object }) {
  return async (pageProps: any) => {
    const markdownHeader = pageProps.docs.en.headers;

    // @ts-ignore
    const packageName = productIdPackage[markdownHeader.productId];
    // @ts-ignore
    const data = await fetchBundlephobia(packageName, packageVersion[packageName]);

    const modules = markdownHeader.components.concat(markdownHeader.hooks);

    const sizes = data.assets.reduce((acc: any, asset: any) => {
      if (modules.includes(asset.name)) {
        acc[asset.name] = asset.gzip;
      }
      return acc;
    }, {});

    return sizes;
  }
}
