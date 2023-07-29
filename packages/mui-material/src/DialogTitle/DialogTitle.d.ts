import * as React from 'react';
import { SxProps } from '@mui/system';
import { OverridableComponent, OverrideProps } from '../OverridableComponent';
import { Theme } from '../styles';
import { TypographyTypeMap } from '../Typography';
import { DialogTitleClasses } from './dialogTitleClasses';

export interface DialogTitleTypeMap<
  AdditionalProps = {},
  DefaultComponent extends React.ElementType = TypographyTypeMap['defaultComponent'],
> {
  props: AdditionalProps & {
    /**
     * The content of the component.
     */
    children?: React.ReactNode;
    /**
     * Override or extend the styles applied to the component.
     */
    classes?: Partial<DialogTitleClasses>;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps<Theme>;
  } & Omit<TypographyTypeMap['props'], 'classes'>;
  defaultComponent: DefaultComponent;
}

/**
 *
 * Demos:
 *
 * - [Dialog](https://mui.com/material-ui/react-dialog/)
 *
 * API:
 *
 * - [DialogTitle API](https://mui.com/material-ui/api/dialog-title/)
 */
declare const DialogTitle: OverridableComponent<DialogTitleTypeMap>;

export type DialogTitleProps<
  RootComponent extends React.ElementType = DialogTitleTypeMap['defaultComponent'],
  AdditionalProps = { component?: React.ElementType },
> = OverrideProps<DialogTitleTypeMap<AdditionalProps, RootComponent>, RootComponent> & {
  component?: React.ElementType;
};

export default DialogTitle;
