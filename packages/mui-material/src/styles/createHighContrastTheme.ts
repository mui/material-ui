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
import { ThemeOptions } from './createTheme';

export interface HighContrastTokens {
  /** Color for disabled elements. Default: `'GrayText'` */
  disabled?: string | undefined;
  /** Color for error states. Default: `'mark'` */
  error?: string | undefined;
  /** Background color for selected items. Default: `'SelectedItem'` */
  selectedBackground?: string | undefined;
  /** Text color on selected items. Default: `'SelectedItemText'` */
  selectedText?: string | undefined;
  /** Background color for active/toggled controls. Default: `'Highlight'` */
  activeBackground?: string | undefined;
  /** Text color on active/toggled controls. Default: `'HighlightText'` */
  activeText?: string | undefined;
  /** Border color for interactive controls. Default: `'ButtonBorder'` */
  buttonBorder?: string | undefined;
  /** Text/icon color on buttons. Default: `'ButtonText'` */
  buttonText?: string | undefined;
}

// System color keywords used in forced-colors / high contrast mode.
const defaultHcTokens: Required<HighContrastTokens> = {
  disabled: 'GrayText',
  error: 'mark',
  selectedBackground: 'SelectedItem',
  selectedText: 'SelectedItemText',
  activeBackground: 'Highlight',
  activeText: 'HighlightText',
  buttonBorder: 'ButtonBorder',
  buttonText: 'ButtonText',
};

const HCM = '@media (forced-colors: active)';

/**
 * Creates a theme with styles for Windows High Contrast Mode (forced-colors).
 *
 * @param tokens - Override any of the default system color tokens.
 * @returns A `ThemeOptions` object to pass into `createTheme`.
 *
 * @example
 * // Use defaults
 * const theme = createTheme(createHighContrastTheme(), { palette: { ... } });
 *
 * @example
 * // Override specific tokens
 * const theme = createTheme(createHighContrastTheme({ disabled: 'ButtonText' }));
 */
export default function createHighContrastTheme(
  tokens?: HighContrastTokens,
): Pick<ThemeOptions, 'components'> {
  const hcTokens = { ...defaultHcTokens, ...tokens };
  return {
    components: {
      MuiAutocomplete: {
        styleOverrides: {
          listbox: {
            [`& .${autocompleteClasses.option}`]: {
              '&[aria-disabled="true"]': {
                [HCM]: {
                  color: hcTokens.disabled,
                  opacity: 1,
                },
              },
              [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focusVisible}`]: {
                [HCM]: {
                  forcedColorAdjust: 'none',
                  color: hcTokens.activeText,
                  backgroundColor: hcTokens.activeBackground,
                },
              },
              '&[aria-selected="true"]': {
                [HCM]: {
                  forcedColorAdjust: 'none',
                  color: hcTokens.selectedText,
                  backgroundColor: hcTokens.selectedBackground,
                },
                [`&.${autocompleteClasses.focused}`]: {
                  [HCM]: {
                    color: hcTokens.activeText,
                    backgroundColor: hcTokens.activeBackground,
                  },
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
              [HCM]: {
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
                [HCM]: {
                  borderBottomColor: hcTokens.error,
                },
              },
            },
            [`&.${filledInputClasses.disabled}:before`]: {
              [HCM]: {
                borderBottomStyle: 'solid',
                borderBottomColor: hcTokens.disabled,
              },
            },
            [`&.${filledInputClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            [`& .${formControlLabelClasses.label}.${formControlLabelClasses.disabled}`]: {
              [HCM]: {
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
              [HCM]: {
                color: hcTokens.error,
              },
            },
            [`&.${formHelperTextClasses.disabled}`]: {
              [HCM]: {
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
              [HCM]: {
                color: hcTokens.error,
              },
            },
            [`&.${formLabelClasses.disabled}`]: {
              [HCM]: {
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
                [HCM]: {
                  borderBottomColor: hcTokens.error,
                },
              },
            },
            [`&.${inputClasses.disabled}:before`]: {
              [HCM]: {
                borderBottomStyle: 'solid',
                borderBottomColor: hcTokens.disabled,
              },
            },
            [`&.${inputClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            [HCM]: {
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
            [`&.${menuItemClasses.focusVisible}, &:hover`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.activeText,
                backgroundColor: hcTokens.activeBackground,
              },
            },
            [`&.${menuItemClasses.selected}`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.selectedText,
                backgroundColor: hcTokens.selectedBackground,
              },
            },
            [`&.${menuItemClasses.selected}.${menuItemClasses.focusVisible}, &.${menuItemClasses.selected}:hover`]: {
              [HCM]: {
                color: hcTokens.activeText,
                backgroundColor: hcTokens.activeBackground,
              },
            },
          },
        },
      },
      MuiNativeSelect: {
        styleOverrides: {
          icon: {
            [`&.${nativeSelectClasses.disabled}`]: {
              [HCM]: {
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
              [HCM]: {
                borderColor: hcTokens.error,
              },
            },
            [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            },
            [`&.${outlinedInputClasses.disabled}`]: {
              [HCM]: {
                color: hcTokens.disabled,
              },
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            [`&.${radioClasses.disabled}`]: {
              [HCM]: {
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
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
          // thumb receives the disabled class directly
          thumb: {
            [`&.${sliderClasses.disabled}`]: {
              [HCM]: {
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
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
          thumb: ({ ownerState }: { ownerState: { disabled?: boolean | undefined } }) => ({
            ...(ownerState.disabled && {
              [HCM]: {
                borderColor: hcTokens.disabled,
              },
            }),
          }),
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: {
            // Restore the focus outline in HCM since the ripple is not visible.
            // Also handle components where the focusable element is a hidden inner input (Checkbox, Radio, Switch).
            [HCM]: {
              '&:focus-visible, &:focus-within:has(input:focus-visible)': {
                outline: `5px auto ${hcTokens.activeBackground}`,
              },
            },
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            [`&.${toggleButtonClasses.selected}`]: {
              [HCM]: {
                forcedColorAdjust: 'none',
                color: hcTokens.activeText,
                backgroundColor: hcTokens.activeBackground,
                borderColor: hcTokens.activeBackground,
              },
              '&:hover': {
                [HCM]: {
                  backgroundColor: hcTokens.activeBackground,
                  borderColor: hcTokens.buttonBorder,
                },
              },
            },
          },
        },
      },
    },
  };
}
