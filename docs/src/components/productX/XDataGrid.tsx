import * as React from 'react';
import {
  DataGridPremium,
  GridAiAssistantPanel,
  GridChartsIntegrationContextProvider,
  GridChartsPanel,
  GridChartsRendererProxy,
  GridPreferencePanelsValue,
  useGridApiRef,
} from '@mui/x-data-grid-premium';
import type {
  Conversation,
  GridCellSelectionModel,
  GridColDef,
  GridInitialState,
  GridPivotModel,
  GridRowId,
  GridValidRowModel,
  PromptResponse,
} from '@mui/x-data-grid-premium';
import { useDemoData } from '@mui/x-data-grid-generator';
import type { GridDemoData } from '@mui/x-data-grid-generator';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import LibraryAddCheckRounded from '@mui/icons-material/LibraryAddCheckRounded';
import SortByAlphaRounded from '@mui/icons-material/SortByAlphaRounded';
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined';
import FilterAltRounded from '@mui/icons-material/FilterAltRounded';
import PivotTableChartRoundedIcon from '@mui/icons-material/PivotTableChartRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { BarChart } from '@mui/x-charts/BarChart';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';
import { Link } from '@mui/internal-core-docs/Link';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import {
  Item,
  Group,
  Highlighter,
  More,
  Frame,
  AppearingInfoBox,
} from '@mui/internal-core-docs/AppLayout';
import FlashCode from 'docs/src/components/animation/FlashCode';
import { ShowcaseCodeWrapper } from 'docs/src/components/home/ShowcaseContainer';
import XGridGlobalStyles from 'docs/src/components/home/XGridGlobalStyles';

import { ROUTES } from '@mui/internal-core-docs/constants';

const DEMOS = [
  'Editing',
  'Filtering',
  'Sorting',
  'Pagination',
  'Cell range selection',
  'Pivoting',
  'Charts Integration',
  'AI Assistant',
] as const;

const aiAssistantPrompt = 'Order companies by amount of people';
const chartsIntegrationChartId = 'landing-page-chart';
const chartsIntegrationColumnOrder = ['rating', 'name', 'avatar', 'company'];
const cellRangeSelectionFields = ['name', 'website', 'rating'] as const;
const pivotRevenueRegions = ['North America', 'Europe', 'APAC', 'LATAM'] as const;
const pivotRevenueQuarters = ['Q1', 'Q2', 'Q3', 'Q4'] as const;

interface PivotRevenueRow extends GridValidRowModel {
  region: (typeof pivotRevenueRegions)[number];
  quarter: (typeof pivotRevenueQuarters)[number];
  revenue: number;
}

const pivotDemoModel: GridPivotModel = {
  rows: [{ field: 'region' }],
  columns: [{ field: 'quarter' }],
  values: [{ field: 'revenue', aggFunc: 'sum' }],
};

const pivotRevenueColumns: GridColDef[] = [
  {
    field: 'region',
    headerName: 'Region',
    width: 150,
    aggregable: false,
  },
  {
    field: 'quarter',
    headerName: 'Quarter',
    width: 100,
    type: 'singleSelect',
    valueOptions: [...pivotRevenueQuarters],
    aggregable: false,
  },
  {
    field: 'revenue',
    headerName: 'Revenue',
    width: 130,
    type: 'number',
    availableAggregationFunctions: ['sum', 'avg', 'min', 'max'],
    valueFormatter: (value) => {
      const revenue = Number(value);

      return Number.isFinite(revenue) ? `$${Math.round(revenue / 1000)}k` : '';
    },
  },
];

const pivotGroupingColDef = { width: 146 };
const pivotingColDef = () => ({ width: 90 });

const aiAssistantResponse: PromptResponse = {
  conversationId: 'landing-page-ai-assistant',
  select: -1,
  filters: [],
  aggregation: {
    id: 'size',
  },
  sorting: [
    {
      column: 'id',
      direction: 'desc',
    },
  ],
  grouping: [
    {
      column: 'company',
    },
  ],
  pivoting: {},
  chart: null,
};

