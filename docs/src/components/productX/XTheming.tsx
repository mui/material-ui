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

const customChartsTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563EB',
      light: '#93C5FD',
      dark: '#172554',
    },
    secondary: {
      main: '#0F766E',
      light: '#99F6E4',
      dark: '#134E4A',
    },
    warning: {
      main: '#F97316',
      light: '#FDBA74',
      dark: '#9A3412',
    },
    success: {
      main: '#059669',
      light: '#A7F3D0',
      dark: '#065F46',
    },
    text: {
      primary: '#111827',
      secondary: '#667085',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F8FAFC',
    },
    divider: '#E6EAF0',
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
            stroke: alpha('#111827', 0.1),
          },
          [`& .${axisClasses.tick}`]: {
            stroke: alpha('#111827', 0.1),
          },
          [`& .${axisClasses.tickLabel}`]: {
            fill: '#667085',
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
            stroke: alpha('#111827', 0.075),
            strokeDasharray: '4 8',
            strokeWidth: 0.8,
          },
        },
      },
    },
  },
});

const chartMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const subscriptionsData = [38, 44, 42, 48, 52, 59, 63, 68];
const expansionData = [18, 22, 24, 21, 29, 32, 35, 39];
const runRateData = [52, 60, 64, 66, 76, 84, 91, 99];

interface MiniGridRow {
  id: number;
  account: string;
  segment: string;
  revenue: string;
  health: number;
}

const miniGridRows: MiniGridRow[] = [
  { id: 1, account: 'Northwind', segment: 'Enterprise', revenue: '$420K', health: 98 },
  { id: 2, account: 'Contoso', segment: 'Commercial', revenue: '$318K', health: 92 },
  { id: 3, account: 'Tailspin', segment: 'Enterprise', revenue: '$286K', health: 88 },
  { id: 4, account: 'Fabrikam', segment: 'Scale-up', revenue: '$164K', health: 81 },
  { id: 5, account: 'Blue Yonder', segment: 'Commercial', revenue: '$138K', health: 74 },
];

const miniGridColumns: GridColDef<MiniGridRow>[] = [
  { field: 'account', headerName: 'Account', flex: 1, minWidth: 132 },
  { field: 'segment', headerName: 'Segment', width: 122 },
  { field: 'revenue', headerName: 'ARR', width: 86, align: 'right', headerAlign: 'right' },
  {
    field: 'health',
    headerName: 'Health',
    width: 94,
    align: 'right',
    headerAlign: 'right',
    renderCell: (params) => (
      <Box
        component="span"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 46,
          px: 0.75,
          py: 0.25,
          borderRadius: 999,
          color: 'success.dark',
          bgcolor: 'success.light',
          fontSize: 12,
          fontWeight: 700,
          lineHeight: 1.45,
        }}
      >
        {params.value}%
      </Box>
    ),
  },
];

const previewItems = [
  { id: 'charts', label: 'Charts' },
  { id: 'dataGrid', label: 'Data Grid' },
  { id: 'scheduler', label: 'Scheduler' },
] as const;

