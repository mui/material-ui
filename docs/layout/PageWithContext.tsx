import React, { useState, useCallback } from 'react';
import { MuiThemeProvider, Theme, createMuiTheme, jssPreset, CssBaseline } from '@material-ui/core';
import JssProvider from 'react-jss/lib/JssProvider';

import Layout from './Layout';
import rtl from 'jss-rtl';
import { create } from 'jss';
import { UtilsContext } from '../_shared/UtilsServiceContext';
import { createUtilsService, UtilsLib, utilsMap } from '../utils/utilsService';
import { PageContext } from '../utils/getPageContext';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { setPrismTheme } from '../utils/prism';
import orange from '@material-ui/core/colors/deepOrange';
import { SnackbarProvider } from 'notistack';

export type ThemeType = 'light' | 'dark';
export type Direction = Theme['direction'];

export const ThemeContext = React.createContext<ThemeType>('light');

// @ts-ignore Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const createCustomMuiTheme = (theme: ThemeType, direction: Theme['direction']) => {
  return createMuiTheme({
    direction,
    typography: {
      useNextVariants: true,
    },
    palette: {
      primary: {
        main: theme === 'dark' ? '#fdd835' : '#43a047',
      },
      secondary: orange,
      type: theme,
    },
  });
};

type Props = {
  children: React.ReactChild;
  pageContext: PageContext;
  initialTheme?: ThemeType;
};

export const PageWithContexts: React.SFC<Props> = ({
  children,
  pageContext,
  initialTheme = 'light',
}) => {
  const [lib, setLib] = useState<UtilsLib>('date-fns');
  const [theme, setTheme] = useState<ThemeType>(initialTheme);
  const [direction, setDirection] = useState<Direction>('ltr');

  const setBodyDirection = useCallback(() => {
    const newDirection = direction === 'ltr' ? 'rtl' : 'ltr';
    document.body.dir = newDirection;

    setDirection(newDirection);
  }, [direction]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';

    setTheme(newTheme);
    setPrismTheme(newTheme);
    document.cookie = `theme=${newTheme}`;
  }, [theme]);

  return (
    <JssProvider
      jss={jss}
      registry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <MuiThemeProvider
        theme={createCustomMuiTheme(theme, direction)}
        sheetsManager={pageContext.sheetsManager}
      >
        <SnackbarProvider maxSnack={3}>
          <MuiPickersUtilsProvider utils={utilsMap[lib]}>
            <ThemeContext.Provider value={theme}>
              <UtilsContext.Provider value={createUtilsService(lib)}>
                <CssBaseline />

                <Layout
                  children={children}
                  onChangeUtils={setLib}
                  toggleThemeType={toggleTheme}
                  toggleDirection={setBodyDirection}
                />
              </UtilsContext.Provider>
            </ThemeContext.Provider>
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </MuiThemeProvider>
    </JssProvider>
  );
};
