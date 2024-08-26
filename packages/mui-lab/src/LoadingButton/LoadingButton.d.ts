import { ExtendButton, ExtendButtonTypeMap, ButtonClasses } from '@mui/material/Button';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';

export interface LoadingButtonOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ButtonClasses> & {
    /** Styles applied to the root element. */
    root?: string;
    /** Styles applied to the span element that wraps the children. */
    label?: string;
    /** Styles applied to the root element if `loading={true}`. */
    loading?: string;
    /** Styles applied to the loadingIndicator element. */
    loadingIndicator?: string;
    /** Styles applied to the loadingIndicator element if `loadingPosition="center"`. */
    loadingIndicatorCenter?: string;
    /** Styles applied to the loadingIndicator element if `loadingPosition="start"`. */
    loadingIndicatorStart?: string;
    /** Styles applied to the loadingIndicator element if `loadingPosition="end"`. */
    loadingIndicatorEnd?: string;
    /** Styles applied to the endIcon element if `loading={true}` and `loadingPosition="end"`. */
    endIconLoadingEnd?: string;
    /** Styles applied to the startIcon element if `loading={true}` and `loadingPosition="start"`. */
    startIconLoadingStart?: string;
  };
  /**
   * If `true`, the loading indicator is shown and the button becomes disabled.
   * @default false
   */
  loading?: boolean;
  /**
   * Element placed before the children if the button is in loading state.
   * The node should contain an element with `role="progressbar"` with an accessible name.
   * By default we render a `CircularProgress` that is labelled by the button itself.
   * @default <CircularProgress color="inherit" size={16} />
   */
  loadingIndicator?: React.ReactNode;
  /**
   * The loading indicator can be positioned on the start, end, or the center of the button.
   * @default 'center'
   */
  loadingPosition?: 'start' | 'end' | 'center';
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export type LoadingButtonTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'button',
> = ExtendButtonTypeMap<{
  props: AdditionalProps & LoadingButtonOwnProps;
  defaultComponent: RootComponent;
}>;

/**
 *
 * Demos:
 *
 * - [Button Group](https://next.mui.com/material-ui/react-button-group/)
 * - [Button](https://next.mui.com/material-ui/react-button/)
 *
 * API:
 *
 * - [LoadingButton API](https://next.mui.com/material-ui/api/loading-button/)
 * - inherits [Button API](https://next.mui.com/material-ui/api/button/)
 */
declare const LoadingButton: ExtendButton<LoadingButtonTypeMap>;

export type LoadingButtonProps<
  RootComponent extends React.ElementType = LoadingButtonTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<LoadingButtonTypeMap<AdditionalProps, RootComponent>, RootComponent>;

export default LoadingButton;
