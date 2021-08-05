import * as React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import GlobalStyles from '@material-ui/core/GlobalStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { getDesignTokens, getThemedComponents } from './brandingTheme';

const themeInitialOptions = {
  paletteMode: 'light',
} as const;

type Action = {
  type: 'CHANGE';
  payload: {
    paletteMode: 'light' | 'dark';
  };
};
type State = {
  paletteMode: 'light' | 'dark';
};
type Reducer = (state: State, action: Action) => State;

const DispatchContext = React.createContext<React.Dispatch<Action> | null>(null);

const ThemeProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [themeOptions, dispatch] = React.useReducer<Reducer>((state, action) => {
    switch (action.type) {
      case 'CHANGE':
        return {
          ...state,
          paletteMode: action.payload.paletteMode || state.paletteMode,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, themeInitialOptions);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredMode = prefersDarkMode ? 'dark' : 'light';
  const { paletteMode = preferredMode } = themeOptions;
  React.useEffect(() => {
    if (process.browser) {
      const nextPaletteMode = (getCookie('paletteMode') || preferredMode) as State['paletteMode'];

      dispatch({
        type: 'CHANGE',
        payload: { paletteMode: nextPaletteMode },
      });
    }
  }, [preferredMode]);
  const theme = React.useMemo(() => {
    const brandingDesignTokens = getDesignTokens(paletteMode);
    let nextTheme = createTheme({
      ...brandingDesignTokens,
      palette: {
        ...brandingDesignTokens.palette,
        mode: paletteMode,
      },
    });

    nextTheme = createTheme(nextTheme, {
      ...getThemedComponents(nextTheme),
    });

    return nextTheme;
  }, [paletteMode]);
  return (
    <MuiThemeProvider theme={theme}>
      <GlobalStyles
        styles={{
          html: {
            a: {
              textDecoration: 'unset',
            },
          },
        }}
      />
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  );
};

export const useChangeTheme = () => {
  const dispatch = React.useContext(DispatchContext);
  if (!dispatch) {
    throw new Error('Forgot to wrap component in `ThemeProvider`');
  }
  return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
};

export default ThemeProvider;
