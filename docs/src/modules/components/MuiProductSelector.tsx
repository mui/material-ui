import * as React from 'react';
import { styled, alpha, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Link } from '@mui/docs/Link';
import ROUTES from 'docs/src/route';
import PageContext from 'docs/src/modules/components/PageContext';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import SvgBaseUiLogo from 'docs/src/icons/SvgBaseUiLogo';
import SvgToolpadLogo from 'docs/src/icons/SvgToolpadLogo';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';

const iconStyles = () => ({
  fontSize: '.875rem',
  color: 'primary.main',
});

const logoColor = (theme: Theme) => ({
  '& path': {
    ...theme.applyDarkStyles({
      fill: (theme.vars || theme).palette.primary[400],
    }),
  },
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
  chip?: React.ReactNode;
  description?: string;
  href: string;
  icon?: React.ReactNode;
  name: string;
}

function ProductItem({ active, chip, description, href, icon, name }: ProductItemProps) {
  return (
    <Box
      component={Link}
      href={href}
      sx={(theme) => ({
        p: 1,
        pl: '6px',
        display: 'flex',
        alignItems: 'start',
        gap: '8px',
        flexGrow: 1,
        backgroundColor: active ? alpha(theme.palette.primary[50], 0.8) : undefined,
        border: '1px solid',
        borderColor: active ? 'primary.100' : 'transparent',
        borderRadius: '8px',
        transition: '100ms ease-in background-color, border',
        '&:hover': {
          backgroundColor: active ? alpha(theme.palette.primary[50], 0.8) : 'grey.50',
          borderColor: 'divider',
        },
        ...theme.applyDarkStyles({
          backgroundColor: active ? alpha(theme.palette.primary[900], 0.2) : undefined,
          borderColor: active ? alpha(theme.palette.primary[300], 0.2) : 'transparent',
          '&:hover': {
            backgroundColor: active
              ? alpha(theme.palette.primary[900], 0.3)
              : alpha(theme.palette.primaryDark[700], 0.5),
            borderColor: 'divider',
          },
        }),
      })}
    >
      <Box
        sx={{
          height: 21, // match the Typography line-height
          width: 21,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          '& svg': {
            ml: '0 !important', // to override the margin-left Link adds
          },
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
    </Box>
  );
}

const coreProducts = [
  {
    id: 'material-ui',
    name: 'Material UI',
    description: 'Ready-to-use foundational components.',
    icon: <SvgMuiLogomark width={14} height={14} sx={logoColor} />,
    href: ROUTES.materialDocs,
  },
  {
    id: 'base-ui',
    name: 'Base UI',
    description: 'Unstyled components and hooks.',
    icon: <SvgBaseUiLogo width={14} height={14} sx={logoColor} />,
    href: ROUTES.baseDocs,
  },
  {
    id: 'joy-ui',
    name: 'Joy UI',
    description: 'Beautiful foudational components.',
    icon: <WebRoundedIcon sx={iconStyles} />,
    href: ROUTES.joyDocs,
  },
  {
    id: 'system',
    name: 'MUI System',
    description: 'A set of CSS utilities.',
    icon: <StyleRoundedIcon sx={iconStyles} />,
    href: ROUTES.systemDocs,
  },
];

const advancedProducts = [
  {
    id: 'x-data-grid',
    name: 'Data Grid',
    description: 'A fast and extendable data table.',
    icon: <BackupTableRoundedIcon sx={iconStyles} />,
    href: ROUTES.dataGridOverview,
  },
  {
    id: 'x-date-pickers',
    name: 'Date and Time Pickers',
    description: 'Let users select date or time values.',
    icon: <CalendarMonthRoundedIcon sx={iconStyles} />,
    href: ROUTES.datePickersOverview,
  },
  {
    id: 'x-charts',
    name: 'Charts',
    description: 'Multiple types of charts for data viz.',
    icon: <BarChartRoundedIcon sx={iconStyles} />,
    href: ROUTES.chartsOverview,
  },
  {
    id: 'x-tree-view',
    name: 'Tree View',
    description: 'Let users navigate hierarchical lists.',
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
        sx={{
          p: 1,
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, minmax(0, 1fr))',
            sm: 'repeat(2, minmax(0, 1fr))',
          },
          gap: '4px',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
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
      <Box
        component="li"
        role="none"
        sx={{ p: 1, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <NavLabel>MUI X Components</NavLabel>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, minmax(0, 1fr))',
              sm: 'repeat(2, minmax(0, 1fr))',
            },
            gap: '4px',
          }}
        >
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
      <Box component="li" role="none" sx={{ p: 1 }}>
        <ProductItem
          name="Toolpad"
          href={ROUTES.toolpadStudioDocs}
          icon={<SvgToolpadLogo width={14} height={14} sx={logoColor} />}
          description="A self-hosted, low-code internal tool builder."
          active={pageContext.productId === 'toolpad-core'}
          chip={
            <Chip
              label="Beta"
              size="small"
              color="primary"
              variant="outlined"
              sx={{
                fontSize: '.625rem',
                fontWeight: 'semiBold',
                textTransform: 'uppercase',
                letterSpacing: '.04rem',
                height: '16px',
                '& .MuiChip-label': {
                  px: '4px',
                },
              }}
            />
          }
        />
      </Box>
    </React.Fragment>
  );
}
