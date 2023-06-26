import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

export type MuiProductId =
  | null
  | 'base-ui'
  | 'material-ui'
  | 'joy-ui'
  | 'system'
  | 'x-data-grid'
  | 'x-date-picker';

type MuiProductCategoryId = null | 'core' | 'x';

interface MuiProductInfo {
  productId: MuiProductId;
  productCategoryId: MuiProductCategoryId;
}

export default function getProductInfoFromUrl(asPath: string): MuiProductInfo {
  const asPathWithoutLang = pathnameToLanguage(asPath).canonicalAsServer;
  let productCategoryId: string | null = 'core';
  // firstFolder
  const segments = asPathWithoutLang.split('/').filter(Boolean);
  let productId: string | null = segments[0] ?? null;

  if (productId === 'x') {
    productCategoryId = 'x';
    const subCategory = segments.length > 1 ? /^react-(.*)$/.exec(segments[1]) : null;
    if (subCategory) {
      productId = `x-${subCategory[1]}`;
    }
  }

  if (productId === 'toolpad') {
    productCategoryId = 'toolpad';
  }

  if (segments[0] === 'versions') {
    productId = null;
  }

  if (asPathWithoutLang === '/') {
    productCategoryId = null;
    productId = null;
  }

  return {
    productCategoryId,
    productId,
  } as MuiProductInfo;
}
