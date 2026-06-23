import * as React from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import { alpha, createTheme, CssVarsProvider, ThemeProvider } from '@mui/material/styles';
import { BarPlot, barClasses } from '@mui/x-charts/BarChart';
import { ChartsContainer } from '@mui/x-charts/ChartsContainer';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { ChartsGrid, chartsGridClasses } from '@mui/x-charts/ChartsGrid';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { LinePlot, lineClasses, MarkPlot } from '@mui/x-charts/LineChart';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import { Item, Group, Highlighter } from '@mui/internal-core-docs/AppLayout';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { TwinkleIcon, SvgMaterialDesignIcon } from '@mui/internal-core-docs/svgIcons';

const ThemedSchedulerPreview = dynamic(
  () => import('docs/src/components/productX/XThemingSchedulerPreview'),
  {
    ssr: false,
    loading: () => (
      <Paper
        variant="outlined"
        sx={{
          height: 418,
          bgcolor: 'background.paper',
          borderColor: 'divider',
        }}
      />
    ),
  },
);

const customThemeTokens = {
  ink: '#101322',
  muted: '#5D667A',
  canvas: '#F8FAFF',
  surface: '#FFFFFF',
  surfaceTint: '#F2F6FF',
  border: '#E2E8F6',
  accent: 'hsl(210, 100%, 45%)',
  accentLight: 'hsl(210, 100%, 90%)',
  accentBright: 'hsl(210, 100%, 60%)',
  accentDark: 'hsl(210, 100%, 30%)',
  violet: '#7C3AED',
  violetLight: '#EDE9FE',
};

const customGlassPanelSx = {
  position: 'relative',
  borderRadius: '16px',
  borderColor: alpha(customThemeTokens.accentBright, 0.42),
  background: `linear-gradient(135deg, ${alpha('#FFFFFF', 0.9)} 0%, ${alpha(
    '#FFFFFF',
    0.62,
  )} 100%), linear-gradient(145deg, ${alpha(customThemeTokens.accentLight, 0.56)} 0%, ${alpha(
    customThemeTokens.violetLight,
    0.48,
  )} 100%)`,
  backdropFilter: 'blur(18px) saturate(180%)',
  boxShadow: `0 0 0 1px ${alpha(customThemeTokens.accentBright, 0.26)}, 0 0 22px ${alpha(
    customThemeTokens.accentBright,
    0.22,
  )}, 0 24px 64px ${alpha(customThemeTokens.accentDark, 0.12)}, 0 1px 0 ${alpha(
    '#FFFFFF',
    0.88,
  )} inset, inset 0 0 0 1px ${alpha('#FFFFFF', 0.56)}`,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -1,
    zIndex: 1,
    border: '1px solid transparent',
    borderRadius: 'inherit',
    pointerEvents: 'none',
    background: `linear-gradient(135deg, ${alpha(customThemeTokens.accentBright, 0.92)} 0%, ${alpha(
      '#FFFFFF',
      0.72,
    )} 28%, ${alpha(customThemeTokens.violet, 0.38)} 68%, ${alpha(
      customThemeTokens.accentBright,
      0.2,
    )} 100%) border-box`,
    WebkitMask: 'linear-gradient(#000 0 0) padding-box, linear-gradient(#000 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    borderRadius: 'inherit',
    pointerEvents: 'none',
    boxShadow: `inset 0 0 26px ${alpha(customThemeTokens.accentBright, 0.16)}`,
  },
  '& > *': {
    position: 'relative',
    zIndex: 2,
  },
  '[data-mui-color-scheme="dark"] &': {
    color: '#F8FBFF',
    borderColor: alpha(customThemeTokens.accentBright, 0.72),
    background: `linear-gradient(135deg, ${alpha('#07122E', 0.86)} 0%, ${alpha(
      '#030712',
      0.76,
    )} 100%), radial-gradient(circle at 12% 0%, ${alpha(
      customThemeTokens.accentBright,
      0.28,
    )} 0, transparent 34%), radial-gradient(circle at 92% 12%, ${alpha(
      customThemeTokens.violet,
      0.24,
    )} 0, transparent 38%)`,
    boxShadow: `0 0 0 1px ${alpha(customThemeTokens.accentBright, 0.48)}, 0 0 24px ${alpha(
      customThemeTokens.accentBright,
      0.54,
    )}, 0 0 58px ${alpha(customThemeTokens.accent, 0.34)}, 0 26px 70px ${alpha(
      '#000000',
      0.52,
    )}, inset 0 1px 0 ${alpha('#FFFFFF', 0.18)}`,
    '&::before': {
      background: `linear-gradient(135deg, ${alpha(
        customThemeTokens.accentBright,
        1,
      )} 0%, ${alpha('#FFFFFF', 0.72)} 22%, ${alpha(customThemeTokens.violet, 0.58)} 62%, ${alpha(
        customThemeTokens.accentBright,
        0.28,
      )} 100%) border-box`,
    },
    '&::after': {
      boxShadow: `inset 0 0 34px ${alpha(customThemeTokens.accentBright, 0.24)}`,
    },
    '& .MuiTypography-root': {
      color: '#F8FBFF',
    },
    '& .MuiTypography-subtitle2': {
      color: '#F8FBFF',
    },
    '& .MuiTypography-body2, & .MuiTypography-caption': {
      color: alpha('#DDEBFF', 0.74),
    },
  },
};

const customChartsTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: customThemeTokens.accent,
      light: customThemeTokens.accentLight,
      dark: customThemeTokens.accentDark,
    },
    secondary: {
      main: customThemeTokens.ink,
      light: '#E4E8F4',
      dark: '#020617',
    },
    warning: {
      main: customThemeTokens.violet,
      light: customThemeTokens.violetLight,
      dark: '#4C1D95',
    },
    success: {
      main: customThemeTokens.accent,
      light: customThemeTokens.accentLight,
      dark: customThemeTokens.accentDark,
    },
    text: {
      primary: customThemeTokens.ink,
      secondary: customThemeTokens.muted,
    },
    background: {
      paper: customThemeTokens.surface,
      default: customThemeTokens.canvas,
    },
    divider: customThemeTokens.border,
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    subtitle2: {
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: 0,
    },
    caption: {
      fontSize: 12,
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiChartsAxis: {
      styleOverrides: {
        root: {
          [`& .${axisClasses.line}`]: {
            stroke: alpha(customThemeTokens.ink, 0.1),
          },
          [`& .${axisClasses.tick}`]: {
            stroke: alpha(customThemeTokens.ink, 0.1),
          },
          [`& .${axisClasses.tickLabel}`]: {
            fill: customThemeTokens.muted,
            fontSize: 12,
            fontWeight: 600,
          },
        },
      },
    },
    MuiChartsGrid: {
      styleOverrides: {
        root: {
          [`& .${chartsGridClasses.line}`]: {
            stroke: alpha(customThemeTokens.ink, 0.07),
            strokeDasharray: '2 8',
            strokeWidth: 0.9,
          },
        },
      },
    },
  },
});

const materialPreviewTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
});

const chartMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const subscriptionsData = [38, 44, 42, 48, 52, 59, 63, 68];
const expansionData = [18, 22, 24, 21, 29, 32, 35, 39];
const runRateData = [52, 60, 64, 66, 76, 84, 91, 99];

type MiniGridSegment = 'Enterprise' | 'Commercial' | 'Scale-up';
type MiniGridStatus = 'Healthy' | 'Expansion' | 'Watch';

interface MiniGridRow {
  id: number;
  account: string;
  region: string;
  initials: string;
  segment: MiniGridSegment;
  arr: number;
  growth: number;
  health: number;
  status: MiniGridStatus;
}

const miniGridRows: MiniGridRow[] = [
  {
    id: 1,
    account: 'Northwind',
    region: 'North America',
    initials: 'NW',
    segment: 'Enterprise',
    arr: 420,
    growth: 18.4,
    health: 98,
    status: 'Healthy',
  },
  {
    id: 2,
    account: 'Contoso',
    region: 'EMEA',
    initials: 'CO',
    segment: 'Commercial',
    arr: 318,
    growth: 9.2,
    health: 92,
    status: 'Expansion',
  },
  {
    id: 3,
    account: 'Tailspin',
    region: 'APAC',
    initials: 'TS',
    segment: 'Enterprise',
    arr: 286,
    growth: -2.1,
    health: 76,
    status: 'Watch',
  },
  {
    id: 4,
    account: 'Fabrikam',
    region: 'Latin America',
    initials: 'FB',
    segment: 'Scale-up',
    arr: 164,
    growth: 14.7,
    health: 81,
    status: 'Expansion',
  },
];

const miniGridMaxArr = Math.max(...miniGridRows.map((row) => row.arr));

const miniSegmentStyles: Record<MiniGridSegment, { color: string; background: string }> = {
  Enterprise: {
    color: customThemeTokens.accentDark,
    background: `linear-gradient(135deg, ${alpha(customThemeTokens.accentLight, 0.82)} 0%, ${alpha(
      '#FFFFFF',
      0.66,
    )} 100%)`,
  },
  Commercial: {
    color: '#4C1D95',
    background: `linear-gradient(135deg, ${alpha(customThemeTokens.violetLight, 0.9)} 0%, ${alpha(
      '#FFFFFF',
      0.7,
    )} 100%)`,
  },
  'Scale-up': {
    color: '#0F766E',
    background: `linear-gradient(135deg, ${alpha('#CCFBF1', 0.86)} 0%, ${alpha(
      '#FFFFFF',
      0.72,
    )} 100%)`,
  },
};

const miniStatusStyles: Record<
  MiniGridStatus,
  { color: string; background: string; progress: string }
> = {
  Healthy: {
    color: customThemeTokens.accentDark,
    background: alpha(customThemeTokens.accentLight, 0.78),
    progress: customThemeTokens.accent,
  },
  Expansion: {
    color: '#4C1D95',
    background: alpha(customThemeTokens.violetLight, 0.82),
    progress: customThemeTokens.violet,
  },
  Watch: {
    color: '#92400E',
    background: alpha('#FEF3C7', 0.9),
    progress: '#F59E0B',
  },
};

