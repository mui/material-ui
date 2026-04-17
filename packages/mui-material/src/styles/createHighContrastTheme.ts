import autocompleteClasses from '../Autocomplete/autocompleteClasses';
import checkboxClasses from '../Checkbox/checkboxClasses';
import filledInputClasses from '../FilledInput/filledInputClasses';
import formControlLabelClasses from '../FormControlLabel/formControlLabelClasses';
import formHelperTextClasses from '../FormHelperText/formHelperTextClasses';
import formLabelClasses from '../FormLabel/formLabelClasses';
import inputClasses from '../Input/inputClasses';
import menuItemClasses from '../MenuItem/menuItemClasses';
import nativeSelectClasses from '../NativeSelect/nativeSelectClasses';
import outlinedInputClasses from '../OutlinedInput/outlinedInputClasses';
import radioClasses from '../Radio/radioClasses';
import sliderClasses from '../Slider/sliderClasses';
import toggleButtonClasses from '../ToggleButton/toggleButtonClasses';
import createTheme from './createTheme';

export interface HighContrastTokens {
  /** Color for disabled elements. Default: `'GrayText'` */
  disabled?: string | undefined;
  /** Color for error states. Default: `'mark'` */
  error?: string | undefined;
  /** Background color for selected items. Default: `'Highlight'` */
  selectedBackground?: string | undefined;
  /** Text color on selected items. Default: `'HighlightText'` */
  selectedText?: string | undefined;
  /** Border color for interactive controls. Default: `'ButtonBorder'` */
  buttonBorder?: string | undefined;
  /** Text/icon color on buttons. Default: `'ButtonText'` */
  buttonText?: string | undefined;
}

// System color keywords used in forced-colors / high contrast mode.
const defaultHcTokens: Required<HighContrastTokens> = {
  disabled: 'GrayText',
  error: 'mark',
  selectedBackground: 'Highlight',
  selectedText: 'HighlightText',
  buttonBorder: 'ButtonBorder',
  buttonText: 'ButtonText',
};

const hcm = '@media (forced-colors: active)';

/**
 * Creates a theme with styles for Windows High Contrast Mode (forced-colors).
 *
 * @param tokens - Override any of the default system color tokens.
 * @returns A MUI theme object to be merged with your own theme.
 *
 * @example
 * // Use defaults
 * const theme = createTheme(createHighContrastTheme(), { palette: { ... } });
 *
 * @example
 * // Override specific tokens
 * const theme = createTheme(createHighContrastTheme({ disabled: 'ButtonText' }));
 */
export default function createHighContrastTheme(tokens?: HighContrastTokens) {
  const hcTokens = { ...defaultHcTokens, ...tokens };
  return createTheme({
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          listbox: {
            '&[aria-disabled="true"]': {
              [hcm]: {
                color: hcTokens.disabled,
                opacity: 1,
              },
            },
            '&[aria-selected="true"]': {
              [hcm]: {
                forcedColorAdjust: 'none',
                color: hcTokens.selectedText,
                backgroundColor: hcTokens.selectedBackground,
              },
              [`&.${autocompleteClasses.focused}`]: {
                [hcm]: {
                  backgroundColor: hcTokens.selectedBackground,
                },
              },
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            [`&.${checkboxClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            [`&.${filledInputClasses.error}`]: {
              '&::before, &::after': {
                [hcm]: {
                  borderBottomColor: hcTokens.error,
                },
              },
            },
            [`&.${filledInputClasses.disabled}:before`]: {
              [hcm]: {
                borderBottomStyle: 'solid',
                borderBottomColor: hcTokens.disabled,
              },
            },
            [`&.${filledInputClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
          input: {
            [hcm]: {
              '&::placeholder': {
                opacity: 1,
              },
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            [`& .${formControlLabelClasses.label}.${formControlLabelClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            [`&.${formHelperTextClasses.error}`]: {
              [hcm]: {
                color: hcTokens.error,
              },
            },
            [`&.${formHelperTextClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            [`&.${formLabelClasses.error}`]: {
              [hcm]: {
                color: hcTokens.error,
              },
            },
            [`&.${formLabelClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          root: {
            [`&.${inputClasses.error}`]: {
              '&::before, &::after': {
                [hcm]: {
                  borderBottomColor: hcTokens.error,
                },
              },
            },
            [`&.${inputClasses.disabled}:before`]: {
              [hcm]: {
                borderBottomStyle: 'solid',
                borderBottomColor: hcTokens.disabled,
              },
            },
            [`&.${inputClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
          input: {
            [hcm]: {
              '&::placeholder': {
                opacity: 1,
              },
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            [`&.${menuItemClasses.selected}`]: {
              [hcm]: {
                forcedColorAdjust: 'none',
                color: hcTokens.selectedText,
                backgroundColor: hcTokens.selectedBackground,
              },
            },
            [`&.${menuItemClasses.selected}:hover`]: {
              [hcm]: {
                backgroundColor: hcTokens.selectedBackground,
              },
            },
          },
        },
      },
      MuiNativeSelect: {
        styleOverrides: {
          icon: {
            [`&.${nativeSelectClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
              [hcm]: {
                borderColor: hcTokens.error,
              },
            },
            [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
              [hcm]: {
                borderColor: hcTokens.disabled,
              },
            },
            [`&.${outlinedInputClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
          input: {
            [hcm]: {
              '&::placeholder': {
                opacity: 1,
              },
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            [`&.${radioClasses.disabled}`]: {
              [hcm]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          // track doesn't receive the disabled class — use ownerState
          track: ({ ownerState }: { ownerState: { disabled?: boolean | undefined } }) => ({
            ...(ownerState.disabled && {
              [hcm]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
          // thumb receives the disabled class directly
          thumb: {
            [`&.${sliderClasses.disabled}`]: {
              [hcm]: {
                borderColor: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          // track and thumb don't receive the disabled class — use ownerState
          track: ({ ownerState }: { ownerState: { disabled?: boolean | undefined } }) => ({
            ...(ownerState.disabled && {
              [hcm]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
          thumb: ({ ownerState }: { ownerState: { disabled?: boolean | undefined } }) => ({
            ...(ownerState.disabled && {
              [hcm]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            [`&.${toggleButtonClasses.selected}`]: {
              [hcm]: {
                forcedColorAdjust: 'none',
                color: hcTokens.selectedText,
                backgroundColor: hcTokens.selectedBackground,
                borderColor: hcTokens.selectedBackground,
              },
              '&:hover': {
                [hcm]: {
                  color: hcTokens.selectedText,
                  backgroundColor: hcTokens.selectedBackground,
                  borderColor: hcTokens.buttonBorder,
                },
              },
            },
          },
        },
      },
    },
  });
}