type PreviewItemId = (typeof previewItems)[number]['id'];

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
  subscriptions: 'linear-gradient(180deg, #2563EB 0%, #93C5FD 100%)',
  expansion: 'linear-gradient(180deg, #F97316 0%, #FDBA74 100%)',
  runRate: 'linear-gradient(90deg, #0F766E 0%, #2563EB 58%, #111827 100%)',
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
      main: '#2563EB',
      light: '#93C5FD',
      dark: '#172554',
    },
    secondary: {
      main: '#0F766E',
      light: '#99F6E4',
      dark: '#134E4A',
    },
    warning: {
      main: '#F97316',
      light: '#FDBA74',
      dark: '#9A3412',
    },
    success: {
      main: '#059669',
      light: '#A7F3D0',
      dark: '#065F46',
    },
    text: {
      primary: '#111827',
      secondary: '#667085',
    },
    background: {
      paper: '#FFFFFF',
      default: '#F8FAFC',
    },
    divider: '#E6EAF0',
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
            stroke: alpha('#111827', 0.1),
          },
          [\`& .\${axisClasses.tickLabel}\`]: {
            fill: '#667085',
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
            stroke: alpha('#111827', 0.075),
            strokeDasharray: '4 8',
            strokeWidth: 0.8,
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
<CssVarsProvider>
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
        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.96} />
        <stop offset="58%" stopColor="#60A5FA" stopOpacity={0.82} />
        <stop offset="100%" stopColor="#BFDBFE" stopOpacity={0.54} />
      </linearGradient>
      <linearGradient id={customGradientIds.expansion} x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#F97316" stopOpacity={0.94} />
        <stop offset="58%" stopColor="#FB923C" stopOpacity={0.76} />
        <stop offset="100%" stopColor="#FED7AA" stopOpacity={0.58} />
      </linearGradient>
      <linearGradient id={customGradientIds.runRate} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="#0F766E" />
        <stop offset="52%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#111827" />
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
        custom && {
          borderRadius: '16px',
          borderColor: alpha('#2563EB', 0.14),
          background: `linear-gradient(180deg, #FFFFFF 0%, ${alpha('#F8FAFC', 0.98)} 100%)`,
          boxShadow: `0 20px 44px ${alpha('#111827', 0.08)}, 0 1px 0 ${alpha(
            '#FFFFFF',
            0.86,
          )} inset`,
        },
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
            background: `linear-gradient(90deg, ${alpha('#EFF6FF', 0.78)} 0%, ${alpha(
              '#FFF7ED',
              0.55,
            )} 100%)`,
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
              color: '#1D4ED8',
              bgcolor: alpha('#FFFFFF', 0.86),
              borderColor: alpha('#2563EB', 0.16),
              boxShadow: `0 1px 2px ${alpha('#111827', 0.06)}`,
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
                background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.64)} 0%, ${alpha(
                  '#EFF6FF',
                  0.42,
                )} 55%, ${alpha('#FFF7ED', 0.42)} 100%)`,
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
                      color: '#111827',
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
                    background: 'linear-gradient(135deg, #047857 0%, #15803D 100%)',
                    boxShadow: `0 8px 18px ${alpha(
                      '#047857',
                      0.22,
                    )}, inset 0 0 0 1px ${alpha('#FFFFFF', 0.22)}`,
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
                  background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.86)} 0%, ${alpha(
                    '#FFFFFF',
                    0.52,
                  )} 100%), repeating-linear-gradient(90deg, transparent 0 68px, ${alpha(
                    '#2563EB',
                    0.035,
                  )} 68px 69px)`,
                  boxShadow: `inset 0 1px 0 ${alpha(
                    '#FFFFFF',
                    0.92,
                  )}, inset 0 0 0 1px ${alpha('#2563EB', 0.06)}`,
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
                      filter: `drop-shadow(0 9px 12px ${alpha('#111827', 0.1)})`,
                      stroke: alpha('#FFFFFF', 0.82),
                      strokeWidth: 0.6,
                    },
                    [`& .${lineClasses.line}`]: {
                      filter: `drop-shadow(0 7px 8px ${alpha('#2563EB', 0.2)})`,
                    },
                    [`& .${lineClasses.mark}`]: {
                      fill: '#FFFFFF',
                      stroke: '#2563EB',
                      strokeWidth: 2.2,
                      filter: `drop-shadow(0 3px 5px ${alpha('#2563EB', 0.22)})`,
                    },
                    [`& .${axisClasses.line}, & .${axisClasses.tick}`]: {
                      stroke: alpha('#111827', 0.1),
                    },
                    [`& .${axisClasses.tickLabel}`]: {
                      fill: '#667085',
                      fontWeight: 600,
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
                  '#EFF6FF',
                  0.44,
                )} 100%)`,
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
                        ? `0 0 0 1px ${alpha('#FFFFFF', 0.7)}, 0 4px 8px ${alpha('#0F172A', 0.08)}`
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
        custom && {
          borderRadius: '16px',
          borderColor: alpha('#2563EB', 0.14),
          background: `linear-gradient(180deg, #FFFFFF 0%, ${alpha('#F8FAFC', 0.98)} 100%)`,
          boxShadow: `0 20px 44px ${alpha('#111827', 0.08)}, 0 1px 0 ${alpha(
            '#FFFFFF',
            0.86,
          )} inset`,
        },
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
            background: `linear-gradient(90deg, ${alpha('#EFF6FF', 0.78)} 0%, ${alpha(
              '#ECFDF5',
              0.62,
            )} 100%)`,
          },
        ]}
      >
        <Box sx={{ minWidth: 0 }}>
          <Typography component="h3" variant="subtitle2" gutterBottom>
            Account health
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 520 }}>
            A compact Data Grid preview using the selected theme.
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
            background: `linear-gradient(145deg, ${alpha('#EFF6FF', 0.78)} 0%, ${alpha(
              '#FFFFFF',
              0.88,
            )} 46%, ${alpha('#FFF7ED', 0.55)} 100%)`,
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
          rowHeight={custom ? 49 : 45}
          columnHeaderHeight={custom ? 50 : 44}
          density={custom ? 'standard' : 'compact'}
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
                borderColor: 'divider',
              },
              '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within':
                {
                  outline: 'none',
                },
            },
            custom && {
              border: `1px solid ${alpha('#2563EB', 0.12)}`,
              borderRadius: '14px',
              overflow: 'hidden',
              background: alpha('#FFFFFF', 0.82),
              boxShadow: `0 16px 36px ${alpha('#0F172A', 0.08)}, inset 0 1px 0 ${alpha(
                '#FFFFFF',
                0.9,
              )}`,
              '--DataGrid-rowBorderColor': alpha('#2563EB', 0.08),
              '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
                px: 2,
              },
              '& .MuiDataGrid-columnHeader': {
                background: `linear-gradient(180deg, ${alpha('#FFFFFF', 0.96)} 0%, ${alpha(
                  '#EFF6FF',
                  0.72,
                )} 100%)`,
              },
              '& .MuiDataGrid-columnHeaderTitle': {
                color: '#1F2937',
              },
              '& .MuiDataGrid-row': {
                backgroundColor: alpha('#FFFFFF', 0.72),
              },
              '& .MuiDataGrid-row:hover': {
                backgroundColor: alpha('#DBEAFE', 0.48),
              },
              '& .MuiDataGrid-cell': {
                borderColor: alpha('#2563EB', 0.08),
              },
            },
          ]}
        />
      </Box>
    </Paper>
  );
}

