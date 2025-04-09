import * as React from 'react';
import type { MuiPage } from 'docs/src/MuiPage';
import type { MuiProductId } from 'docs/src/modules/utils/getProductInfoFromUrl';
import { RootSvgProps } from 'docs/src/icons/RootSvg';

export interface ProductVersion {
  text: string;
  current: boolean;
  href?: undefined;
}

export interface ProductInfo {
  metadata: string;
  name: string;
  logo: (props: RootSvgProps) => React.JSX.Element;
  logoSvg: string;
  wordmarkSvg: string;
  versions: ProductVersion[];
}

export interface MuiPageContext {
  activePage: MuiPage | null;
  pages: MuiPage[];
  productId: MuiProductId;
  productIdentifier: ProductInfo;
  activePageParents: MuiPage[];
}

const PageContext = React.createContext<MuiPageContext>(undefined!);

if (process.env.NODE_ENV !== 'production') {
  PageContext.displayName = 'PageContext';
}

export default PageContext;
