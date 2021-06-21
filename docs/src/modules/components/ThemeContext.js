import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme as createLegacyModeTheme,
  unstable_createMuiStrictModeTheme as createStrictModeTheme,
  darken,
} from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { enUS, zhCN, faIR, ruRU, ptBR, esES, frFR, deDE, jaJP } from '@material-ui/core/locale';
import { blue, pink } from '@material-ui/core/colors';
import { getCookie } from 'docs/src/modules/utils/helpers';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';

const languageMap = {
  en: enUS,
  zh: zhCN,
  fa: faIR,
  ru: ruRU,
  pt: ptBR,
  es: esES,
  fr: frFR,
  de: deDE,
  ja: jaJP,
};

export const themeColor = blue[700];

const themeInitialOptions = {
  dense: false,
  direction: 'ltr',
  paletteColors: {},
  spacing: 8, // spacing unit
};

const highDensity = {
  props: {
    MuiButton: {
      size: 'small',
    },
    MuiFilledInput: {
      margin: 'dense',
    },
    MuiFormControl: {
      margin: 'dense',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'small',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiListItem: {
      dense: true,
    },
    MuiOutlinedInput: {
      margin: 'dense',
    },
    MuiFab: {
      size: 'small',
    },
    MuiTable: {
      size: 'small',
    },
    MuiTextField: {
      margin: 'dense',
    },
    MuiToolbar: {
      variant: 'dense',
    },
  },
  overrides: {
    MuiIconButton: {
      sizeSmall: {
        // minimal touch target hit spacing
        marginLeft: 4,
        marginRight: 4,
        padding: 12,
      },
    },
  },
};

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

if (process.env.NODE_ENV !== 'production') {
  DispatchContext.displayName = 'ThemeDispatchContext';
}

const useEnhancedEffect = typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

let createMuiTheme;
if (process.env.REACT_MODE === 'legacy') {
  createMuiTheme = createLegacyModeTheme;
} else {
  createMuiTheme = createStrictModeTheme;
}

export function ThemeProvider(props) {
  const { children } = props;

  const [themeOptions, dispatch] = React.useReducer((state, action) => {
    switch (action.type) {
      case 'SET_SPACING':
        return {
          ...state,
          spacing: action.payload,
        };
      case 'INCREASE_SPACING': {
        return {
          ...state,
          spacing: state.spacing + 1,
        };
      }
      case 'DECREASE_SPACING': {
        return {
          ...state,
          spacing: state.spacing - 1,
        };
      }
      case 'SET_DENSE':
        return {
          ...state,
          dense: action.payload,
        };
      case 'RESET_DENSITY':
        return {
          ...state,
          dense: themeInitialOptions.dense,
          spacing: themeInitialOptions.spacing,
        };
      case 'RESET_COLORS':
        return {
          ...state,
          paletteColors: themeInitialOptions.paletteColors,
        };
      case 'CHANGE':
        return {
          ...state,
          paletteType: action.payload.paletteType || state.paletteType,
          direction: action.payload.direction || state.direction,
          paletteColors: action.payload.paletteColors || state.paletteColors,
        };
      default:
        throw new Error(`Unrecognized type ${action.type}`);
    }
  }, themeInitialOptions);

  const userLanguage = useSelector((state) => state.options.userLanguage);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const preferredType = prefersDarkMode ? 'dark' : 'light';
  const { dense, direction, paletteColors, paletteType = preferredType, spacing } = themeOptions;

  useLazyCSS('/static/styles/prism-okaidia.css', '#prismjs');

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

  // persist paletteType
  React.useEffect(() => {
    document.cookie = `paletteType=${paletteType};path=/;max-age=31536000`;
  }, [paletteType]);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  const theme = React.useMemo(() => {
    const nextTheme = createMuiTheme(
      {
        direction,
        nprogress: {
          color: paletteType === 'light' ? '#000' : '#fff',
        },
        palette: {
          primary: {
            main: paletteType === 'light' ? blue[700] : blue[200],
          },
          secondary: {
            main: paletteType === 'light' ? darken(pink.A400, 0.1) : pink[200],
          },
          type: paletteType,
          background: {
            default: paletteType === 'light' ? '#fff' : '#121212',
          },
          ...paletteColors,
        },
        spacing,
      },
      dense ? highDensity : null,
      languageMap[userLanguage],
    );

    nextTheme.palette.background.level2 =
      paletteType === 'light' ? nextTheme.palette.grey[100] : '#333';

    nextTheme.palette.background.level1 =
      paletteType === 'light' ? '#fff' : nextTheme.palette.grey[900];

    return nextTheme;
  }, [dense, direction, paletteColors, paletteType, spacing, userLanguage]);

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    if (process.browser) {
      window.theme = theme;
    }
  }, [theme]);

  return (
    <MuiThemeProvider theme={theme}>
      <DispatchContext.Provider value={dispatch}>{children}</DispatchContext.Provider>
    </MuiThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

/**
 * @returns {(nextOptions: Partial<typeof themeInitialOptions>) => void}
 */
export function useChangeTheme() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback((options) => dispatch({ type: 'CHANGE', payload: options }), [dispatch]);
}
