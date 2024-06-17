import * as React from 'react';
import NextLink from 'next/link';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MenuItem, { MenuItemProps } from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

interface ProductItemProps extends MenuItemProps {
  active?: boolean;
  chip?: React.ReactNode;
  description?: string;
  docs?: boolean;
  href: string;
  icon?: React.ReactNode;
  id?: string;
  name: string;
}

export default function ProductItem({
  active,
  chip,
  description,
  docs,
  href,
  icon,
  id,
  name,
  sx = [],
  ...other
}: ProductItemProps) {
  return (
    <MenuItem
      id={id}
      component={NextLink} // using the Next link directly here as it accepts, as opposed to the docs Link, passing role="menuitem"
      role="menuitem"
      href={href}
      sx={[
        (theme) => ({
          p: 1,
          pl: '6px',
          display: 'flex',
          alignItems: docs ? 'start' : 'center',
          gap: '8px',
          flexGrow: 1,
          backgroundColor: active ? alpha(theme.palette.primary[50], 0.8) : undefined,
          border: '1px solid',
          borderColor: active ? 'primary.100' : 'transparent',
          borderRadius: '8px',
          transition: '100ms ease-in background-color, border',
          textDecorationLine: 'none',
          '&:hover': {
            backgroundColor: active ? alpha(theme.palette.primary[50], 0.8) : 'grey.50',
            borderColor: 'divider',
          },
          '&.Mui-focusVisible': {
            backgroundColor: active ? (theme.vars || theme).palette.primary[50] : 'transparent',
          },
          ...theme.applyDarkStyles({
            backgroundColor: active ? alpha(theme.palette.primary[900], 0.2) : undefined,
            borderColor: active ? alpha(theme.palette.primary[300], 0.2) : 'transparent',
            '&:hover': {
              backgroundColor: active
                ? alpha(theme.palette.primary[900], 0.3)
                : alpha(theme.palette.primaryDark[700], 0.5),
            },
            '&.Mui-focusVisible': {
              backgroundColor: active ? alpha(theme.palette.primary[900], 0.5) : 'transparent',
            },
          }),
        }),
        // You cannot spread `sx` directly because `SxProps` (typeof sx) can be an array.
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Box
        sx={{
          height: docs ? 21 : 36,
          width: docs ? 21 : 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Typography color="text.primary" variant="body2" fontWeight="semiBold">
            {name}
          </Typography>
          {chip}
        </Box>
        <Typography color="text.secondary" fontSize=".813rem">
          {description}
        </Typography>
      </div>
    </MenuItem>
  );
}
