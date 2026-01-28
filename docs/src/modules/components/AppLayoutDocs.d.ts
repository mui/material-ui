import * as React from 'react';

export interface AppLayoutDocsProps {
  BannerComponent?: React.ElementType;
  cardOptions?: {
    description: string;
    title: string;
  };
  children: React.ReactNode;
  description: string;
  disableAd: boolean;
  disableLayout?: boolean;
  disableToc: boolean;
  hasTabs?: boolean;
  location: string;
  title: string;
  toc: any[];
}

declare const AppLayoutDocs: React.ComponentType<AppLayoutDocsProps>;

export default AppLayoutDocs;
