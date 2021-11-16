import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  unstable_composeClasses as composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
} from '@mui/core';
import { DIALOG_WIDTH } from '../constants/dimensions';
import { WrapperVariantContext, IsStaticVariantContext } from './WrapperVariantContext';
import { useThemeProps } from '@mui/material/styles';

export interface StaticWrapperClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type StaticWrapperClassKey = keyof StaticWrapperClasses;

export function getStaticWrapperUtilityClass(slot: string): string {
  return generateUtilityClass('MuiPickerStaticWrapper', slot);
}

export const staticWrapperClasses: StaticWrapperClasses = generateUtilityClasses(
  'MuiPickerStaticWrapper',
  ['root'],
);

const useUtilityClasses = (ownerState: StaticWrapperProps) => {
  const { classes } = ownerState;
  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getStaticWrapperUtilityClass, classes);
};

export interface StaticWrapperProps {
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<StaticWrapperClasses>;
  /**
   * Force static wrapper inner components to be rendered in mobile or desktop mode.
   */
  displayStaticWrapperAs: 'desktop' | 'mobile';
}

const StaticWrapperRoot = styled('div', {
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

function StaticWrapper(inProps: StaticWrapperProps) {
  const props = useThemeProps({ props: inProps, name: 'MuiPickerStaticWrapper' });
  const { displayStaticWrapperAs, ...other } = props;

  const classes = useUtilityClasses(props);

  const isStatic = true;

  return (
    <IsStaticVariantContext.Provider value={isStatic}>
      <WrapperVariantContext.Provider value={displayStaticWrapperAs}>
        <StaticWrapperRoot className={classes.root} {...other} />
      </WrapperVariantContext.Provider>
    </IsStaticVariantContext.Provider>
  );
}

export default StaticWrapper;
