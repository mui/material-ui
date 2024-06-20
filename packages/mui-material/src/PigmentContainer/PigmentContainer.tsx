import * as React from 'react';
import clsx from 'clsx';
// @ts-ignore
import Container from '@pigment-css/react/Container';
import capitalize from '@mui/utils/capitalize';
import composeClasses from '@mui/utils/composeClasses';
import generateUtilityClass from '@mui/utils/generateUtilityClass';
import { SxProps, Breakpoint } from '@mui/system';
import { Theme } from '../styles';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { ContainerClasses } from '../Container/containerClasses';

export interface ContainerOwnProps {
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ContainerClasses>;
  /**
   * If `true`, the left and right padding is removed.
   * @default false
   */
  disableGutters?: boolean;
  /**
   * Set the max-width to match the min-width of the current breakpoint.
   * This is useful if you'd prefer to design for a fixed set of sizes
   * instead of trying to accommodate a fully fluid viewport.
   * It's fluid by default.
   * @default false
   */
  fixed?: boolean;
  /**
   * Determine the max-width of the container.
   * The container width grows with the size of the screen.
   * Set to `false` to disable `maxWidth`.
   * @default 'lg'
   */
  maxWidth?: Breakpoint | false;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface ContainerTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & ContainerOwnProps;
  defaultComponent: RootComponent;
}

export type ContainerProps<
  RootComponent extends React.ElementType = ContainerTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<ContainerTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

const useUtilityClasses = (ownerState: ContainerOwnProps) => {
  const { classes, fixed, disableGutters, maxWidth } = ownerState;

  const slots = {
    root: [
      'root',
      maxWidth && `maxWidth${capitalize(String(maxWidth))}`,
      fixed && 'fixed',
      disableGutters && 'disableGutters',
    ],
  };

  return composeClasses(slots, (slot) => generateUtilityClass('MuiContainer', slot), classes);
};

const PigmentContainer = React.forwardRef(function PigmentContainer(
  { className, disableGutters = false, fixed = false, maxWidth = 'lg', ...props },
  ref,
) {
  const ownerState = {
    ...props,
    disableGutters,
    fixed,
    maxWidth,
  };
  const classes = useUtilityClasses(ownerState);
  return (
    <Container
      className={clsx(classes.root, className)}
      disableGutters={disableGutters}
      fixed={fixed}
      maxWidth={maxWidth}
      {...props}
      // @ts-ignore
      ref={ref}
    />
  );
}) as OverridableComponent<ContainerTypeMap>;

export default PigmentContainer;
