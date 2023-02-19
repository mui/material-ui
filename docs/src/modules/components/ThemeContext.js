import * as React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';
import useMediaQuery from '@mui/material/useMediaQuery';
import { enUS, zhCN, ptBR } from '@mui/material/locale';
import { unstable_useEnhancedEffect as useEnhancedEffect } from '@mui/material/utils';
import { getCookie } from 'docs/src/modules/utils/helpers';
import useLazyCSS from 'docs/src/modules/utils/useLazyCSS';
import { useUserLanguage } from 'docs/src/modules/utils/i18n';
import {
  getDesignTokens,
  getThemedComponents,
  getMetaThemeColor,
} from 'docs/src/modules/brandingTheme';

const languageMap = {
  en: enUS,
  zh: zhCN,
  pt: ptBR,
};

const themeInitialOptions = {
  dense: false,
  direction: 'ltr',
  paletteColors: {},
  spacing: 8, // spacing unit
  paletteMode: 'light',
};

export const highDensity = {
  components: {
    MuiButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiFilledInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormControl: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiInputLabel: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiListItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiFab: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTable: {
      defaultProps: {
        size: 'small',
      },
    },
    MuiTextField: {
      defaultProps: {
        margin: 'dense',
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense',
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

export function ThemeProvider(props) {
  const { children } = props;
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { noSsr: true });
  const preferredMode = prefersDarkMode ? 'dark' : 'light';

  const [themeOptions, dispatch] = React.useReducer(
    (state, action) => {
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
            paletteMode: action.payload.paletteMode || state.paletteMode,
            direction: action.payload.direction || state.direction,
            paletteColors: action.payload.paletteColors || state.paletteColors,
          };
        default:
          throw new Error(`Unrecognized type ${action.type}`);
      }
    },
    { ...themeInitialOptions, paletteMode: 'light' },
  );

  const userLanguage = useUserLanguage();
  const { dense, direction, paletteColors, paletteMode, spacing } = themeOptions;

  useLazyCSS('/static/styles/prism-okaidia.css', '#prismjs');

  useEnhancedEffect(() => {
    const nextPaletteColors = JSON.parse(getCookie('paletteColors') || 'null');
    let nextPaletteMode = localStorage.getItem('mui-mode') || preferredMode; // syncing with homepage, can be removed once all pages are migrated to CSS variables
    if (nextPaletteMode === 'system') {
      nextPaletteMode = preferredMode;
    }

    dispatch({
      type: 'CHANGE',
      payload: { paletteColors: nextPaletteColors, paletteMode: nextPaletteMode },
    });
  }, [preferredMode]);

  useEnhancedEffect(() => {
    document.body.dir = direction;
  }, [direction]);

  useEnhancedEffect(() => {
    // To support light and dark mode images in the docs
    if (paletteMode === 'dark') {
      document.body.classList.remove('mode-light');
      document.body.classList.add('mode-dark');
    } else {
      document.body.classList.remove('mode-dark');
      document.body.classList.add('mode-light');
    }

    const metas = document.querySelectorAll('meta[name="theme-color"]');
    metas.forEach((meta) => {
      meta.setAttribute('content', getMetaThemeColor(paletteMode));
    });
  }, [paletteMode]);

  const theme = React.useMemo(() => {
    const brandingDesignTokens = getDesignTokens(paletteMode);
    const nextPalette = deepmerge(brandingDesignTokens.palette, paletteColors);
    let nextTheme = createTheme(
      {
        direction,
        ...brandingDesignTokens,
        palette: {
          ...nextPalette,
          mode: paletteMode,
        },
        // v5 migration
        props: {
          MuiBadge: {
            overlap: 'rectangular',
          },
        },
        spacing,
      },
      dense ? highDensity : null,
      {
        components: {
          MuiCssBaseline: {
            defaultProps: {
              enableColorScheme: true,
            },
          },
        },
      },
      languageMap[userLanguage],
    );

    nextTheme = deepmerge(nextTheme, getThemedComponents(nextTheme));

    return nextTheme;
  }, [dense, direction, paletteColors, paletteMode, spacing, userLanguage]);

  React.useEffect(() => {
    // Expose the theme as a global variable so people can play with it.
    window.theme = theme;
    window.createTheme = createTheme;
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
