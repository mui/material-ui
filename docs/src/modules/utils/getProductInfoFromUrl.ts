import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';

export type MuiProductId =
  | null
  | 'base-ui'
  | 'material-ui'
  | 'joy-ui'
  | 'system'
  | 'data-grid'
  | 'date-pickers';

type MuiProductCategoryId = null | 'core' | 'x';

interface MuiProductInfo {
  productId: MuiProductId;
  productCategoryId: MuiProductCategoryId;
}

export default function getProductInfoFromUrl(asPath: string): MuiProductInfo {
  const asPathWithoutLang = pathnameToLanguage(asPath).canonicalAs;
  let productCategoryId: string | null = 'core';
  // firstFolder
  let productId: string | null = asPathWithoutLang.replace(/^\/+([^/]+)\/.*/, '$1');

  if (productId === 'x') {
    productCategoryId = 'x';
    productId = asPathWithoutLang.replace('/x/react-', '').replace(/\/.*/, '');
  }

  if (asPathWithoutLang === '/versions/') {
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