const miniGridColumns: GridColDef<MiniGridRow>[] = [
  {
    field: 'account',
    headerName: 'Account',
    flex: 1,
    minWidth: 164,
    renderCell: (params) => (
      <Stack
        direction="row"
        spacing={1}
        sx={{ width: '100%', minWidth: 0, overflow: 'hidden', alignItems: 'center' }}
      >
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            width: 30,
            height: 30,
            flexShrink: 0,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '10px',
            color: '#FFFFFF',
            background: `linear-gradient(135deg, ${customThemeTokens.accent} 0%, ${customThemeTokens.violet} 100%)`,
            fontSize: 11,
            fontWeight: 800,
            boxShadow: `0 8px 18px ${alpha(customThemeTokens.accentDark, 0.18)}`,
          }}
        >
          {params.row.initials}
        </Box>
        <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
          <Typography
            component="span"
            sx={{
              display: 'block',
              color: 'text.primary',
              fontSize: 13,
              fontWeight: 700,
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {params.row.account}
          </Typography>
          <Typography
            component="span"
            sx={{
              display: 'block',
              color: 'text.secondary',
              fontSize: 11,
              lineHeight: 1.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {params.row.region}
          </Typography>
        </Box>
      </Stack>
    ),
  },
  {
    field: 'segment',
    headerName: 'Segment',
    width: 108,
    renderCell: (params) => {
      const segmentStyle = miniSegmentStyles[params.row.segment];

      return (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            maxWidth: '100%',
            px: 0.85,
            py: 0.35,
            borderRadius: 999,
            color: segmentStyle.color,
            background: segmentStyle.background,
            fontSize: 11,
            fontWeight: 800,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            boxShadow: `inset 0 0 0 1px ${alpha('#FFFFFF', 0.58)}`,
            '[data-mui-color-scheme="dark"] &': {
              color: '#F8FBFF',
              background: alpha(
                params.row.segment === 'Commercial'
                  ? customThemeTokens.violet
                  : customThemeTokens.accent,
                0.24,
              ),
              boxShadow: `inset 0 0 0 1px ${alpha(customThemeTokens.accentBright, 0.2)}`,
            },
          }}
        >
          {params.row.segment}
        </Box>
      );
    },
  },
  {
    field: 'arr',
    headerName: 'ARR',
    width: 104,
    renderCell: (params) => {
      const arrProgress = Math.round((params.row.arr / miniGridMaxArr) * 100);
      const positiveGrowth = params.row.growth >= 0;

      return (
        <Box sx={{ width: '100%' }}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Typography component="span" sx={{ fontSize: 13, fontWeight: 800, lineHeight: 1.2 }}>
              ${params.row.arr}K
            </Typography>
            <Typography
              component="span"
              sx={{
                color: positiveGrowth ? customThemeTokens.accent : '#D97706',
                fontSize: 10,
                fontWeight: 800,
                lineHeight: 1.2,
                '[data-mui-color-scheme="dark"] &': {
                  color: positiveGrowth ? customThemeTokens.accentBright : '#FBBF24',
                },
              }}
            >
              {positiveGrowth ? '+' : ''}
              {params.row.growth}%
            </Typography>
          </Stack>
          <Box
            aria-hidden="true"
            sx={{
              mt: 0.55,
              height: 4,
              borderRadius: 999,
              backgroundColor: alpha(customThemeTokens.accent, 0.1),
              overflow: 'hidden',
              '[data-mui-color-scheme="dark"] &': {
                backgroundColor: alpha(customThemeTokens.accentBright, 0.12),
              },
            }}
          >
            <Box
              sx={{
                width: `${arrProgress}%`,
                height: '100%',
                borderRadius: 'inherit',
                background: `linear-gradient(90deg, ${customThemeTokens.accent} 0%, ${customThemeTokens.violet} 100%)`,
              }}
            />
          </Box>
        </Box>
      );
    },
  },
  {
    field: 'health',
    headerName: 'Health',
    width: 112,
    renderCell: (params) => {
      const statusStyle = miniStatusStyles[params.row.status];

      return (
        <Box sx={{ width: '100%' }}>
          <Stack
            direction="row"
            sx={{ minWidth: 0, alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                maxWidth: 'calc(100% - 30px)',
                px: 0.7,
                py: 0.2,
                borderRadius: 999,
                color: statusStyle.color,
                backgroundColor: statusStyle.background,
                fontSize: 10,
                fontWeight: 800,
                lineHeight: 1.25,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '[data-mui-color-scheme="dark"] &': {
                  color: '#F8FBFF',
                  backgroundColor: alpha(statusStyle.progress, 0.24),
                },
              }}
            >
              {params.row.status}
            </Box>
            <Typography
              component="span"
              sx={{ flexShrink: 0, fontSize: 11, fontWeight: 800, lineHeight: 1.2 }}
            >
              {params.row.health}%
            </Typography>
          </Stack>
          <Box
            aria-hidden="true"
            sx={{
              mt: 0.55,
              height: 4,
              borderRadius: 999,
              backgroundColor: alpha(statusStyle.progress, 0.12),
              overflow: 'hidden',
              '[data-mui-color-scheme="dark"] &': {
                backgroundColor: alpha(statusStyle.progress, 0.16),
              },
            }}
          >
            <Box
              sx={{
                width: `${params.row.health}%`,
                height: '100%',
                borderRadius: 'inherit',
                background: statusStyle.progress,
              }}
            />
          </Box>
        </Box>
      );
    },
  },
];

const previewItems = [
  { id: 'charts', label: 'Charts' },
  { id: 'dataGrid', label: 'Data Grid' },
  { id: 'scheduler', label: 'Scheduler' },
] as const;

type PreviewItemId = (typeof previewItems)[number]['id'];

interface ThemedPreviewCarouselProps {
  custom: boolean;
  previewId: PreviewItemId;
  setPreviewId: React.Dispatch<React.SetStateAction<PreviewItemId>>;
}

const customGradientIds = {
  subscriptions: 'x-theming-subscriptions-gradient',
  expansion: 'x-theming-expansion-gradient',
  runRate: 'x-theming-run-rate-gradient',
};

const customChartColors = {
  subscriptions: `url(#${customGradientIds.subscriptions})`,
  expansion: `url(#${customGradientIds.expansion})`,
  runRate: `url(#${customGradientIds.runRate})`,
};

const materialChartColors = {
  subscriptions: '#1976d2',
  expansion: '#9c27b0',
  runRate: '#2e7d32',
};

const customLegendColors = {
  subscriptions:
    'linear-gradient(180deg, hsl(210, 100%, 30%) 0%, hsl(210, 100%, 45%) 55%, hsl(210, 100%, 60%) 100%)',
  expansion: 'linear-gradient(180deg, #7C3AED 0%, #A78BFA 100%)',
  runRate: 'linear-gradient(90deg, #101322 0%, hsl(210, 100%, 45%) 52%, #7C3AED 100%)',
};

const legendItems = [
  { label: 'Subscriptions', key: 'subscriptions' },
  { label: 'Expansion', key: 'expansion' },
  { label: 'Run rate', key: 'runRate' },
] as const;

