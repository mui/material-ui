import * as React from 'react';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import GradientText from 'docs/src/components/typography/GradientText';
import GetStartedButtons from 'docs/src/components/home/GetStartedButtons';
import HeroContainer from 'docs/src/layouts/HeroContainer';
import IconImage from 'docs/src/components/icon/IconImage';
import FolderTreeView from 'docs/src/components/showcase/FolderTreeView';
import ROUTES from 'docs/src/route';
import { alpha } from '@mui/material/styles';

import {
  DataGridPremium,
  useGridApiRef,
  GridRowGroupingModel,
  GridAggregationModel,
  GridColDef,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid-premium';
import {
  renderEditProgress,
  renderEditStatus,
  renderProgress,
  renderStatus,
  renderTotalPrice,
  useDemoData,
} from '@mui/x-data-grid-generator';
import { STATUS_OPTIONS } from '@mui/x-data-grid-generator/services/static-data';

const startDate = new Date();
startDate.setDate(10);
const endDate = new Date();
endDate.setDate(endDate.getDate() + 28);

export default function XHero() {
  const columns: GridColDef[] = [
    {
      field: 'commodity',
      headerName: 'Commodity',
      width: 180,
    },
    {
      field: 'unitPrice',
      headerName: 'Unit Price',
      type: 'number',

      valueParser: (value: number) => Number(value),
    },
    {
      field: 'feeRate',
      headerName: 'Fee Rate',
      type: 'number',
      width: 80,

      valueParser: (value) => Number(value),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      type: 'number',
      width: 140,
      valueParser: (value: string) => Number(value),
    },
    {
      field: 'filledQuantity',
      headerName: 'Filled Quantity',
      renderCell: renderProgress,
      renderEditCell: renderEditProgress,
      availableAggregationFunctions: ['min', 'max', 'avg', 'size'],
      type: 'number',
      width: 120,
    },
    {
      field: 'isFilled',
      headerName: 'Is Filled',
      align: 'center',
      type: 'boolean',
      width: 80,
    },
    {
      field: 'traderName',
      headerName: 'Trader Name',
      width: 120,
    },
    {
      field: 'status',
      headerName: 'Status',
      renderCell: renderStatus,
      renderEditCell: renderEditStatus,
      type: 'singleSelect',
      valueOptions: STATUS_OPTIONS,
      width: 150,
    },
    {
      field: 'totalPrice',
      headerName: 'Total in USD',
      valueGetter: ({ row }) =>
        row.feeRate == null || row.quantity == null || row.unitPrice == null
          ? null
          : row.feeRate + row.quantity * row.unitPrice,
      renderCell: renderTotalPrice,
      type: 'number',
      width: 160,
    },
  ];
  const { loading, data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10000,
    maxColumns: 40,
    editable: true,
  });
  const [columnVisibilityModel, setColumnVisibilityModel] =
    React.useState<GridColumnVisibilityModel>({
      commodity: false,
    });
  const [rowGroupingModel, setRowGroupingModel] = React.useState<GridRowGroupingModel>([
    'commodity',
  ]);
  const [aggregationModel, setAggregationModel] = React.useState<GridAggregationModel>({
    quantity: 'sum',
    unitPrice: 'avg',
    feeRate: 'min',
    totalPrice: 'max',
  });
  const apiRef = useGridApiRef();
  let rowGroupingCounter = 0;
  return (
    <HeroContainer
      left={
        <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          <Typography
            fontWeight="bold"
            variant="body2"
            sx={(theme) => ({
              color: 'primary.600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: { xs: 'center', md: 'flex-start' },
              '& > *': { mr: 1 },
              ...theme.applyDarkStyles({
                color: 'primary.400',
              }),
            })}
          >
            <IconImage width={28} height={28} name="product-advanced" /> MUI X
          </Typography>
          <Typography variant="h1" sx={{ my: 2, maxWidth: 500 }}>
            Performant
            <br />
            <GradientText>advanced</GradientText>
            <br /> components
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 500 }}>
            Build complex and data-rich applications using a growing list of advanced React
            components. We&apos;re kicking it off with the most powerful Data Grid on the market.
          </Typography>
          <GetStartedButtons
            installation="npm install @mui/x-data-grid"
            to={ROUTES.dataGridDocs}
            sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
          />
        </Box>
      }
      rightSx={{
        p: { md: 2, lg: 3, xl: 4 },
        overflow: 'hidden', // the components on the Hero section are mostly illustrative, even though they're interactive. That's why scrolling is disabled.
      }}
      right={
        <React.Fragment>
          <Paper
            sx={(theme) => ({
              backgroundColor: '#fff',
              border: '1px solid',
              borderColor: 'grey.200',
              boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
              mb: { md: 2, lg: 3, xl: 4 },
              ...theme.applyDarkStyles({
                backgroundColor: 'primaryDark.800',
                borderColor: 'primaryDark.600',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
              }),
            })}
          >
            <Box
              sx={(theme) => ({
                textAlign: 'center',
                py: 1.5,
                position: 'relative',
                borderRadius: 0,
                borderBottom: '1px solid',
                borderColor: 'grey.200',
                ...theme.applyDarkStyles({
                  borderColor: 'primaryDark.600',
                }),
              })}
            >
              <Typography fontWeight={500}>Trades, March 2023</Typography>
            </Box>
            <Box
              sx={[
                {
                  height: { md: 300, xl: 370 },
                  '& .MuiDataGrid-root': {
                    borderRadius: 1,
                    border: 0,
                    color: 'text.secondary',
                    '& .MuiCheckbox-root': {
                      p: 0.5,
                      '& > svg': {
                        fontSize: '1.25rem',
                      },
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      borderBottom: '1px solid',
                      borderColor: 'grey.200',
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                      padding: 0,
                      color: 'text.primary',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      flexGrow: 1,
                      fontSize: '0.875rem',
                    },
                    '& button, & button > svg': {
                      fontSize: 16,
                    },
                    '& .MuiDataGrid-cell': {
                      fontSize: '0.875rem',
                      color: 'text.secondary',
                      borderBottom: '1px solid',
                      borderColor: 'grey.200',
                    },
                    '& .MuiDataGrid-viewport': {
                      '& .MuiDataGrid-cell': {
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '0.875rem',
                        px: 0.5,
                      },
                    },
                    '& .MuiDataGrid-cell[data-field="status"][data-value="Rejected"]': {
                      '& .MuiChip-root': {
                        color: red[500],
                      },
                    },
                  },
                },
                (theme) =>
                  theme.applyDarkStyles({
                    '& .MuiDataGrid-root': {
                      '& .MuiDataGrid-columnHeaders': {
                        borderColor: 'primaryDark.600',
                      },
                      '& .MuiDataGrid-cell': {
                        borderColor: alpha(theme.palette.primaryDark[600], 0.5),
                      },
                      '& .MuiDataGrid-cell[data-field="status"][data-value="Rejected"]': {
                        '& .MuiChip-root': {
                          color: red[300],
                        },
                      },
                    },
                  }),
              ]}
            >
              <DataGridPremium
                {...data}
                columns={columns}
                apiRef={apiRef}
                disableRowSelectionOnClick
                checkboxSelection
                hideFooter
                loading={loading}
                isGroupExpandedByDefault={(node) => {
                  rowGroupingCounter++;
                  return rowGroupingCounter == 3 ? true : false;
                }}
                rowGroupingModel={rowGroupingModel}
                onRowGroupingModelChange={(model) => setRowGroupingModel(model)}
                aggregationModel={aggregationModel}
                onAggregationModelChange={(newModel) => setAggregationModel(newModel)}
                columnVisibilityModel={columnVisibilityModel}
                onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
              />
            </Box>
          </Paper>
          <Box
            sx={{
              display: 'flex',
              overflow: { md: 'auto', xl: 'unset' },
              m: { md: -2, lg: -3, xl: 0 },
              p: { md: 2, lg: 3, xl: 0 },
            }}
          >
            <Paper
              sx={(theme) => ({
                backgroundColor: '#fff',
                border: '1px solid',
                borderColor: 'grey.200',
                boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                ...theme.applyDarkStyles({
                  backgroundColor: 'primaryDark.800',
                  borderColor: 'primaryDark.600',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                }),
                minWidth: 300,
                mr: { md: 2, lg: 3, xl: 4 },
                flexGrow: 1,
              })}
            >
              <Box sx={{ p: 2 }}>
                <Typography fontWeight={500}>Cool Project</Typography>
              </Box>
              <Divider />
              <FolderTreeView />
            </Paper>
            <Paper
              sx={[
                {
                  border: '1px solid',
                  borderColor: 'grey.200',
                  boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
                  '& > div': {
                    borderRadius: 1,
                    overflow: 'auto',
                    backgroundColor: 'initial',
                  },
                  '& .MuiTypography-subtitle1': {
                    fontSize: '0.875rem',
                  },
                  '& .MuiTypography-caption': {
                    width: { xs: 28, xl: 32 },
                    height: 32,
                  },
                  '& .MuiPickersSlideTransition-root': {
                    minWidth: { xs: 268, xl: 300 },
                    minHeight: { xs: 238, xl: 288 },
                  },
                  '& [role="row"]': {
                    margin: { xs: '4px 0', xl: '6px 0' },
                  },
                  '& .MuiDateRangePickerDay-root': {
                    lineHeight: 0,
                    margin: 0,
                  },
                  '& .MuiPickersDay-root': {
                    width: { xs: 28, xl: 32 },
                    height: { xs: 28, xl: 32 },
                    fontWeight: 400,
                  },
                },
                (theme) =>
                  theme.applyDarkStyles({
                    borderColor: 'primaryDark.600',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.3)',
                    '& > div': {
                      backgroundColor: 'primaryDark.800',
                    },
                  }),
              ]}
            >
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDateRangePicker displayStaticWrapperAs="desktop" />
              </LocalizationProvider>
            </Paper>
          </Box>
        </React.Fragment>
      }
    />
  );
}
