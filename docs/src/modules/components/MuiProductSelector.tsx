import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import IconImage from 'docs/src/components/icon/IconImage';
import ROUTES from 'docs/src/route';
import { Link } from '@mui/docs/Link';
import PageContext from 'docs/src/modules/components/PageContext';

interface ProductSubMenuProp extends BoxProps {
  icon: React.ReactNode;
  name: React.ReactNode;
  description: React.ReactNode;
  chip?: React.ReactNode;
}

function ProductSubMenu(props: ProductSubMenuProp) {
  const { icon, name, description, chip, sx = [], ...other } = props;
  return (
    <Box
      {...other}
      sx={[
        {
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {icon}
      <Box sx={{ flexGrow: 1 }}>
        <Typography color="text.primary" variant="body2" fontWeight="700">
          {name}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {description}
        </Typography>
      </Box>
      {chip}
    </Box>
  );
}

const coreProducts = [
  {
    name: 'Material UI',
    href: ROUTES.materialDocs,
    id: 'material-ui',
  },
  {
    name: 'Joy UI',
    href: ROUTES.joyDocs,
    id: 'joy-ui',
  },
  {
    name: 'Base UI',
    href: ROUTES.baseDocs,
    id: 'base-ui',
  },
  {
    name: 'MUI System',
    href: ROUTES.systemDocs,
    id: 'system',
  },
];

const advancedProducts = [
  {
    name: 'Data Grid',
    href: ROUTES.dataGridOverview,
    id: 'x-data-grid',
  },
  {
    name: 'Date and Time Pickers',
    href: ROUTES.datePickersOverview,
    id: 'x-date-pickers',
  },
  {
    name: 'Charts',
    href: ROUTES.chartsOverview,
    id: 'x-charts',
  },
  {
    name: 'Tree View',
    href: ROUTES.treeViewOverview,
    id: 'x-tree-view',
  },
];

export default function MuiProductSelector() {
  const pageContext = React.useContext(PageContext);

  return (
    <React.Fragment>
      <Box
        component="li"
        role="none"
        sx={{ p: 2, pr: 3, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <ProductSubMenu
          role="menuitem"
          icon={<IconImage name="product-core" />}
          name="MUI Core"
          description="Ready-to-use foundational React components, free forever."
        />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="flex-start"
          spacing={1}
          sx={{
            ml: '36px',
            pl: 2,
            pt: 1.5,
            position: 'relative',
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
          {coreProducts.map((product) => (
            <Chip
              key={product.name}
              color={pageContext.productId === product.id ? 'primary' : undefined}
              variant={pageContext.productId === product.id ? 'filled' : 'outlined'}
              component={Link}
              href={product.href}
              label={product.name}
              clickable
              size="small"
            />
          ))}
        </Stack>
      </Box>
      <Box
        component="li"
        role="none"
        sx={{ p: 2, pr: 3, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <ProductSubMenu
          role="menuitem"
          icon={<IconImage name="product-advanced" />}
          name="MUI X"
          description="Advanced and powerful components for complex use cases."
        />
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="flex-start"
          spacing={1}
          sx={{
            ml: '36px',
            pl: 2,
            pt: 1.5,
            position: 'relative',
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
          {advancedProducts.map((product) => (
            <Chip
              key={product.name}
              color={pageContext.productId === product.id ? 'primary' : undefined}
              variant={pageContext.productId === product.id ? 'filled' : 'outlined'}
              component={Link}
              href={product.href}
              label={product.name}
              clickable
              size="small"
            />
          ))}
        </Stack>
      </Box>
      <li role="none">
        <Link
          href={ROUTES.toolpadStudioDocs}
          sx={(theme) => ({
            p: 2,
            pr: 3,
            width: '100%',
            '&:hover': {
              backgroundColor: 'grey.50',
            },
            ...theme.applyDarkStyles({
              '&:hover': {
                backgroundColor: alpha(theme.palette.primaryDark[700], 0.4),
              },
            }),
          })}
        >
          <ProductSubMenu
            role="menuitem"
            icon={<IconImage name="product-toolpad" />}
            name="Toolpad"
            description="Low-code admin builder."
            chip={<Chip size="small" label="Beta" color="primary" variant="outlined" />}
          />
        </Link>
      </li>
    </React.Fragment>
  );
}
