import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box, { BoxProps } from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
// import Chip from '@mui/material/Chip';
// import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
// import IconImage from 'docs/src/components/icon/IconImage';
import ROUTES from 'docs/src/route';
import { Link } from '@mui/docs/Link';
import PageContext from 'docs/src/modules/components/PageContext';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import SvgBaseUiLogo from 'docs/src/icons/SvgBaseUiLogo';

import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';

const iconStyles = (theme) => ({
  fontSize: theme.typography.pxToRem(14),
  color: (theme.vars || theme).palette.primary.main,
});

const NavLabel = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0.5, 1, 1, 1),
  fontSize: theme.typography.pxToRem(11),
  fontWeight: theme.typography.fontWeightSemiBold,
  textTransform: 'uppercase',
  letterSpacing: '.1rem',
  color: (theme.vars || theme).palette.text.tertiary,
}));

interface ProductItemProps {
  active?: boolean;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
  name: string;
}

function ProductItem({ active, href, description, name, icon }: ProductItemProps) {
  return (
    <Box
      component={Link}
      href={href}
      sx={{
        p: 1,
        pl: '6px',
        display: 'flex',
        // flexDirection: 'column',
        alignItems: 'start',
        gap: '8px',
        flexGrow: 1,
        backgroundColor: active ? 'rgba(15, 10, 222, 0.02)' : undefined,
        borderRadius: '8px',
        border: '1px solid',
        borderColor: active ? 'primary.100' : 'transparent',
        transition: '100ms ease-in background-color, border',
        '&:hover': {
          backgroundColor: 'grey.50',
          borderColor: 'divider',
        },
      }}
    >
      <Box
        sx={{
          height: 21,
          width: 21,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': {
            ml: '0 !important',
          },
        }}
      >
        {icon}
      </Box>
      <div>
        <Typography color="text.primary" variant="body2" fontWeight="semiBold">
          {name}
        </Typography>
        <Typography color="text.secondary" fontSize=".813rem">
          {description}
        </Typography>
      </div>
    </Box>
  );
}

const coreProducts = [
  {
    id: 'material-ui',
    name: 'Material UI',
    description: 'Ready-to-use foundational components.',
    icon: <SvgMuiLogomark width={14} height={14} />,
    href: ROUTES.materialDocs,
  },
  {
    id: 'joy-ui',
    name: 'Joy UI',
    description: 'Beautiful foudational components.',
    icon: <SvgMuiLogomark width={14} height={14} />,
    href: ROUTES.joyDocs,
  },
  {
    id: 'base-ui',
    name: 'Base UI',
    description: 'Unstyled components and hooks.',
    icon: <SvgBaseUiLogo width={14} height={14} />,
    href: ROUTES.baseDocs,
  },
  {
    id: 'system',
    name: 'MUI System',
    description: 'Ready-to-use foundational components.',
    icon: <SvgBaseUiLogo width={14} height={14} />,
    href: ROUTES.systemDocs,
  },
];

const advancedProducts = [
  {
    id: 'x-data-grid',
    name: 'Data Grid',
    description: 'Bla bla bla bla description here.',
    icon: <BackupTableRoundedIcon sx={iconStyles} />,
    href: ROUTES.dataGridOverview,
  },
  {
    id: 'x-date-pickers',
    name: 'Date and Time Pickers',
    description: 'Bla bla bla bla description here.',
    icon: <CalendarMonthRoundedIcon sx={iconStyles} />,
    href: ROUTES.datePickersOverview,
  },
  {
    id: 'x-charts',
    name: 'Charts',
    description: 'Bla bla bla bla description here.',
    icon: <BarChartRoundedIcon sx={iconStyles} />,
    href: ROUTES.chartsOverview,
  },
  {
    id: 'x-tree-view',
    name: 'Tree View',
    description: 'Bla bla bla bla description here.',
    icon: <AccountTreeRoundedIcon sx={iconStyles} />,
    href: ROUTES.treeViewOverview,
  },
];

export default function MuiProductSelector() {
  const pageContext = React.useContext(PageContext);

  return (
    <React.Fragment>
      <Box
        component="li"
        role="none"
        sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        {/* <NavLabel>Libraries</NavLabel> */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '4px' }}>
          {coreProducts.map((product) => (
            <ProductItem
              key={product.name}
              name={product.name}
              description={product.description}
              href={product.href}
              icon={product.icon}
              active={pageContext.productId === product.id}
            />
          ))}
        </Box>
      </Box>
      <Box
        component="li"
        role="none"
        sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <NavLabel>MUI X Components</NavLabel>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '4px' }}>
          {advancedProducts.map((product) => (
            <ProductItem
              key={product.name}
              name={product.name}
              description={product.description}
              icon={product.icon}
              href={product.href}
              active={pageContext.productId === product.id}
            />
          ))}
        </Box>
      </Box>
      <Box
        component="li"
        role="none"
        sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        {/* <NavLabel>What do I put here?</NavLabel> */}
        <ProductItem
          name="Toolpad"
          href={ROUTES.toolpadStudioDocs}
          icon={<SvgMuiLogomark width={14} height={14} />}
          description="A self-hosted, low-code internal tool builder."
          // active={pageContext.productId === product.id}
        />
      </Box>
    </React.Fragment>
  );
}