const customThemeCode = `
const theme = createTheme({
  palette: {
    primary: {
      main: 'hsl(210, 100%, 45%)',
      light: 'hsl(210, 100%, 90%)',
      dark: 'hsl(210, 100%, 30%)',
    },
    secondary: {
      main: '#101322',
      light: '#E4E8F4',
      dark: '#020617',
    },
    warning: {
      main: '#7C3AED',
      light: '#EDE9FE',
      dark: '#4C1D95',
    },
    success: {
      main: 'hsl(210, 100%, 45%)',
      light: 'hsl(210, 100%, 90%)',
      dark: 'hsl(210, 100%, 30%)',
    },
    text: {
      primary: '#101322',
      secondary: '#5D667A',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F8FAFF',
    },
    divider: '#E2E8F6',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    subtitle2: {
      fontSize: 16,
      fontWeight: 700,
    },
    caption: {
      fontSize: 12,
    },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiChartsAxis: {
      styleOverrides: {
        root: {
          [\`& .\${axisClasses.line}, & .\${axisClasses.tick}\`]: {
            stroke: alpha('#101322', 0.1),
          },
          [\`& .\${axisClasses.tickLabel}\`]: {
            fill: '#5D667A',
            fontSize: 12,
            fontWeight: 600,
          },
        },
      },
    },
    MuiChartsGrid: {
      styleOverrides: {
        root: {
          [\`& .\${chartsGridClasses.line}\`]: {
            stroke: alpha('#101322', 0.07),
            strokeDasharray: '2 8',
            strokeWidth: 0.9,
          },
        },
      },
    },
  },
});

<ThemeProvider theme={theme}>
  <ChartsContainer
    series={[
      { type: 'bar', color: 'url(#subscriptionsGradient)' },
      { type: 'bar', color: 'url(#expansionGradient)' },
      { type: 'line', color: 'url(#runRateGradient)' },
    ]}
  >
    <defs>{/* alpha gradients */}</defs>
    <ChartsGrid horizontal />
    <BarPlot borderRadius={9} />
    <LinePlot />
    <MarkPlot />
  </ChartsContainer>
</ThemeProvider>`;

const materialThemeCode = `
const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
  colorSchemes: {
    light: true,
    dark: true,
  },
});

<CssVarsProvider theme={theme} forceThemeRerender>
  <ChartsContainer
    series={[
      { type: 'bar', color: '#1976d2' },
      { type: 'bar', color: '#9c27b0' },
      { type: 'line', color: '#2e7d32' },
    ]}
    sx={{
      [\`& .\${barClasses.element}\`]: {
        stroke: alpha('#FFFFFF', 0.76),
        strokeWidth: 0.5,
      },
      [\`& .\${lineClasses.line}\`]: {
        strokeWidth: 2,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
      },
    }}
  >
    <ChartsGrid horizontal />
    <BarPlot borderRadius={5} />
    <LinePlot />
    <ChartsXAxis axisId="months" />
    <ChartsYAxis axisId="value" />
  </ChartsContainer>
</CssVarsProvider>`;

function CustomChartGradients() {
  return (
    <defs>
      <linearGradient id={customGradientIds.subscriptions} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={customThemeTokens.accentDark} stopOpacity={0.94} />
        <stop offset="54%" stopColor={customThemeTokens.accent} stopOpacity={0.82} />
        <stop offset="100%" stopColor={customThemeTokens.accentBright} stopOpacity={0.48} />
      </linearGradient>
      <linearGradient id={customGradientIds.expansion} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor={customThemeTokens.violet} stopOpacity={0.88} />
        <stop offset="58%" stopColor="#A78BFA" stopOpacity={0.72} />
        <stop offset="100%" stopColor={customThemeTokens.violetLight} stopOpacity={0.56} />
      </linearGradient>
      <linearGradient id={customGradientIds.runRate} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor={customThemeTokens.ink} />
        <stop offset="54%" stopColor={customThemeTokens.accent} />
        <stop offset="100%" stopColor={customThemeTokens.violet} />
      </linearGradient>
    </defs>
  );
}

