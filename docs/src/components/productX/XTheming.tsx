import * as React from 'react';
import {
  DataGridPro,
  GridColDef,
  GridCellParams,
  GridRenderEditCellParams,
} from '@mui/x-data-grid-pro';
import { useDemoData } from '@mui/x-data-grid-generator';
import { CssVarsProvider } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import SvgTwinkle from 'docs/src/icons/SvgTwinkle';
import SvgMaterialDesign from 'docs/src/icons/SvgMaterialDesign';
import XGridGlobalStyles from 'docs/src/components/home/XGridGlobalStyles';
import ProgressBar from 'docs/src/components/x-grid/ProgressBar';
import EditProgress from 'docs/src/components/x-grid/EditProgress';
import Status from 'docs/src/components/x-grid/Status';
import EditStatus from 'docs/src/components/x-grid/EditStatus';

const dataGridStyleOverrides = <XGridGlobalStyles selector="#data-grid-theming" pro />;

export default function XTheming() {
  const [customized, setCustomized] = React.useState(true);
  const { loading, data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 1000,
    maxColumns: 40,
    editable: true,
  });
  const baseFilledQuantityCol = data.columns.find(({ field }) => field === 'filledQuantity');
  const baseStatusCol = data.columns.find(({ field }) => field === 'status');
  function getColumns() {
    const columns: Array<GridColDef> = [
      {
        field: 'desk',
        headerName: 'Desk',
        width: customized ? 72 : 100,
        sortable: false,
        editable: true,
      },
      {
        field: 'commodity',
        headerName: 'Commodity',
        width: customized ? 132 : 160,
        editable: true,
      },
      {
        field: 'traderName',
        headerName: 'Trader Name',
        width: customized ? 148 : 172,
        editable: true,
      },
      {
        field: 'filledQuantity',
        headerName: 'Filled',
        ...baseFilledQuantityCol,
        width: customized ? 130 : 150,
        sortable: false,
        editable: true,
        ...(customized && {
          display: 'flex',
          renderCell: (params: GridCellParams) => {
            return <ProgressBar value={Number(params.value)!} />;
          },
          renderEditCell: (params: GridRenderEditCellParams) => {
            return <EditProgress {...params} />;
          },
        }),
      },
      {
        field: 'status',
        headerName: 'Status',
        ...baseStatusCol,
        width: 150,
        sortable: false,
        editable: true,
        ...(customized && {
          display: 'flex',
          renderCell: (params: GridCellParams) => {
            return <Status status={(params.value || '').toString()} />;
          },
          renderEditCell: (params: GridRenderEditCellParams) => {
            return <EditStatus {...params} />;
          },
        }),
      },
    ];
    return columns;
  }
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
            description="Use sophisticated theming features to make the MUI X components look exactly how you want. Take this Data Grid as an example."
          />
          <Group sx={{ m: -2, p: 2 }}>
            <Highlighter disableBorder selected={customized} onClick={() => setCustomized(true)}>
              <Item
                icon={<SvgTwinkle />}
                title="Custom theme"
                description="Theming allows you to use your brand's design tokens, easily making the components reflect its look and feel."
              />
            </Highlighter>
            <Highlighter disableBorder selected={!customized} onClick={() => setCustomized(false)}>
              <Item
                icon={<SvgMaterialDesign />}
                title="Material Design"
                description="Every component comes with Google's tried-and-tested design system, built-in and ready for use."
              />
            </Highlighter>
          </Group>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          {customized ? (
            <Paper
              id="data-grid-theming"
              variant="outlined"
              sx={{ height: 418, borderColor: 'divider' }}
            >
              {dataGridStyleOverrides}
              <DataGridPro
                {...data}
                columns={getColumns()}
                disableRowSelectionOnClick
                checkboxSelection
                loading={loading}
                pagination
                density="compact"
              />
            </Paper>
          ) : (
            <CssVarsProvider>
              <Paper
                elevation={0}
                sx={[
                  {
                    height: 418,
                    '& .MuiDataGrid-cell[data-field="status"][data-value="Rejected"]': {
                      '& .MuiChip-root': {
                        color: red[500],
                      },
                    },
                  },
                  (theme) =>
                    theme.applyDarkStyles({
                      '& .MuiDataGrid-cell[data-field="status"][data-value="Rejected"]': {
                        '& .MuiChip-root': {
                          color: red[300],
                        },
                      },
                    }),
                ]}
              >
                <DataGridPro
                  {...data}
                  columns={getColumns()}
                  disableRowSelectionOnClick
                  checkboxSelection
                  loading={loading}
                  pagination
                  density="compact"
                />
              </Paper>
            </CssVarsProvider>
          )}
        </Grid>
      </Grid>
    </Section>
  );
}
