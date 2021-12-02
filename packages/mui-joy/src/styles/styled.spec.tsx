import * as React from 'react';
import { styled, VariantProp, ColorPaletteProp } from '@mui/joy/styles';

const Basic = styled('button')({
  fontWeight: 'var(--fontSize-md)' as React.CSSProperties['fontWeight'],
  backgroundColor: 'var(--palette-background-default)',
  lineHeight: 1,
});

const ObjectStyle = styled('button')(({ theme }) => ({
  fontWeight: theme.vars.fontWeight.default,
  backgroundColor: theme.vars.palette.background.default,
  ...theme.typography.body1,
}));

const ArrayStyle = styled('button')(({ theme }) => [
  {
    fontWeight: theme.vars.fontWeight.default,
    backgroundColor: theme.vars.palette.background.default,
  },
  theme.typography.body1,
]);

const FocusStyle = styled('button')(({ theme }) => [
  {
    fontWeight: theme.vars.fontWeight.default,
    backgroundColor: theme.vars.palette.background.default,
  },
  {
    '&:focus-visible': theme.focus.default,
  },
]);

const Variants = styled('button')(({ theme }) => [
  {
    width: 'auto',
  },
  theme.variants.contained.primary,
]);

const DynamicVariants = styled('button')<{ variant?: VariantProp; color?: ColorPaletteProp }>(
  ({ theme, variant = 'contained', color = 'primary' }) => [
    {
      width: 'auto',
    },
    theme.variants[variant][color],
    theme.variants[`${variant}Hover`][color],
    theme.variants[`${variant}Active`][color],
    theme.variants[`${variant}Disabled`][color],
  ],
);
