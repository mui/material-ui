import { Breakpoint } from '../styles/createBreakpoints';
import { WithWidth } from '../withWidth';
import { PropInjector } from '@material-ui/types';

export interface WithMobileDialogOptions {
  breakpoint: Breakpoint;
}

export interface WithMobileDialog extends WithWidth {
  fullScreen: boolean;
}

/**
 * @deprecated
 */
export interface InjectedProps extends WithMobileDialog {}

export default function withMobileDialog<P = {}>(
  options?: WithMobileDialogOptions
): PropInjector<WithMobileDialog, Partial<WithMobileDialog>>;
