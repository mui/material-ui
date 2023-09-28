import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import { Theme } from '..';
import { DivClasses } from './divClasses';

export interface DivOwnProps {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<DivClasses>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;
}

export interface DivTypeMap<AdditionalProps = {}, RootComponent extends React.ElementType = 'div'> {
  props: AdditionalProps & DivOwnProps;
  defaultComponent: RootComponent;
}

/**
 *
 * Demos:
 *
 * - [Div](https://mui.com/material-ui/react-div/)
 *
 * API:
 *
 * - [Div API](https://mui.com/material-ui/api/div/)
 */

declare const Div: OverridableComponent<DivTypeMap>;

export type DivProps<
  RootComponent extends React.ElementType = DivTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<DivTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default Div;
