import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconImage from 'docs/src/components/icon/IconImage';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import useRouterExtra from 'docs/src/modules/utils/useRouterExtra';

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

const products = [
  {
    name: 'Material UI',
    href: ROUTES.materialDocs,
    slug: 'material-ui',
  },
  {
    name: 'Joy UI',
    href: ROUTES.joyDocs,
    slug: 'joy-ui',
  },
  {
    name: 'MUI Base',
    href: ROUTES.baseDocs,
    slug: 'base',
  },
  {
    name: 'MUI System',
    href: ROUTES.systemDocs,
    slug: 'system',
  },
];

export default function MuiProductSelector() {
  const routerExtra = useRouterExtra();

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
            {products.map((product) => (
              <Chip
                key={product.name}
                color={routerExtra.product === product.slug ? 'default' : undefined}
                variant={routerExtra.product === product.slug ? 'filled' : 'outlined'}
                component={Link}
                href={product.href}
                label={product.name}
                clickable
                size="small"
              />
            ))}
          </Stack>
        </Box>
      </Box>
      <li role="none">
        <Link
          href={ROUTES.advancedComponents}
          sx={{
            p: 2,
            borderBottom: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary[100], 0.08)
                : theme.palette.grey[100],
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
      <li role="none">
        <Link
          href={ROUTES.toolpadDocs}
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
            sx={{ width: '100%' }}
            icon={<IconImage name="product-toolpad" />}
            name={
              <Box
                sx={{
                  display: 'flex',
                  component: 'span',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '150%',
                }}
              >
                <div>MUI&nbsp;Toolpad</div>
                <Chip size="small" label={'Alpha'} />
              </Box>
            }
            description="Low-code tool builder, powered by MUI."
          />
        </Link>
      </li>
    </React.Fragment>
  );
}
