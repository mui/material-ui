import * as React from 'react';
import { SxProps } from '@mui/material/styles';
import { MuiPageContext } from './PageContext';

export function convertProductIdToName(productInfo: MuiPageContext): string | undefined;

export interface AppSearchProps {
  sx?: SxProps;
}

declare const AppSearch: React.ComponentType<AppSearchProps>;

export default AppSearch;