const aiAssistantConversations: Conversation[] = [
  {
    id: aiAssistantResponse.conversationId,
    title: aiAssistantPrompt,
    prompts: [
      {
        value: aiAssistantPrompt,
        createdAt: new Date('2026-01-12T10:00:00Z'),
        response: aiAssistantResponse,
        variant: 'success',
        helperText: '',
      },
    ],
  },
];

const dataGridInitialState: GridInitialState = {
  pivoting: {
    model: pivotDemoModel,
  },
  chartsIntegration: {
    activeChartId: chartsIntegrationChartId,
    charts: {
      [chartsIntegrationChartId]: {
        dimensions: ['company'],
        values: ['rating'],
        chartType: 'bar',
      },
    },
  },
  aiAssistant: {
    conversations: aiAssistantConversations,
  },
};

const communityCode = `<DataGrid
  columns={[ // column definition example
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      sortable: true,
      filterable: true,
    },
  ]}
  checkboxSelection
  disableRowSelectionOnClick
  pagination
  showToolbar
/>`;

const cellRangeSelectionCode = `<DataGridPremium
  columns={columns}
  rows={rows}
  cellSelection
  cellSelectionModel={{
    2: { name: true, website: true, rating: true },
    3: { name: true, website: true, rating: true },
    4: { name: true, website: true, rating: true },
  }}
/>`;

const pivotingCode = `<DataGridPremium
  columns={columns}
  rows={rows}
  showToolbar
  initialState={{
    pivoting: {
      model: {
        rows: [{ field: 'region' }],
        columns: [{ field: 'quarter' }],
        values: [{ field: 'revenue', aggFunc: 'sum' }],
      },
    },
  }}
/>`;

const chartsIntegrationCode = `<GridChartsIntegrationContextProvider>
  <DataGridPremium
    columns={columns}
    rows={rows}
    showToolbar
    chartsIntegration
    initialState={{
      chartsIntegration: {
        activeChartId: 'rating-by-company',
        charts: {
          'rating-by-company': {
            dimensions: ['company'],
            values: ['rating'],
            chartType: 'bar',
          },
        },
      },
    }}
    slots={{ chartsPanel: GridChartsPanel }}
  />
  <GridChartsRendererProxy
    id="rating-by-company"
    renderer={ChartPopover}
  />
</GridChartsIntegrationContextProvider>`;

const aiAssistantCode = `<DataGridPremium
  columns={columns}
  rows={rows}
  showToolbar
  aiAssistant
  initialState={{
    aiAssistant: {
      conversations: initialConversations,
    },
  }}
  slots={{ aiAssistantPanel: GridAiAssistantPanel }}
  onPrompt={handlePrompt}
/>`;

const codeByDemo: Record<(typeof DEMOS)[number], string> = {
  [DEMOS[0]]: communityCode,
  [DEMOS[1]]: communityCode,
  [DEMOS[2]]: communityCode,
  [DEMOS[3]]: communityCode,
  [DEMOS[4]]: cellRangeSelectionCode,
  [DEMOS[5]]: pivotingCode,
  [DEMOS[6]]: chartsIntegrationCode,
  [DEMOS[7]]: aiAssistantCode,
};

const startLine: Partial<Record<(typeof DEMOS)[number], number>> = {
  [DEMOS[0]]: 6,
  [DEMOS[1]]: 8,
  [DEMOS[2]]: 7,
  [DEMOS[3]]: 13,
  [DEMOS[4]]: 4,
  [DEMOS[5]]: 5,
  [DEMOS[6]]: 6,
  [DEMOS[7]]: 5,
};

