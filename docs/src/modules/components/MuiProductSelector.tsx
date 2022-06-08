import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconImage from 'docs/src/components/icon/IconImage';
import FEATURE_TOGGLE from 'docs/src/featureToggle';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import useRouterExtra from 'docs/src/modules/utils/useRouterExtra';

const shouldShowJoy =
  process.env.NODE_ENV === 'development' ||
  process.env.PULL_REQUEST ||
  FEATURE_TOGGLE.enable_joy_scope;

function ProductSubMenu({
  icon,
  name,
  description,
  sx = [],
  ...props
}: {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
} & BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box
        sx={{
          '& circle': {
            fill: (theme) =>
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[700]
                : theme.palette.grey[100],
          },
        }}
      >
        {icon}
      </Box>
      <div>
        <Typography color="text.primary" variant="body2" fontWeight="700">
          {name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </div>
    </Box>
  );
}

export default function MuiProductSelector() {
  const { product } = useRouterExtra();

  return (
    <React.Fragment>
      <Box
        component="li"
        role="none"
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? alpha(theme.palette.primary[100], 0.08)
              : theme.palette.grey[100],
        }}
      >
        <ProductSubMenu
          role="menuitem"
          icon={<IconImage name="product-core" />}
          name="MUI Core"
          description="Ready-to-use foundational components, free forever."
        />
        <Box
          sx={{
            ml: '36px',
            pl: 2,
            pt: 1.5,
            position: 'relative',
          }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="flex-start"
            spacing={1}
            sx={{
              '& > .MuiChip-root': {
                position: 'initial',
                '&:hover': {
                  '& .product-description': {
                    opacity: 1,
                  },
                },
              },
            }}
          >
            <Chip
              color={product === 'material-ui' ? 'default' : undefined}
              variant={product === 'material-ui' ? 'filled' : 'outlined'}
              component={Link}
              href={ROUTES.materialDocs}
              label={<React.Fragment>Material UI </React.Fragment>}
              clickable
              size="small"
            />
            {shouldShowJoy && (
              <Chip
                color={product === 'joy-ui' ? 'default' : undefined}
                variant={product === 'joy-ui' ? 'filled' : 'outlined'}
                component={Link}
                href={ROUTES.joyDocs}
                label={<React.Fragment>Joy UI </React.Fragment>}
                clickable
                size="small"
              />
            )}
            <Chip
              color={product === 'base' ? 'default' : undefined}
              variant={product === 'base' ? 'filled' : 'outlined'}
              component={Link}
              href={ROUTES.baseDocs}
              label={<React.Fragment>MUI Base </React.Fragment>}
              clickable
              size="small"
            />
            <Chip
              color={product === 'system' ? 'default' : undefined}
              variant={product === 'system' ? 'filled' : 'outlined'}
              component={Link}
              href={ROUTES.systemDocs}
              label={<React.Fragment>MUI System </React.Fragment>}
              clickable
              size="small"
            />
          </Stack>
        </Box>
      </Box>
      <li role="none">
        <Link
          href={ROUTES.advancedComponents}
          sx={{
            p: 2,
            width: '100%',
            '&:hover': {
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.primaryDark[700], 0.4)
                  : theme.palette.grey[50],
            },
          }}
        >
          <ProductSubMenu
            role="menuitem"
            icon={<IconImage name="product-advanced" />}
            name={
              <Box component="span" display="inline-flex" alignItems="center">
                MUI&nbsp;X
              </Box>
            }
            description="Advanced and powerful components for complex use cases."
          />
        </Link>
      </li>
    </React.Fragment>
  );
}
