import * as React from 'react';
import type { SxProps } from '@mui/material/styles';

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
  sx?: SxProps;
}

declare const AppLayoutDocs: React.ComponentType<AppLayoutDocsProps>;

export default AppLayoutDocs;