function ThemedComposedChart({ custom }: { custom: boolean }) {
  const [codeOpen, setCodeOpen] = React.useState(false);
  const chartColors = custom ? customChartColors : materialChartColors;
  const legendColors = custom ? customLegendColors : materialChartColors;
  const code = custom ? customThemeCode : materialThemeCode;
  const chartSeries = [
    {
      id: 'subscriptions',
      type: 'bar' as const,
      label: 'Subscriptions',
      data: subscriptionsData,
      color: chartColors.subscriptions,
    },
    {
      id: 'expansion',
      type: 'bar' as const,
      label: 'Expansion',
      data: expansionData,
      color: chartColors.expansion,
    },
    {
      id: 'runRate',
      type: 'line' as const,
      label: 'Run rate',
      data: runRateData,
      color: chartColors.runRate,
      curve: 'monotoneX' as const,
      showMark: custom,
    },
  ];

  return (
    <Paper
      variant="outlined"
      sx={[
        {
          height: 418,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderColor: 'divider',
        },
        custom && customGlassPanelSx,
      ]}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={[
          {
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            px: 2,
            py: 1.75,
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
          custom && {
            py: 2,
            background: `linear-gradient(90deg, ${alpha(
              customThemeTokens.accentLight,
              0.46,
            )} 0%, ${alpha('#FFFFFF', 0.42)} 52%, ${alpha(
              customThemeTokens.violetLight,
              0.4,
            )} 100%)`,
            '[data-mui-color-scheme="dark"] &': {
              borderColor: alpha(customThemeTokens.accentBright, 0.18),
              background: `linear-gradient(90deg, ${alpha(
                customThemeTokens.accent,
                0.16,
              )} 0%, ${alpha('#FFFFFF', 0.04)} 52%, ${alpha(customThemeTokens.violet, 0.12)} 100%)`,
            },
          },
        ]}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h3" variant="subtitle2" gutterBottom>
            Revenue composition
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              maxWidth: 520,
            }}
          >
            Monthly subscriptions, expansion, and run-rate trend.
          </Typography>
        </Box>
        <Box
          component="button"
          type="button"
          aria-pressed={codeOpen}
          onClick={() => setCodeOpen((open) => !open)}
          sx={[
            {
              font: 'inherit',
              flexShrink: 0,
              display: { xs: 'none', sm: 'inline-flex' },
              alignItems: 'center',
              px: 1.25,
              py: 0.75,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
              color: 'text.secondary',
              fontSize: 13,
              fontWeight: 500,
              lineHeight: 1,
              cursor: 'pointer',
              backgroundColor: 'background.paper',
              '&:hover': {
                borderColor: 'text.secondary',
              },
            },
            custom && {
              color: customThemeTokens.ink,
              background: alpha('#FFFFFF', 0.58),
              borderColor: alpha(customThemeTokens.accent, 0.16),
              backdropFilter: 'blur(12px)',
              boxShadow: `0 8px 18px ${alpha(customThemeTokens.accentDark, 0.08)}`,
              '[data-mui-color-scheme="dark"] &': {
                color: '#F8FBFF',
                background: alpha('#06183B', 0.56),
                borderColor: alpha(customThemeTokens.accentBright, 0.34),
                boxShadow: `0 0 16px ${alpha(customThemeTokens.accentBright, 0.22)}`,
              },
            },
          ]}
        >
          {codeOpen ? 'View Chart' : 'View Code'}
        </Box>
      </Stack>

      {codeOpen ? (
        <Box
          data-mui-color-scheme="dark"
          sx={{
            minHeight: 0,
            flex: 1,
            overflow: 'auto',
            bgcolor: 'common.black',
            color: '#fff',
            '& pre': {
              p: 2,
              minWidth: 640,
            },
            '& code': {
              fontSize: 12,
              lineHeight: 1.65,
            },
          }}
        >
          <HighlightedCode copyButtonHidden plainStyle code={code} language="jsx" />
        </Box>
      ) : (
        <React.Fragment>
          <Box
            sx={[
              {
                minHeight: 0,
                flex: 1,
                px: 2,
                py: 1.75,
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
              },
              custom && {
                background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.54)} 0%, ${alpha(
                  customThemeTokens.surfaceTint,
                  0.48,
                )} 58%, ${alpha(customThemeTokens.violetLight, 0.34)} 100%)`,
                '[data-mui-color-scheme="dark"] &': {
                  background: `linear-gradient(180deg, ${alpha('#081733', 0.42)} 0%, ${alpha(
                    '#020817',
                    0.4,
                  )} 58%, ${alpha(customThemeTokens.violet, 0.12)} 100%)`,
                },
              },
            ]}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 2,
              }}
            >
              <div>
                <Typography
                  component="p"
                  sx={[
                    {
                      fontSize: 28,
                      lineHeight: 1,
                      fontWeight: 700,
                      letterSpacing: 0,
                    },
                    custom && {
                      color: customThemeTokens.ink,
                    },
                  ]}
                >
                  $1.84M
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Annualized run rate
                </Typography>
              </div>
              <Box
                component="span"
                sx={[
                  {
                    flexShrink: 0,
                    borderRadius: 999,
                    px: 1,
                    py: 0.5,
                    color: 'common.white',
                    bgcolor: 'success.dark',
                    fontSize: 12,
                    fontWeight: 700,
                    lineHeight: 1,
                  },
                  custom && {
                    color: '#FFFFFF',
                    background: `linear-gradient(135deg, ${customThemeTokens.accentDark} 0%, ${customThemeTokens.violet} 100%)`,
                    boxShadow: `0 8px 18px ${alpha(
                      customThemeTokens.violet,
                      0.22,
                    )}, inset 0 0 0 1px ${alpha('#FFFFFF', 0.22)}`,
                    '[data-mui-color-scheme="dark"] &': {
                      boxShadow: `0 0 18px ${alpha(
                        customThemeTokens.accentBright,
                        0.38,
                      )}, inset 0 0 0 1px ${alpha('#FFFFFF', 0.22)}`,
                    },
                  },
                ]}
              >
                +18.4%
              </Box>
            </Stack>

            <Box
              sx={[
                {
                  minHeight: 0,
                  flex: 1,
                  mx: -0.5,
                  borderRadius: custom ? 3 : 1,
                },
                custom && {
                  background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.68)} 0%, ${alpha(
                    '#FFFFFF',
                    0.38,
                  )} 100%), repeating-linear-gradient(90deg, transparent 0 68px, ${alpha(
                    customThemeTokens.accent,
                    0.045,
                  )} 68px 69px)`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `inset 0 1px 0 ${alpha('#FFFFFF', 0.92)}, inset 0 0 0 1px ${alpha(
                    customThemeTokens.accent,
                    0.1,
                  )}`,
                  '[data-mui-color-scheme="dark"] &': {
                    background: `linear-gradient(180deg, ${alpha('#0A1833', 0.52)} 0%, ${alpha(
                      '#030713',
                      0.34,
                    )} 100%), repeating-linear-gradient(90deg, transparent 0 68px, ${alpha(
                      customThemeTokens.accentBright,
                      0.08,
                    )} 68px 69px)`,
                    boxShadow: `inset 0 1px 0 ${alpha(
                      '#FFFFFF',
                      0.16,
                    )}, inset 0 0 0 1px ${alpha(customThemeTokens.accentBright, 0.16)}`,
                  },
                },
              ]}
            >
              <ChartsContainer
                xAxis={[
                  {
                    id: 'months',
                    scaleType: 'band',
                    data: chartMonths,
                    categoryGapRatio: 0.34,
                    barGapRatio: 0.22,
                    height: 28,
                  },
                ]}
                yAxis={[{ id: 'value', width: 34 }]}
                series={chartSeries}
                height={218}
                margin={{ left: 0, right: 10, top: 14, bottom: 0 }}
                skipAnimation
                sx={[
                  {
                    [`& .${barClasses.element}`]: {
                      stroke: alpha('#FFFFFF', 0.76),
                      strokeWidth: 0.5,
                    },
                    [`& .${lineClasses.line}`]: {
                      strokeWidth: custom ? 3 : 2,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    },
                  },
                  custom && {
                    [`& .${barClasses.element}`]: {
                      filter: `drop-shadow(0 9px 12px ${alpha(customThemeTokens.ink, 0.1)})`,
                      stroke: alpha('#FFFFFF', 0.82),
                      strokeWidth: 0.6,
                    },
                    [`& .${lineClasses.line}`]: {
                      filter: `drop-shadow(0 7px 8px ${alpha(customThemeTokens.accent, 0.2)})`,
                    },
                    [`& .${lineClasses.mark}`]: {
                      fill: '#FFFFFF',
                      stroke: customThemeTokens.accent,
                      strokeWidth: 2.2,
                      filter: `drop-shadow(0 3px 5px ${alpha(customThemeTokens.accent, 0.22)})`,
                    },
                    [`& .${axisClasses.line}, & .${axisClasses.tick}`]: {
                      stroke: alpha(customThemeTokens.ink, 0.1),
                    },
                    [`& .${axisClasses.tickLabel}`]: {
                      fill: customThemeTokens.muted,
                      fontWeight: 600,
                    },
                    '[data-mui-color-scheme="dark"] &': {
                      [`& .${lineClasses.line}`]: {
                        filter: `drop-shadow(0 0 10px ${alpha(
                          customThemeTokens.accentBright,
                          0.5,
                        )})`,
                      },
                      [`& .${lineClasses.mark}`]: {
                        fill: '#07122E',
                        stroke: customThemeTokens.accentBright,
                      },
                      [`& .${axisClasses.line}, & .${axisClasses.tick}`]: {
                        stroke: alpha(customThemeTokens.accentBright, 0.16),
                      },
                      [`& .${axisClasses.tickLabel}`]: {
                        fill: alpha('#DDEBFF', 0.72),
                      },
                    },
                  },
                ]}
              >
                {custom ? <CustomChartGradients /> : null}
                <ChartsGrid horizontal />
                <BarPlot borderRadius={custom ? 9 : 5} />
                <LinePlot />
                <MarkPlot />
                <ChartsXAxis
                  axisId="months"
                  tickLabelInterval={(_value, index) => index % 2 === 0}
                />
                <ChartsYAxis axisId="value" />
              </ChartsContainer>
            </Box>
          </Box>

          <Box
            sx={[
              {
                px: 2,
                py: 1.25,
                borderTop: '1px solid',
                borderColor: 'divider',
              },
              custom && {
                color: 'text.secondary',
                background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.7)} 0%, ${alpha(
                  customThemeTokens.surfaceTint,
                  0.46,
                )} 100%)`,
                '[data-mui-color-scheme="dark"] &': {
                  borderColor: alpha(customThemeTokens.accentBright, 0.16),
                  background: alpha('#07122E', 0.42),
                },
              },
            ]}
          >
            <Stack direction="row" spacing={1.5} sx={{ flexWrap: 'wrap', rowGap: 0.75 }}>
              {legendItems.map((item) => (
                <Stack
                  key={item.key}
                  component="span"
                  direction="row"
                  spacing={0.75}
                  sx={{ alignItems: 'center' }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: 10,
                      height: 10,
                      display: 'inline-block',
                      flexShrink: 0,
                      borderRadius: item.key === 'runRate' ? 999 : 6,
                      background: legendColors[item.key],
                      boxShadow: custom
                        ? `0 0 0 1px ${alpha('#FFFFFF', 0.7)}, 0 4px 8px ${alpha(
                            customThemeTokens.ink,
                            0.08,
                          )}`
                        : undefined,
                    }}
                  />
                  <Typography variant="caption">{item.label}</Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        </React.Fragment>
      )}
    </Paper>
  );
}

function ThemedMiniDataGrid({ custom }: { custom: boolean }) {
  return (
    <Paper
      variant="outlined"
      sx={[
        {
          height: 418,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: 'background.paper',
          borderColor: 'divider',
        },
        custom && customGlassPanelSx,
      ]}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={[
          {
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            px: 2,
            py: 1.75,
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
          custom && {
            py: 2,
            background: `linear-gradient(90deg, ${alpha(
              customThemeTokens.accentLight,
              0.46,
            )} 0%, ${alpha('#FFFFFF', 0.42)} 52%, ${alpha(
              customThemeTokens.violetLight,
              0.4,
            )} 100%)`,
            '[data-mui-color-scheme="dark"] &': {
              borderColor: alpha(customThemeTokens.accentBright, 0.18),
              background: `linear-gradient(90deg, ${alpha(
                customThemeTokens.accent,
                0.16,
              )} 0%, ${alpha('#FFFFFF', 0.04)} 52%, ${alpha(customThemeTokens.violet, 0.12)} 100%)`,
            },
          },
        ]}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h3" variant="subtitle2" gutterBottom>
            Account health
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
            A compact Data Grid preview with custom cell renderers.
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={[
          {
            minHeight: 0,
            flex: 1,
            p: custom ? 2.25 : 2,
            bgcolor: 'background.default',
          },
          custom && {
            background: `linear-gradient(145deg, ${alpha(
              customThemeTokens.surfaceTint,
              0.56,
            )} 0%, ${alpha(
              '#FFFFFF',
              0.48,
            )} 56%, ${alpha(customThemeTokens.violetLight, 0.38)} 100%)`,
            '[data-mui-color-scheme="dark"] &': {
              background: `linear-gradient(145deg, ${alpha(
                '#081733',
                0.44,
              )} 0%, ${alpha('#020817', 0.42)} 58%, ${alpha(customThemeTokens.violet, 0.12)} 100%)`,
            },
          },
        ]}
      >
        <DataGrid
          rows={miniGridRows}
          columns={miniGridColumns}
          hideFooter
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          disableColumnSorting
          disableVirtualization
          rowHeight={58}
          columnHeaderHeight={50}
          density="standard"
          sx={[
            {
              height: '100%',
              border: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              color: 'text.primary',
              '& .MuiDataGrid-columnHeader': {
                bgcolor: 'background.paper',
              },
              '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                px: 1.5,
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: 700,
              },
              '& .MuiDataGrid-cell': {
                display: 'flex',
                alignItems: 'center',
                borderColor: 'divider',
              },
              '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
                {
                  outline: 'none',
                },
            },
            custom && {
              border: `1px solid ${alpha(customThemeTokens.accent, 0.14)}`,
              borderRadius: '14px',
              overflow: 'hidden',
              background: alpha('#FFFFFF', 0.62),
              backdropFilter: 'blur(14px) saturate(170%)',
              boxShadow: `0 16px 34px ${alpha(
                customThemeTokens.accentDark,
                0.08,
              )}, inset 0 1px 0 ${alpha('#FFFFFF', 0.9)}`,
              '--DataGrid-rowBorderColor': alpha(customThemeTokens.accent, 0.08),
              '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                px: 1.5,
              },
              '& .MuiDataGrid-columnHeader': {
                background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.96)} 0%, ${alpha(
                  customThemeTokens.surfaceTint,
                  0.72,
                )} 100%)`,
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: customThemeTokens.ink,
              },
              '& .MuiDataGrid-row': {
                backgroundColor: alpha('#FFFFFF', 0.52),
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: alpha(customThemeTokens.accentLight, 0.32),
              },
              '& .MuiDataGrid-cell': {
                borderColor: alpha(customThemeTokens.accent, 0.08),
              },
              '[data-mui-color-scheme="dark"] &': {
                color: '#F8FBFF',
                borderColor: alpha(customThemeTokens.accentBright, 0.26),
                background: alpha('#07122E', 0.58),
                boxShadow: `0 0 22px ${alpha(
                  customThemeTokens.accentBright,
                  0.18,
                )}, inset 0 1px 0 ${alpha('#FFFFFF', 0.14)}`,
                '--DataGrid-rowBorderColor': alpha(customThemeTokens.accentBright, 0.14),
                '& .MuiDataGrid-columnHeaders, & .MuiDataGrid-topContainer': {
                  color: '#F8FBFF',
                  borderColor: alpha(customThemeTokens.accentBright, 0.16),
                  background: `linear-gradient(180deg, ${alpha(
                    customThemeTokens.accent,
                    0.18,
                  )} 0%, ${alpha('#061226', 0.62)} 100%)`,
                },
                '& .MuiDataGrid-columnHeader': {
                  background: `linear-gradient(180deg, ${alpha(
                    customThemeTokens.accent,
                    0.14,
                  )} 0%, ${alpha('#061226', 0.42)} 100%)`,
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                  color: '#F8FBFF',
                },
                '& .MuiDataGrid-row': {
                  backgroundColor: alpha('#061226', 0.38),
                },
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: alpha(customThemeTokens.accent, 0.18),
                },
                '& .MuiDataGrid-cell': {
                  borderColor: alpha(customThemeTokens.accentBright, 0.14),
                },
              },
            },
          ]}
        />
      </Box>
    </Paper>
  );
}

