import * as React from 'react';
import type { MuiPage } from 'docs/src/MuiPage';
import type { MuiProductId } from 'docs/src/modules/utils/getProductInfoFromUrl';
import { RootSvgProps } from 'docs/src/icons/RootSvg';

export interface ProductIdentifier {
  metadata: string;
  name: string;
  logo: (props: RootSvgProps) => React.JSX.Element;
  logoSvg: string;
  wordmarkSvg: string;
  versions: {
    text: string;
    current: boolean;
    href?: undefined;
  }[];
}

const PageContext = React.createContext<{
  activePage: MuiPage | null;
  pages: MuiPage[];
  productId: MuiProductId;
  productIdentifier: ProductIdentifier;
}>(undefined!);

if (process.env.NODE_ENV !== 'production') {
  PageContext.displayName = 'PageContext';
}

export default PageContext;
