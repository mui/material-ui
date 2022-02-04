import * as React from 'react';
import { OverridableStringUnion } from '@mui/types';
import { styled, VariantProp, ColorPaletteProp, SxProps } from '../styles';

export interface PaperPropsVariantOverrides {}

export interface PaperPropsColorOverrides {}

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: OverridableStringUnion<VariantProp, PaperPropsVariantOverrides>;
  color?: OverridableStringUnion<ColorPaletteProp, PaperPropsColorOverrides>;
  sx?: SxProps;
}

const PaperRoot = styled('div')<{ ownerState: PaperProps }>(({ theme, ownerState }) => [
  {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.vars.palette.background.body,
  },
  ownerState.variant && theme.variants[ownerState.variant][ownerState.color!],
]);

export default function Paper({
  variant,
  color = 'neutral',
  ...props
}: React.PropsWithChildren<PaperProps>) {
  const ownerState = { variant, color, ...props };
  return <PaperRoot ownerState={ownerState} {...props} />;
}
