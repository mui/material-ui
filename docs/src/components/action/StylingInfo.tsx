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
        position: 'absolute',
        bottom: 0,
        transition: '0.3s',
        left: 0,
        right: 0,
        p: 2,
        background: ({ palette }) => alpha(palette.primaryDark[800], 0.8),
        backdropFilter: 'blur(4px)',
        zIndex: 1,
        borderTop: '1px solid',
        borderColor: 'primaryDark.700',
        ...props.sx,
      }}
    >
      <Typography fontWeight="semiBold" variant="body2">
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
        {description}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
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
