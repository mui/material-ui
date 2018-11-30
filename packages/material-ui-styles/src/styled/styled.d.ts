import { ConsistentWith, Omit, PropsOf } from '@material-ui/core';
import {
  CSSProperties,
  StyledComponentProps,
  Styles,
  WithStylesOptions,
} from '@material-ui/styles/withStyles';

/**
 * @internal
 */
export type ComponentCreator<C extends React.ReactType> = <Theme>(
  styles: CSSProperties | ((theme: Theme) => CSSProperties),
  options?: WithStylesOptions,
) => React.ComponentType<
  Omit<JSX.LibraryManagedAttributes<C, PropsOf<C>>, 'classes' | 'className'> &
    StyledComponentProps<'root'> & { className?: string }
>;

export interface StyledProps {
  className: string;
}

export default function styled<C extends React.ReactType>(Component: C): ComponentCreator<C>;
