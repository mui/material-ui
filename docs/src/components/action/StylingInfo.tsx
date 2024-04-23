import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/docs/Link';

export default function StylingInfo({
  description,
  primaryBtnLabel,
  primaryBtnHref,
  secondaryBtnLabel,
  secondaryBtnHref,
  title,
  stylingContent,
  ...props
}: {
  description: string;
  primaryBtnLabel: string;
  primaryBtnHref: string;
  secondaryBtnLabel: string;
  secondaryBtnHref: string;
  title: string;
  stylingContent?: React.ReactElement;
} & BoxProps) {
  return (
    <Box
      data-mui-color-scheme="dark"
      {...props}
      sx={{
        p: 2,
        m: { xs: '0 -16px -16px -16px', sm: 0 },
        position: { xs: 'auto', sm: 'absolute' },
        bottom: 0,
        left: 0,
        right: 0,
        background: ({ palette }) => alpha(palette.primaryDark[800], 0.8),
        backdropFilter: 'blur(4px)',
        borderTop: '1px solid',
        borderColor: 'primaryDark.700',
        zIndex: 1,
        ...props.sx,
      }}
    >
      <Typography fontWeight="semiBold" variant="body2">
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
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
    </Box>
  );
}
