import * as React from 'react';
import Stack from '@pigment-css/react/Stack';
import { ResponsiveStyleValue, SxProps } from '@mui/system';
import { OverrideProps, OverridableComponent } from '../OverridableComponent';
import { Theme } from '../styles/createTheme';

export interface StackOwnProps {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction?: ResponsiveStyleValue<'row' | 'row-reverse' | 'column' | 'column-reverse'>;
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing?: ResponsiveStyleValue<number | string>;
  /**
   * Add an element between each child.
   */
  divider?: React.ReactNode;
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface StackTypeMap<
  AdditionalProps = {},
  RootComponent extends React.ElementType = 'div',
> {
  props: AdditionalProps & StackOwnProps;
  defaultComponent: RootComponent;
}

export type StackProps<
  RootComponent extends React.ElementType = StackTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<StackTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

const PigmentStack = React.forwardRef(function PigmentStack(props, ref) {
  return <Stack {...props} ref={ref} />;
}) as OverridableComponent<StackTypeMap>;

export default PigmentStack;
