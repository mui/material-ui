import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/docs/Link';

export default function MoreInfoBox({
  primaryBtnLabel,
  primaryBtnHref,
  secondaryBtnLabel,
  secondaryBtnHref,
  ...props
}: {
  primaryBtnLabel: string;
  primaryBtnHref: string;
  secondaryBtnLabel: string;
  secondaryBtnHref: string;
} & BoxProps) {
  return (
    <Box
      data-mui-color-scheme="dark"
      {...props}
      sx={{
        p: 1.5,
        bottom: 0,
        left: 0,
        right: 0,
        background: ({ palette }) => alpha(palette.primaryDark[800], 0.2),
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 1.5, sm: 1 },
        borderTop: '1px solid',
        borderColor: 'primaryDark.700',
        zIndex: 3,
        ...props.sx,
      }}
    >
      <Button component={Link} noLinkStyle size="small" variant="contained" href={primaryBtnHref}>
        {primaryBtnLabel}
      </Button>
      <Button
        component={Link}
        noLinkStyle
        size="small"
        variant="outlined"
        color="secondary"
        href={secondaryBtnHref}
      >
        {secondaryBtnLabel}
      </Button>
    </Box>
  );
}