function ThemedPreviewCarousel({ custom }: { custom: boolean }) {
  const [previewId, setPreviewId] = React.useState<PreviewItemId>('charts');
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
              borderColor: alpha('#2563EB', 0.14),
              background: alpha('#FFFFFF', 0.76),
              boxShadow: `0 12px 24px ${alpha('#111827', 0.07)}`,
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
                  },
                  custom &&
                    selected && {
                      color: '#1D4ED8',
                      background: `linear-gradient(135deg, ${alpha('#DBEAFE', 0.98)} 0%, ${alpha(
                        '#FFFFFF',
                        0.92,
                      )} 100%)`,
                      boxShadow: `0 8px 18px ${alpha('#2563EB', 0.14)}, inset 0 0 0 1px ${alpha(
                        '#2563EB',
                        0.16,
                      )}`,
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
                borderColor: alpha('#2563EB', 0.14),
                background: alpha('#FFFFFF', 0.76),
                boxShadow: `0 8px 18px ${alpha('#111827', 0.06)}`,
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
                borderColor: alpha('#2563EB', 0.14),
                background: alpha('#FFFFFF', 0.76),
                boxShadow: `0 8px 18px ${alpha('#111827', 0.06)}`,
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

function CustomThemePreview() {
  return (
    <ThemeProvider theme={customChartsTheme}>
      <ThemedPreviewCarousel custom />
    </ThemeProvider>
  );
}

function MaterialThemePreview() {
  return (
    <CssVarsProvider>
      <ThemedPreviewCarousel custom={false} />
    </CssVarsProvider>
  );
}

export default function XTheming() {
  const [customized, setCustomized] = React.useState(true);

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
          {customized ? <CustomThemePreview /> : <MaterialThemePreview />}
        </Grid>
      </Grid>
    </Section>
  );
}
