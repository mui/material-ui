import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/docs/Link';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';

export function AppearingInfoBox({
  appeared,
  stylingContent,
  ...props
}: { appeared: boolean; stylingContent?: React.ReactElement } & BoxProps) {
  const [hidden, setHidden] = React.useState(false);
  return (
    <Box
      data-mui-color-scheme="dark"
      {...props}
      sx={{
        p: 2,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: ({ palette }) => alpha(palette.common.black, 0.8),
        backdropFilter: 'blur(8px)',
        zIndex: 3,
        borderTop: '1px solid',
        borderColor: 'divider',
        borderRadius: '0 0 12px 12px',
        transform: hidden || !appeared ? 'translateY(100%)' : 'translateY(0)',
        transition: '0.3s',
        ...props.sx,
      }}
    >
      <IconButton
        aria-label={hidden ? 'show' : 'hide'}
        onClick={() => setHidden((bool) => !bool)}
        sx={{
          position: 'absolute',
          zIndex: 2,
          transition: '0.3s',
          right: 16,
          bottom: '100%',
          transform: hidden || !appeared ? 'translateY(-10px)' : 'translateY(50%)',
          opacity: appeared ? 1 : 0,
          bgcolor: 'primary.600',
          '&:hover, &.Mui-focused': {
            bgcolor: 'primary.700',
          },
        }}
      >
        {hidden ? (
          <KeyboardArrowUpRounded fontSize="small" />
        ) : (
          <KeyboardArrowDownRounded fontSize="small" />
        )}
      </IconButton>
      {stylingContent}
    </Box>
  );
}

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
