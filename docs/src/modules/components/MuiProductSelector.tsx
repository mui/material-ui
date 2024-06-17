import * as React from 'react';
import { styled, Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import MenuList, { MenuListProps } from '@mui/material/MenuList';
import ROUTES from 'docs/src/route';
import PageContext from 'docs/src/modules/components/PageContext';
import SvgMuiLogomark from 'docs/src/icons/SvgMuiLogomark';
import SvgBaseUiLogo from 'docs/src/icons/SvgBaseUiLogo';
import SvgToolpadLogo from 'docs/src/icons/SvgToolpadLogo';
import ProductMenuItem from 'docs/src/components/action/ProductMenuItem';
import BackupTableRoundedIcon from '@mui/icons-material/BackupTableRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import StyleRoundedIcon from '@mui/icons-material/StyleRounded';
import WebRoundedIcon from '@mui/icons-material/WebRounded';

const iconStyles = (theme: Theme) => ({
  fontSize: '.875rem',
  color: (theme.vars || theme).palette.primary.main,
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

const MuiProductSelector = React.forwardRef(function MuiProductSelector(
  props: MenuListProps<'div'>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const pageContext = React.useContext(PageContext);

  return (
    <MenuList
      {...props}
      component="div"
      ref={forwardedRef}
      sx={{
        p: 1,
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, minmax(0, 1fr))',
          sm: 'repeat(2, minmax(0, 1fr))',
        },
        gap: '4px',
      }}
    >
      {coreProducts.map((product) => (
        <ProductMenuItem
          key={product.name}
          name={product.name}
          description={product.description}
          href={product.href}
          icon={product.icon}
          active={pageContext.productId === product.id}
          docs
        />
      ))}
      <Divider
        sx={{
          mx: -1,
          gridColumn: {
            xs: '1 / span 1',
            sm: '1 / span 2',
          },
        }}
      />
      <Box
        key="X components"
        role="none"
        sx={{
          gridColumn: {
            xs: '1 / span 1',
            sm: '1 / span 2',
          },
        }}
      >
        <NavLabel>MUI X Components</NavLabel>
      </Box>
      {advancedProducts.map((product) => (
        <ProductMenuItem
          key={product.name}
          name={product.name}
          description={product.description}
          icon={product.icon}
          href={product.href}
          active={pageContext.productId === product.id}
          docs
        />
      ))}
      <Divider
        sx={{
          mx: -1,
          gridColumn: {
            xs: '1 / span 1',
            sm: '1 / span 2',
          },
        }}
      />
      <ProductMenuItem
        key="Toolpad"
        name="Toolpad"
        href={ROUTES.toolpadStudioDocs}
        icon={<SvgToolpadLogo width={14} height={14} sx={logoColor} />}
        description="A self-hosted, low-code internal tool builder."
        active={pageContext.productId === 'toolpad-core'}
        docs
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
        sx={{
          gridColumn: {
            xs: '1 / span 1',
            sm: '1 / span 2',
          },
        }}
      />
    </MenuList>
  );
});

export default MuiProductSelector;
