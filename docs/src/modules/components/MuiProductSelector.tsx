import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
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

const Description = styled('span')(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 'normal',
  color: theme.palette.text.secondary,
  position: 'absolute',
  left: '0.5rem',
  bottom: '-0.375rem',
  pointerEvents: 'none',
  opacity: 0,
  transition: '0.2s',
}));

export default function MuiProductSelector() {
  const router = useRouterExtra();

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
            ml: 5.5,
            py: 2,
            position: 'relative',
          }}
        >
          <Stack
            direction="row"
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
              color={router.isMaterialUI ? 'primary' : undefined}
              component={Link}
              href={ROUTES.materialDocs}
              label={
                <React.Fragment>
                  Material UI{' '}
                  <Description className="product-description">
                    React components that implement Google&apos;s Material Design.
                  </Description>
                </React.Fragment>
              }
              variant="outlined"
              clickable
              size="small"
            />
            {shouldShowJoy && (
              <Chip
                color={router.isJoyUI ? 'primary' : undefined}
                component={Link}
                href={ROUTES.joyDocs}
                label={
                  <React.Fragment>
                    Joy UI{' '}
                    <Description className="product-description">
                      React components for building your design system.
                    </Description>
                  </React.Fragment>
                }
                variant="outlined"
                clickable
                size="small"
              />
            )}
            <Chip
              color={router.isMuiBase ? 'primary' : undefined}
              component={Link}
              href={ROUTES.baseDocs}
              label={
                <React.Fragment>
                  MUI Base{' '}
                  <Description className="product-description">
                    Unstyled React components and low-level hooks.
                  </Description>
                </React.Fragment>
              }
              variant="outlined"
              clickable
              size="small"
            />
            <Chip
              color={router.isMuiSystem ? 'primary' : undefined}
              component={Link}
              href={ROUTES.systemDocs}
              label={
                <React.Fragment>
                  MUI System{' '}
                  <Description className="product-description">
                    CSS utilities for rapidly laying out custom designs.
                  </Description>
                </React.Fragment>
              }
              variant="outlined"
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
              // eslint-disable-next-line material-ui/no-hardcoded-labels
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
