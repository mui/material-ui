import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableStringUnion } from '@mui/types';
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';
import { PropTypes, Theme } from '..';
import { AppBarClasses } from './appBarClasses';
import { ExtendPaperTypeMap } from '../Paper/Paper';

export interface AppBarPropsColorOverrides {}

export type AppBarTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = 'header',
> = ExtendPaperTypeMap<
  {
    props: AdditionalProps & {
      /**
       * Override or extend the styles applied to the component.
       */
      classes?: Partial<AppBarClasses>;
      /**
       * The color of the component.
       * It supports both default and custom theme colors, which can be added as shown in the
       * [palette customization guide](https://mui.com/material-ui/customization/palette/#adding-new-colors).
       * @default 'primary'
       */
      color?: OverridableStringUnion<PropTypes.Color | 'transparent', AppBarPropsColorOverrides>;
      /**
       * If true, the `color` prop is applied in dark mode.
       * @default false
       */
      enableColorOnDark?: boolean;
      /**
       * The positioning type. The behavior of the different options is described
       * [in the MDN web docs](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Positioning).
       * Note: `sticky` is not universally supported and will fall back to `static` when unavailable.
       * @default 'fixed'
       */
      position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
      /**
       * The system prop that allows defining system overrides as well as additional CSS styles.
       */
      sx?: SxProps<Theme>;
    };
    defaultComponent: DefaultComponent;
  },
  'position' | 'color' | 'classes'
>;

/**
 *
 * Demos:
 *
 * - [App Bar](https://mui.com/material-ui/react-app-bar/)
 *
 * API:
 *
 * - [AppBar API](https://mui.com/material-ui/api/app-bar/)
 * - inherits [Paper API](https://mui.com/material-ui/api/paper/)
 */

declare const AppBar: OverridableComponent<AppBarTypeMap>;

export type AppBarProps<
  RootComponent extends React.ElementType = AppBarTypeMap['defaultComponent'],
  AdditionalProps = {},
> = OverrideProps<AppBarTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default AppBar;