const toolbarFeatureSelector: Partial<Record<(typeof DEMOS)[number], string>> = {
  [DEMOS[1]]: '[aria-label="Filters"]',
  [DEMOS[5]]: '[aria-label="Pivot"]',
  [DEMOS[6]]: '[aria-label="Charts"]',
  [DEMOS[7]]: '[aria-label="AI Assistant"]',
};

const dataGridStyleOverrides = <XGridGlobalStyles selector="#data-grid-demo" pro />;
const filterPanelPopperSx = {
  '&.MuiDataGrid-panel': {
    width: 'min(560px, calc(100vw - 32px))',
  },
  '& .MuiDataGrid-paper': {
    maxWidth: '100%',
    overflow: 'hidden',
  },
  '& .MuiDataGrid-panelWrapper': {
    width: '100%',
  },
  '& .MuiDataGrid-panelContent': {
    p: '14px 16px 12px 12px',
  },
  '& .MuiDataGrid-filterForm': {
    width: '100%',
    alignItems: 'center',
    gap: 1.25,
  },
  '& .MuiDataGrid-filterFormDeleteIcon': {
    flex: '0 0 32px',
    justifyContent: 'flex-start',
  },
  '& .MuiDataGrid-filterFormColumnInput': {
    width: 128,
  },
  '& .MuiDataGrid-filterFormOperatorInput': {
    width: 128,
  },
  '& .MuiDataGrid-filterFormValueInput': {
    flex: '1 1 168px',
    minWidth: 0,
  },
  '& .MuiDataGrid-filterFormValueInput .MuiFormControl-root': {
    width: '100%',
  },
  '& .MuiDataGrid-panelFooter': {
    px: 2,
    py: 1.25,
  },
} as const;
const aiAssistantPanelPopperSx = {
  '& .MuiDataGrid-aiAssistantPanel': {
    display: 'flex',
    boxSizing: 'border-box',
    width: 'min(360px, calc(100vw - 16px))',
    height: 276,
  },
  '& .MuiDataGrid-aiAssistantPanelBody': {
    alignItems: 'stretch',
    flex: '1 1 auto',
    height: 'auto',
    minHeight: 0,
  },
  '& .MuiDataGrid-aiAssistantPanelConversation': {
    height: '100%',
  },
} as const;

interface DataGridChartsRendererProps {
  dimensions: Array<{
    data?: Array<string | number | null>;
    label?: string;
  }>;
  values: Array<{
    data?: Array<number | null>;
    label?: string;
  }>;
  visible?: boolean;
}

function getShortChartLabel(value: string | number | null) {
  const label = `${value ?? ''}`;

  return label.length > 10 ? `${label.slice(0, 10)}...` : label;
}

function DataGridChartsRenderer({ dimensions, values, visible }: DataGridChartsRendererProps) {
  const dimension = dimensions[0];
  const value = values[0];
  const labels = (dimension?.data ?? []).slice(0, 6).map(getShortChartLabel);
  const seriesData = (value?.data ?? []).slice(0, labels.length);

  if (!visible || labels.length === 0 || seriesData.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'absolute',
        top: 50,
        right: 12,
        zIndex: 2,
        width: { xs: 'calc(100% - 24px)', sm: 320 },
        height: 214,
        p: 1.25,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        bgcolor: 'background.paper',
        pointerEvents: 'none',
        boxShadow: (theme) =>
          `0 20px 40px ${theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.46)' : 'rgba(15, 23, 42, 0.18)'}`,
      }}
    >
      <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 700 }}>
        {value?.label ?? 'Rating'} by {dimension?.label ?? 'company'}
      </Typography>
      <BarChart
        series={[{ data: seriesData, label: value?.label ?? 'Rating' }]}
        xAxis={[
          {
            data: labels,
            scaleType: 'band',
            height: 28,
            tickLabelStyle: { fontSize: 10 },
          },
        ]}
        yAxis={[{ width: 28 }]}
        height={172}
        margin={{ left: 0, right: 8, top: 18, bottom: 0 }}
        grid={{ horizontal: true }}
        borderRadius={4}
        colors={['#1976d2']}
        hideLegend
      />
    </Paper>
  );
}

