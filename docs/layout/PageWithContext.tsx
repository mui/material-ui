import rtl from 'jss-rtl';
import Layout from './Layout';
import React, { useState, useCallback } from 'react';
import orange from '@material-ui/core/colors/deepOrange';
import { create } from 'jss';
import { SnackbarProvider } from 'notistack';
import { setPrismTheme } from '../utils/prism';
import { PageContext } from '../utils/getPageContext';
import { UtilsContext } from '../_shared/UtilsServiceContext';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import { Theme, createMuiTheme, CssBaseline } from '@material-ui/core';
import { ThemeProvider, jssPreset, StylesProvider } from '@material-ui/styles';
import { createUtilsService, UtilsLib, utilsMap } from '../utils/utilsService';

export type ThemeType = 'light' | 'dark';
export type Direction = Theme['direction'];

export const ThemeContext = React.createContext<ThemeType>('light');

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const createCustomMuiTheme = (theme: ThemeType, direction: Theme['direction']) => {
  return createMuiTheme({
    direction,
    palette: {
      primary: {
        main: theme === 'dark' ? '#fdd835' : '#43a047',
      },
      secondary: orange,
      type: theme,
    },
  });
};

interface Props {
  children: React.ReactChild;
  pageContext: PageContext;
  initialTheme?: ThemeType;
}

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

  const muiTheme = createCustomMuiTheme(theme, direction);

  return (
    <StylesProvider
      jss={jss}
      sheetsManager={pageContext.sheetsManager}
      sheetsRegistry={pageContext.sheetsRegistry}
      generateClassName={pageContext.generateClassName}
    >
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={muiTheme}>
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
        </ThemeProvider>
      </SnackbarProvider>
    </StylesProvider>
  );
};
