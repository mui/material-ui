import * as React from 'react';
import { unstable_createCssVarsProvider } from '@mui/system';
import { SupportedColorScheme } from '../styles/createThemeFoundation';
import THEME_ID from '../styles/identifier';

type Result = ReturnType<
  typeof unstable_createCssVarsProvider<SupportedColorScheme, typeof THEME_ID>
>;

export declare const CssVarsProvider: Result['CssVarsProvider'];
export declare const useColorScheme: Result['useColorScheme'];
export declare const getInitColorSchemeScript: Result['getInitColorSchemeScript'];
export declare function Experimental_CssVarsProvider(props: any): React.JSX.Element;
