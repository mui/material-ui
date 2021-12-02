import * as React from 'react';
import { styled, useThemeProps } from '@mui/material/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@mui/base';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';

export interface PickerStaticWrapperClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type PickerStaticWrapperClassKey = keyof PickerStaticWrapperClasses;

export function getStaticWrapperUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPickerStaticWrapper', slot);
}

export const pickerStaticWrapperClasses: PickerStaticWrapperClasses = generateUtilityClasses(
  'MuiPickerStaticWrapper',
  ['root'],
);

const useUtilityClasses = (ownerState: PickerStaticWrapperProps) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getStaticWrapperUtilityClass, classes);
};

export interface PickerStaticWrapperProps {
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<PickerStaticWrapperClasses>;
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   */
  displayStaticWrapperAs: 'desktop' | 'mobile';
}

const PickerStaticWrapperRoot = styled('div', {
  name: 'MuiPickerStaticWrapper',
  slot: 'Root',
  overridesResolver: (props, styles) => styles.root,
  skipSx: true,
})(({ theme }) => ({
  overflow: 'hidden',
  minWidth: DIALOG_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.paper,
}));

function PickerStaticWrapper(inProps: PickerStaticWrapperProps) {
  const props = useThemeProps({ props: inProps, name: 'MuiPickerStaticWrapper' });
  const { displayStaticWrapperAs, ...other } = props;

  const classes = useUtilityClasses(props);

  const isStatic = true;

  return (
    <IsStaticVariantContext.Provider value={isStatic}>
      <WrapperVariantContext.Provider value={displayStaticWrapperAs}>
        <PickerStaticWrapperRoot className={classes.root} {...other} />
      </WrapperVariantContext.Provider>
    </IsStaticVariantContext.Provider>
  );
}

export default PickerStaticWrapper;
