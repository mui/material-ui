import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';
import { darken } from '@material-ui/core/styles/colorManipulator';
import { getCookie } from 'docs/src/modules/utils/helpers';
import { lightTheme, darkTheme, setPrismTheme } from 'docs/src/modules/components/prism';

export const themeInitialOptions = {
  direction: 'ltr',
  paletteType: 'light',
  paletteColors: {
    primary: {
      main: blue[500],
    },
    secondary: {
      // Darken so we reach the AA contrast ratio level.
      main: darken(pink.A400, 0.08),
    },
  },
};

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in ThemeContext.Provider');
});

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

export function Provider(props) {
  const { children } = props;

  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'RESET_COLORS':
        return {
          ...state,
          paletteColors: themeInitialOptions.paletteColors,
        };
      case 'CHANGE':
        return {
          paletteType: action.payload.paletteType || state.paletteType,
          direction: action.payload.direction || state.direction,
          paletteColors: action.payload.paletteColors || state.paletteColors,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, themeInitialOptions);
  const { direction, paletteColors, paletteType } = themeOptions;

  React.useEffect(() => {
    setPrismTheme(paletteType === 'light' ? lightTheme : darkTheme);
  }, [paletteType]);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  const theme = React.useMemo(() => {
    const nextTheme = createMuiTheme({
      direction,
      nprogress: {
        color: paletteType === 'light' ? '#000' : '#fff',
      },
      palette: {
        ...paletteColors,
        type: paletteType,
        background: {
          default: paletteType === 'light' ? '#fff' : '#303030',
        },
      },
    });

    nextTheme.palette.background.level1 =
      paletteType === 'light' ? nextTheme.palette.grey[100] : nextTheme.palette.grey[900];

    nextTheme.palette.background.level0 =
      paletteType === 'light' ? nextTheme.palette.grey[50] : nextTheme.palette.grey[900];

    return nextTheme;
  }, [direction, paletteColors, paletteType]);

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if (process.browser) {
      window.theme = theme;
    }
  }, [theme]);

  React.useEffect(() => {
    if (process.browser) {
      const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
      const nextPaletteType = getCookie('paletteType');

      dispatch({
        type: 'CHANGE',
        payload: { paletteColors: nextPaletteColors, paletteType: nextPaletteType },
      });
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </ThemeProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
};

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(options => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