function ThemedPreviewCarousel({ custom, previewId, setPreviewId }: ThemedPreviewCarouselProps) {
  const selectedPreviewIndex = previewItems.findIndex((item) => item.id === previewId);

  const handlePrevious = () => {
    setPreviewId(
      previewItems[(selectedPreviewIndex - 1 + previewItems.length) % previewItems.length].id,
    );
  };

  const handleNext = () => {
    setPreviewId(previewItems[(selectedPreviewIndex + 1) % previewItems.length].id);
  };

  let preview = <ThemedComposedChart custom={custom} />;

  if (previewId === 'dataGrid') {
    preview = <ThemedMiniDataGrid custom={custom} />;
  }

  if (previewId === 'scheduler') {
    preview = <ThemedSchedulerPreview custom={custom} />;
  }

  return (
    <div>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          mb: 1.25,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          role="tablist"
          aria-label="Themed component preview"
          sx={[
            {
              display: 'inline-flex',
              p: 0.375,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 999,
              bgcolor: 'background.paper',
            },
            custom && {
              borderColor: alpha(customThemeTokens.accent, 0.14),
              background: alpha('#FFFFFF', 0.54),
              backdropFilter: 'blur(14px) saturate(180%)',
              boxShadow: `0 16px 34px ${alpha(customThemeTokens.accentDark, 0.1)}, inset 0 0 0 1px ${alpha(
                '#FFFFFF',
                0.48,
              )}`,
              '[data-mui-color-scheme="dark"] &': {
                borderColor: alpha(customThemeTokens.accentBright, 0.28),
                background: alpha('#07122E', 0.56),
                boxShadow: `0 0 18px ${alpha(
                  customThemeTokens.accentBright,
                  0.2,
                )}, inset 0 0 0 1px ${alpha('#FFFFFF', 0.12)}`,
              },
            },
          ]}
        >
          {previewItems.map((item) => {
            const selected = item.id === previewId;

            return (
              <Box
                key={item.id}
                component="button"
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setPreviewId(item.id)}
                sx={[
                  {
                    font: 'inherit',
                    border: 0,
                    borderRadius: 999,
                    px: 1.25,
                    py: 0.625,
                    color: selected ? 'primary.main' : 'text.secondary',
                    bgcolor: selected ? 'action.selected' : 'transparent',
                    fontSize: 13,
                    fontWeight: 700,
                    lineHeight: 1,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    outline: 0,
                    '&:focus-visible': {
                      boxShadow: `0 0 0 3px ${alpha('#1976d2', 0.18)}`,
                    },
                  },
                  custom && {
                    '&:focus-visible': {
                      boxShadow: `0 0 0 3px ${alpha(customThemeTokens.accent, 0.16)}`,
                    },
                    '[data-mui-color-scheme="dark"] &': {
                      color: alpha('#DDEBFF', 0.72),
                    },
                  },
                  custom &&
                    selected && {
                      color: customThemeTokens.accentDark,
                      background: `linear-gradient(135deg, ${alpha(
                        customThemeTokens.accentLight,
                        0.68,
                      )} 0%, ${alpha('#FFFFFF', 0.56)} 48%, ${alpha(
                        customThemeTokens.violetLight,
                        0.58,
                      )} 100%)`,
                      boxShadow: `0 8px 18px ${alpha(
                        customThemeTokens.accent,
                        0.14,
                      )}, inset 0 0 0 1px ${alpha(customThemeTokens.accent, 0.16)}`,
                      '[data-mui-color-scheme="dark"] &': {
                        color: '#F8FBFF',
                        background: `linear-gradient(135deg, ${alpha(
                          customThemeTokens.accent,
                          0.34,
                        )} 0%, ${alpha('#FFFFFF', 0.08)} 48%, ${alpha(
                          customThemeTokens.violet,
                          0.24,
                        )} 100%)`,
                        boxShadow: `0 0 18px ${alpha(
                          customThemeTokens.accentBright,
                          0.32,
                        )}, inset 0 0 0 1px ${alpha(customThemeTokens.accentBright, 0.28)}`,
                      },
                      '&:focus-visible': {
                        boxShadow: `0 0 0 3px ${alpha(
                          customThemeTokens.accent,
                          0.16,
                        )}, 0 8px 18px ${alpha(
                          customThemeTokens.accent,
                          0.14,
                        )}, inset 0 0 0 1px ${alpha(customThemeTokens.accent, 0.16)}`,
                      },
                    },
                ]}
              >
                {item.label}
              </Box>
            );
          })}
        </Box>

        <Stack direction="row" spacing={0.75}>
          <IconButton
            size="small"
            aria-label="Previous preview"
            onClick={handlePrevious}
            sx={[
              {
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              },
              custom && {
                borderColor: alpha(customThemeTokens.accent, 0.14),
                background: alpha('#FFFFFF', 0.54),
                backdropFilter: 'blur(14px) saturate(180%)',
                boxShadow: `0 10px 22px ${alpha(customThemeTokens.accentDark, 0.08)}`,
                '[data-mui-color-scheme="dark"] &': {
                  color: '#DDEBFF',
                  borderColor: alpha(customThemeTokens.accentBright, 0.28),
                  background: alpha('#07122E', 0.56),
                  boxShadow: `0 0 16px ${alpha(customThemeTokens.accentBright, 0.18)}`,
                },
              },
            ]}
          >
            <KeyboardArrowLeftRoundedIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            aria-label="Next preview"
            onClick={handleNext}
            sx={[
              {
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.paper',
              },
              custom && {
                borderColor: alpha(customThemeTokens.accent, 0.14),
                background: alpha('#FFFFFF', 0.54),
                backdropFilter: 'blur(14px) saturate(180%)',
                boxShadow: `0 10px 22px ${alpha(customThemeTokens.accentDark, 0.08)}`,
                '[data-mui-color-scheme="dark"] &': {
                  color: '#DDEBFF',
                  borderColor: alpha(customThemeTokens.accentBright, 0.28),
                  background: alpha('#07122E', 0.56),
                  boxShadow: `0 0 16px ${alpha(customThemeTokens.accentBright, 0.18)}`,
                },
              },
            ]}
          >
            <KeyboardArrowRightRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
      {preview}
    </div>
  );
}