interface XDataGridDemoProps {
  cellRangeFocusId: GridRowId | undefined;
  cellRangeSelectionModel: GridCellSelectionModel;
  data: GridDemoData;
  demo: (typeof DEMOS)[number] | null;
  gridColumns: GridColDef[];
  gridRows: PivotRevenueRow[];
  loading: boolean;
}

function XDataGridDemo({
  cellRangeFocusId,
  cellRangeSelectionModel,
  data,
  demo,
  gridColumns,
  gridRows,
  loading,
}: XDataGridDemoProps) {
  const [filterPanelTarget, setFilterPanelTarget] = React.useState<HTMLElement | null>(null);
  const gridApiRef = useGridApiRef();
  const handlePrompt = React.useCallback(async () => aiAssistantResponse, []);
  const firstRowId = gridRows[0]?.id;

  React.useEffect(() => {
    const panelAnchor = document.querySelector<HTMLElement>(
      '#data-grid-demo [data-id="gridPanelAnchor"]',
    );

    setFilterPanelTarget(panelAnchor);
  }, [loading]);

  React.useEffect(() => {
    if (!gridApiRef || !gridApiRef.current || loading) {
      return undefined;
    }

    const timeoutIds: Array<ReturnType<typeof setTimeout>> = [];
    const scheduleDemoAction = (callback: () => void, delay = 120) => {
      timeoutIds.push(setTimeout(callback, delay));
    };
    const isCellRangeSelectionDemo = demo === DEMOS[4];
    const isPivotingDemo = demo === DEMOS[5];
    const isChartsIntegrationDemo = demo === DEMOS[6];
    const isAiAssistantDemo = demo === DEMOS[7];

    if (demo) {
      gridApiRef.current.scroll({ top: 0, left: 0 });
    }
    if (!isCellRangeSelectionDemo) {
      gridApiRef.current.setCellSelectionModel({});
    }
    if (!isAiAssistantDemo) {
      gridApiRef.current.hidePreferences();
      gridApiRef.current.setRowGroupingModel([]);
      gridApiRef.current.setAggregationModel({});
      gridApiRef.current.setSortModel([]);
    }
    if (!isChartsIntegrationDemo) {
      gridApiRef.current.hideSidebar();
    }
    if (demo === DEMOS[0]) {
      document.body.focus();
      scheduleDemoAction(() => {
        const cell = document.querySelector('#data-grid-demo div[role="cell"][data-field="name"]');
        if (cell) {
          const clickEvent = document.createEvent('MouseEvents');
          clickEvent.initEvent('dblclick', true, true);
          cell.dispatchEvent(clickEvent);
        }
      });
    }
    if (isCellRangeSelectionDemo) {
      document.body.focus();
      gridApiRef.current.setCellSelectionModel(cellRangeSelectionModel);
      if (cellRangeFocusId) {
        gridApiRef.current.setCellFocus(cellRangeFocusId, 'website');
      }
    }
    if (demo === DEMOS[2]) {
      scheduleDemoAction(() => {
        const sorter = document.querySelector(
          '#data-grid-demo button[aria-label="Sort"]',
        ) as HTMLButtonElement | null;
        if (sorter) {
          sorter.click();
        }
      });
    }
    if (demo === DEMOS[3]) {
      scheduleDemoAction(() => {
        const nextPage = document.querySelector(
          '#data-grid-demo button[aria-label="Go to next page"]',
        ) as HTMLButtonElement | null;
        if (nextPage) {
          nextPage.click();
        }
      });
    }
    if (demo === DEMOS[1]) {
      document.body.focus();
      gridApiRef.current.showFilterPanel('name');
    }
    if (isPivotingDemo) {
      document.body.focus();
      gridApiRef.current.hidePreferences();
      gridApiRef.current.hideSidebar();
    }
    if (isChartsIntegrationDemo) {
      document.body.focus();
      gridApiRef.current.hidePreferences();
      gridApiRef.current.setActiveChartId(chartsIntegrationChartId);
      gridApiRef.current.updateChartDimensionsData(chartsIntegrationChartId, [
        { field: 'company' },
      ]);
      gridApiRef.current.updateChartValuesData(chartsIntegrationChartId, [{ field: 'rating' }]);
      gridApiRef.current.hideSidebar();
      scheduleDemoAction(() => {
        gridApiRef.current?.setChartType(chartsIntegrationChartId, 'bar');
        gridApiRef.current?.hideSidebar();
      }, 0);
    }
    if (isAiAssistantDemo) {
      document.body.focus();
      gridApiRef.current.setRowGroupingModel(
        aiAssistantResponse.grouping.map((group) => group.column),
      );
      gridApiRef.current.setAggregationModel(aiAssistantResponse.aggregation);
      gridApiRef.current.setSortModel(
        aiAssistantResponse.sorting.map((sort) => ({
          field: sort.column,
          sort: sort.direction,
        })),
      );
      gridApiRef.current.showPreferences(GridPreferencePanelsValue.aiAssistant);
    }

    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [demo, loading, firstRowId, gridApiRef, cellRangeSelectionModel, cellRangeFocusId]);

  return (
    <GridChartsIntegrationContextProvider>
      <DataGridPremium
        {...data}
        rows={gridRows}
        columns={gridColumns}
        apiRef={gridApiRef}
        loading={loading}
        density="compact"
        checkboxSelection={demo !== DEMOS[5]}
        disableRowSelectionOnClick
        pagination
        showToolbar
        cellSelection
        initialState={dataGridInitialState}
        chartsIntegration
        aiAssistant
        pivotActive={demo === DEMOS[5]}
        pivotModel={pivotDemoModel}
        groupingColDef={demo === DEMOS[5] ? pivotGroupingColDef : undefined}
        pivotingColDef={demo === DEMOS[5] ? pivotingColDef : undefined}
        slots={{
          aiAssistantPanel: GridAiAssistantPanel,
          chartsPanel: GridChartsPanel,
        }}
        slotProps={{
          panel:
            demo === DEMOS[1] && filterPanelTarget
              ? {
                  target: filterPanelTarget,
                  flip: false,
                }
              : undefined,
          basePopper: {
            material: {
              sx: [demo === DEMOS[1] ? filterPanelPopperSx : {}, aiAssistantPanelPopperSx],
            },
          },
        }}
        onPrompt={handlePrompt}
      />
      <GridChartsRendererProxy
        id={chartsIntegrationChartId}
        label="Rating by company"
        renderer={(props) => <DataGridChartsRenderer {...props} visible={demo === DEMOS[6]} />}
      />
    </GridChartsIntegrationContextProvider>
  );
}

export default function XDataGrid() {
  const [demo, setDemo] = React.useState<(typeof DEMOS)[number] | null>(null);
  const gridStateKey = demo ?? 'overview';
  const activeCode = demo ? codeByDemo[demo] : communityCode;
  const activeToolbarFeatureSelector = demo ? toolbarFeatureSelector[demo] : undefined;
  const icons = {
    [DEMOS[0]]: <EditRoundedIcon fontSize="small" />,
    [DEMOS[1]]: <FilterAltRounded fontSize="small" />,
    [DEMOS[2]]: <SortByAlphaRounded fontSize="small" />,
    [DEMOS[3]]: <AutoStoriesOutlined fontSize="small" />,
    [DEMOS[4]]: <LibraryAddCheckRounded fontSize="small" />,
    [DEMOS[5]]: <PivotTableChartRoundedIcon fontSize="small" />,
    [DEMOS[6]]: <BarChartRoundedIcon fontSize="small" />,
    [DEMOS[7]]: <AutoAwesomeRoundedIcon fontSize="small" />,
  };
  const { loading, data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 1000,
    maxColumns: 12,
    editable: true,
  });
  const gridRows = React.useMemo<PivotRevenueRow[]>(
    () =>
      data.rows.map((row, index) => {
        const regionIndex = index % pivotRevenueRegions.length;
        const quarterIndex =
          Math.floor(index / pivotRevenueRegions.length) % pivotRevenueQuarters.length;
        const region = pivotRevenueRegions[regionIndex];
        const quarter = pivotRevenueQuarters[quarterIndex];
        const revenue = 42000 + regionIndex * 18000 + quarterIndex * 12000 + (index % 7) * 3500;

        return {
          ...row,
          region,
          quarter,
          revenue,
        };
      }),
    [data.rows],
  );
  const gridColumns = React.useMemo(() => {
    const columns = [...data.columns, ...pivotRevenueColumns];

    if (demo !== DEMOS[6]) {
      return columns;
    }

    const orderedColumns = chartsIntegrationColumnOrder
      .map((field) => columns.find((column) => column.field === field))
      .filter((column): column is GridColDef => Boolean(column));

    return [
      ...orderedColumns,
      ...columns.filter((column) => !chartsIntegrationColumnOrder.includes(column.field)),
    ];
  }, [data.columns, demo]);
  const cellRangeSelectionModel = React.useMemo<GridCellSelectionModel>(() => {
    const selectedCells: GridCellSelectionModel = {};
    gridRows.slice(3, 6).forEach((row) => {
      selectedCells[row.id] = {};
      cellRangeSelectionFields.forEach((field) => {
        selectedCells[row.id][field] = true;
      });
    });
    return selectedCells;
  }, [gridRows]);
  const cellRangeFocusId = gridRows[4]?.id;

  return (
    <Section cozy>
      <Grid container spacing={2}>
        <Grid sx={{ minWidth: 0 }} size={{ md: 6 }}>
          <SectionHeadline
            overline="Data Grid"
            title={
              <Typography variant="h2">
                Support data management and analysis with{' '}
                <GradientText>performance and quality</GradientText>
              </Typography>
            }
            description="The MUI X Data Grid is a data table powerhouse. It is packed with exclusive features that will enrich the experience of dealing with and maintaining lots of data."
          />
          <Group desktopColumns={2} sx={{ m: -2, p: 2 }}>
            {DEMOS.map((name) => (
              <Highlighter key={name} selected={name === demo} onClick={() => setDemo(name)}>
                <Item icon={icons[name]} title={name} />
              </Highlighter>
            ))}
            <More href={ROUTES.dataGridFeatures} />
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper
            id="data-grid-demo"
            variant="outlined"
            sx={[
              {
                position: 'relative',
                zIndex: 1,
                height: 320,
                borderRadius: '10px 10px 0 0',
                '&#data-grid-demo .MuiDataGrid-root .MuiDataGrid-toolbar .MuiIconButton-root:not(.Mui-disabled)':
                  {
                    color: 'grey.600',
                    borderColor: 'divider',
                  },
                '&#data-grid-demo .MuiDataGrid-root .MuiDataGrid-toolbar .MuiIconButton-root:not(.Mui-disabled):hover':
                  {
                    color: 'primary.main',
                    bgcolor: 'action.hover',
                  },
                '& .MuiDataGrid-root': {
                  '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 14, fontWeight: 'bold' },
                  '& .MuiDataGrid-footerContainer': {
                    minHeight: 48,
                    borderTop: '1px solid',
                    borderColor: 'grey.200',
                  },
                  '& .MuiTablePagination-root': {
                    fontSize: '0.75rem',
                    '& p': {
                      fontSize: '0.75rem',
                    },
                    '& .MuiToolbar-root': {
                      minHeight: 48,
                    },
                  },
                },
              },
              (theme) =>
                theme.applyDarkStyles({
                  borderColor: 'divider',
                  '&#data-grid-demo .MuiDataGrid-root .MuiDataGrid-toolbar .MuiIconButton-root:not(.Mui-disabled)':
                    {
                      color: 'grey.300',
                      borderColor: 'primaryDark.600',
                    },
                  '&#data-grid-demo .MuiDataGrid-root .MuiDataGrid-toolbar .MuiIconButton-root:not(.Mui-disabled):hover':
                    {
                      color: 'primary.300',
                      bgcolor: 'primaryDark.700',
                    },
                  '& .MuiDataGrid-root': {
                    '& .MuiDataGrid-footerContainer': {
                      borderColor: 'primaryDark.600',
                    },
                  },
                }),
              activeToolbarFeatureSelector
                ? (theme) => ({
                    [`&#data-grid-demo .MuiDataGrid-root .MuiDataGrid-toolbar .MuiIconButton-root${activeToolbarFeatureSelector}:not(.Mui-disabled)`]:
                      {
                        color: 'primary.main',
                        borderColor: 'primary.200',
                        bgcolor: 'primary.50',
                      },
                    [`&#data-grid-demo .MuiDataGrid-root .MuiDataGrid-toolbar .MuiIconButton-root${activeToolbarFeatureSelector}:not(.Mui-disabled):hover`]:
                      {
                        color: 'primary.main',
                        borderColor: 'primary.300',
                        bgcolor: 'primary.100',
                      },
                    ...theme.applyDarkStyles({
                      [`&#data-grid-demo .MuiDataGrid-root .MuiDataGrid-toolbar .MuiIconButton-root${activeToolbarFeatureSelector}:not(.Mui-disabled)`]:
                        {
                          color: 'primary.300',
                          borderColor: 'primary.700',
                          bgcolor: 'primaryDark.700',
                        },
                      [`&#data-grid-demo .MuiDataGrid-root .MuiDataGrid-toolbar .MuiIconButton-root${activeToolbarFeatureSelector}:not(.Mui-disabled):hover`]:
                        {
                          color: 'primary.200',
                          borderColor: 'primary.600',
                          bgcolor: 'primaryDark.600',
                        },
                    }),
                  })
                : {},
            ]}
          >
            {dataGridStyleOverrides}
            <XDataGridDemo
              key={gridStateKey}
              cellRangeFocusId={cellRangeFocusId}
              cellRangeSelectionModel={cellRangeSelectionModel}
              data={data}
              demo={demo}
              gridColumns={gridColumns}
              gridRows={gridRows}
              loading={loading}
            />
          </Paper>
          <Frame.Info sx={{ p: 0 }}>
            <ShowcaseCodeWrapper maxHeight={220} clip>
              <HighlightedCode copyButtonHidden plainStyle code={activeCode} language="jsx" />
              {demo && startLine[demo] && <FlashCode startLine={startLine[demo]} sx={{ mx: 1 }} />}
              <AppearingInfoBox
                appeared={demo === DEMOS[1] || demo === DEMOS[3] || demo === DEMOS[7]}
              >
                <React.Fragment>
                  <Typography
                    variant="body2"
                    sx={{ color: 'grey.50', fontWeight: 'medium', mb: '4px' }}
                  >
                    {demo === DEMOS[3] && 'Pagination > 100 rows per page is a paid feature!'}
                    {demo === DEMOS[1] && 'Multi-column filtering is a paid feature!'}
                    {demo === DEMOS[7] &&
                      'The AI Assistant helps users apply structured grid changes in natural language.'}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'grey.300' }}>
                    The Data Grid and all other MUI X components are available on free and paid
                    plans. Find more details about each plan and its features are on{' '}
                    <Link href={ROUTES.pricing}>the pricing page</Link>.
                  </Typography>
                </React.Fragment>
              </AppearingInfoBox>
            </ShowcaseCodeWrapper>
          </Frame.Info>
        </Grid>
      </Grid>
    </Section>
  );
}
