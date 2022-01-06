import * as React from 'react';
import { alpha, experimental_sx as sx, styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import IconImage from 'docs/src/components/icon/IconImage';
import Typography from 'docs/src/pages/premium-themes/onepirate/modules/components/Typography';
import ROUTES from 'docs/src/route';
import Link from 'docs/src/modules/components/Link';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

type ProductSubMenuProps = {
  icon: React.ReactElement;
  name: React.ReactNode;
  description: React.ReactNode;
  href?: string;
} & BoxProps;

const ProductSubMenu = React.forwardRef<HTMLDivElement, ProductSubMenuProps>(
  function ProductSubMenu({ icon, name, description, ...props }, ref) {
    return (
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
        }}
        {...props}
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
  },
);

const LinksWrapper = styled('div')(
  sx({
    pl: 5.5,
    pt: 1,
    display: 'flex',
    flexDirection: 'column',
    '& > a': {
      display: 'flex',
      justifyContent: 'space-between',
      py: 0.5,
      px: 1,
      borderRadius: 0.5,
      fontWeight: 500,
      fontSize: (theme) => theme.typography.pxToRem(14),
      color: (theme) =>
        theme.palette.mode === 'dark' ? theme.palette.primary[300] : theme.palette.primary[600],
      '&:hover': {
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? alpha(theme.palette.primaryDark[700], 0.4)
            : theme.palette.grey[50],
      },
      '& svg': {
        width: 18,
        height: 18,
      },
    },
  }),
);

export default function AppProductsDrawer(props: DrawerProps) {
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      PaperProps={{
        sx: {
          width: { xs: 310, sm: 360 },
          overflow: 'hidden',
          borderRadius: '10px 0px 0px 10px',
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200'),
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.900' : 'background.paper',
          boxShadow: (theme) =>
            `0px 4px 20px ${
              theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(170, 180, 190, 0.3)'
            }`,
          '& ul': {
            margin: 0,
            padding: 0,
            listStyle: 'none',
          },
          '& li:not(:last-of-type)': {
            borderBottom: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primary[100], 0.08)
                : theme.palette.grey[100],
          },
          '& a': { textDecoration: 'none' },
          '& li': {
            p: 2,
          },
        },
      }}
      {...props}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="body1" fontWeight="500">
          Products
        </Typography>{' '}
        <Box sx={{ my: -1, alignSelf: 'center' }}>
          <IconButton
            aria-label="Close drawer"
            size="small"
            onClick={(event) => props.onClose?.(event, 'backdropClick')}
          >
            <CloseIcon color="primary" fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <Divider />
      <ul role="menu">
        <li role="none">
          <ProductSubMenu
            role="menuitem"
            icon={<IconImage name="product-core" />}
            name="MUI Core"
            description="Ready-to-use foundational components, free forever."
          />
          <LinksWrapper>
            <Link href={ROUTES.baseDocs}>
              Base <KeyboardArrowRight fontSize="small" />
            </Link>
            <Link href={ROUTES.materialDocs}>
              Material Design <KeyboardArrowRight fontSize="small" />
            </Link>
            <Link href={ROUTES.systemDocs}>
              System <KeyboardArrowRight fontSize="small" />
            </Link>
            <Link href={ROUTES.stylesLegacyDocs}>
              Styles (legacy) <KeyboardArrowRight fontSize="small" />
            </Link>
          </LinksWrapper>
        </li>
        <li role="none">
          <ProductSubMenu
            role="menuitem"
            icon={<IconImage name="product-advanced" />}
            name={
              <Box component="span" display="inline-flex" alignItems="center">
                MUI&nbsp;X
              </Box>
            }
            description="Advanced and powerful components for complex use-cases."
          />
          <LinksWrapper>
            <Link href={`/x/data-grid/getting-started/`}>
              Data Grid <KeyboardArrowRight fontSize="small" />
            </Link>
          </LinksWrapper>
        </li>
        <li role="none">
          <Link
            role="menuitem"
            href={ROUTES.productTemplates}
            sx={{
              m: -2,
              p: 2,
              '&:hover, &:focus': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.50',
                outline: 'none',
                '@media (hover: none)': {
                  backgroundColor: 'initial',
                  outline: 'initial',
                },
              },
            }}
          >
            <ProductSubMenu
              icon={<IconImage name="product-templates" />}
              name="Templates"
              description="Fully built, out-of-the-box, templates for your application."
            />
          </Link>
        </li>
        <li role="none">
          <Link
            role="menuitem"
            href={ROUTES.productDesignKits}
            sx={{
              m: -2,
              p: 2,
              '&:hover, &:focus': {
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.50',
                outline: 'none',
                '@media (hover: none)': {
                  backgroundColor: 'initial',
                  outline: 'initial',
                },
              },
            }}
          >
            <ProductSubMenu
              icon={<IconImage name="product-designkits" />}
              name="Design kits"
              description="Our components available in your favorite design tool."
            />
          </Link>
        </li>
      </ul>
      <Divider />
    </Drawer>
  );
}