function CustomThemePreview({
  previewId,
  setPreviewId,
}: Pick<ThemedPreviewCarouselProps, 'previewId' | 'setPreviewId'>) {
  return (
    <ThemeProvider theme={customChartsTheme}>
      <ThemedPreviewCarousel custom previewId={previewId} setPreviewId={setPreviewId} />
    </ThemeProvider>
  );
}

function MaterialThemePreview({
  previewId,
  setPreviewId,
}: Pick<ThemedPreviewCarouselProps, 'previewId' | 'setPreviewId'>) {
  return (
    <CssVarsProvider theme={materialPreviewTheme} forceThemeRerender>
      <ThemedPreviewCarousel custom={false} previewId={previewId} setPreviewId={setPreviewId} />
    </CssVarsProvider>
  );
}

export default function XTheming() {
  const [customized, setCustomized] = React.useState(true);
  const [previewId, setPreviewId] = React.useState<PreviewItemId>('charts');

  return (
    <Section bg="gradient">
      <Grid container spacing={2}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Theming"
            title={
              <Typography variant="h2">
                Advanced and <GradientText>beautiful</GradientText>
              </Typography>
            }
            description="Use sophisticated theming features to make your components look exactly how you want."
          />
          <Group sx={{ m: -2, p: 2 }}>
            <Highlighter disableBorder selected={customized} onClick={() => setCustomized(true)}>
              <Item
                icon={<TwinkleIcon />}
                title="Custom theme"
                description="Theming allows you to use your brand's design tokens, easily making the components reflect its look and feel."
              />
            </Highlighter>
            <Highlighter disableBorder selected={!customized} onClick={() => setCustomized(false)}>
              <Item
                icon={<SvgMaterialDesignIcon />}
                title="Material Design"
                description="Every component comes with Google's tried-and-tested design system, built-in and ready for use."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {customized ? (
            <CustomThemePreview previewId={previewId} setPreviewId={setPreviewId} />
          ) : (
            <MaterialThemePreview previewId={previewId} setPreviewId={setPreviewId} />
          )}
        </Grid>
      </Grid>
    </Section>
  );
}
