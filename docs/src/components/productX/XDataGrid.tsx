import * as React from 'react';
import { XGrid, GridApi } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';
import EditOutlined from '@mui/icons-material/EditOutlined';
import CheckBoxRounded from '@mui/icons-material/CheckBoxRounded';
import SortByAlphaRounded from '@mui/icons-material/SortByAlphaRounded';
import AutoStoriesOutlined from '@mui/icons-material/AutoStoriesOutlined';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';
import FlashCode from 'docs/src/components/animation/FlashCode';
import XGridGlobalStyles from 'docs/src/components/home/XGridGlobalStyles';

const DEMOS = ['Editing', 'Selection', 'Sorting', 'Pagination', 'Filtering'];

const code = `<DataGrid
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
  disableSelectionOnClick
  pagination
/>`;

const startLine = {
  [DEMOS[0]]: 5,
  [DEMOS[1]]: 10,
  [DEMOS[2]]: 6,
  [DEMOS[3]]: 12,
  [DEMOS[4]]: 7,
};

const dataGridStyleOverrides = <XGridGlobalStyles selector="#data-grid-demo" />;

export default function XDataGrid() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const gridApiRef = React.useRef<GridApi | null>(null);
  const icons = {
    [DEMOS[0]]: <EditOutlined />,
    [DEMOS[1]]: <CheckBoxRounded />,
    [DEMOS[2]]: <SortByAlphaRounded />,
    [DEMOS[3]]: <AutoStoriesOutlined />,
    [DEMOS[4]]: <FilterAltOutlined />,
  };
  const { loading, data } = useDemoData({
    dataSet: 'Employee',
    rowLength: 1000,
    maxColumns: 5,
    editable: true,
  });
  const firstRowId = data.rows[0]?.id;
  React.useEffect(() => {
    if (gridApiRef.current && !loading) {
      gridApiRef.current.scroll({ top: 0, left: 0 });
      if (demo === DEMOS[2]) {
        gridApiRef.current.sortColumn({ field: 'name', sortable: true }, 'asc');
      } else {
        gridApiRef.current.sortColumn({ field: 'name', sortable: true }, null);
      }
      if (demo === DEMOS[0]) {
        gridApiRef.current.setCellMode(firstRowId, 'name', 'edit');
      }
      if (demo === DEMOS[4]) {
        gridApiRef.current.applyFilter({
          columnField: 'name',
          value: 'Ad',
          operatorValue: 'contains',
        });
      }
    }
  }, [demo, loading, firstRowId]);
  return (
    <Section>
      <Grid container spacing={2}>
        <Grid item md={6} sx={{ minWidth: 0 }}>
          <Box maxWidth={500}>
            <SectionHeadline
              overline="Data Grid"
              title={
                <Typography variant="h2">
                  A level of <GradientText>performance and quality</GradientText> that hasn&apos;t
                  been seen before
                </Typography>
              }
              description="The MUI Data Grid is a data table powerhouse. It is packed with exclusive features that will enrich the experience of dealing with lots of data."
            />
          </Box>
          <Group desktopColumns={2} sx={{ mt: 4 }}>
            {DEMOS.map((name) => (
              <Highlighter
                selectedBg="comfort"
                key={name}
                selected={name === demo}
                onClick={() => setDemo(name)}
              >
                <Item icon={icons[name]} title={name} />
              </Highlighter>
            ))}
            <More />
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            id="data-grid-demo"
            variant="outlined"
            sx={{
              position: 'relative',
              zIndex: 1,
              height: 220,
              borderRadius: '10px 10px 0 0',
              '& .MuiDataGrid-root': {
                '& .MuiAvatar-root': { width: 24, height: 24, fontSize: 14, fontWeight: 'bold' },
                '& .MuiDataGrid-renderingZone': {
                  '& .MuiDataGrid-cell': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'primaryDark.800' : 'grey.50',
                  },
                },
                '& .MuiDataGrid-footerContainer': {
                  minHeight: 48,
                  borderTop: '1px solid',
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.200',
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
              // '& .FlashView-highlight': {
              //   borderRadius: '2px 2px 0 0',
              //   pointerEvents: 'none',
              //   position: 'absolute',
              //   backgroundColor: (theme) => alpha(theme.palette.success[300], 0.2),
              //   transition: '0.3s',
              //   border: '1px solid',
              //   borderColor: 'success.dark',
              // },
              // '& .FlashView-content': {
              //   borderRadius: 1,
              //   backgroundColor: 'success.700',
              //   color: '#fff',
              //   width: 'max-content',
              //   position: 'absolute',
              //   px: 1,
              //   py: 0.25,
              //   boxShadow: '0 0 8px 0 rgba(0,0,0,0.12)',
              //   bottom: -5,
              //   left: -1,
              //   transform: 'translate(0, 100%)',
              //   fontWeight: 500,
              // },
              // '& .FlashView-overlay': {
              //   display: 'none',
              //   pointerEvents: 'none',
              //   position: 'absolute',
              //   bgcolor: 'rgba(0,0,0,0.12)',
              //   top: 0,
              //   left: 0,
              //   right: 0,
              //   bottom: 0,
              // },
            }}
          >
            {dataGridStyleOverrides}
            <XGrid
              {...data}
              apiRef={gridApiRef}
              loading={loading}
              density="compact"
              checkboxSelection
              disableSelectionOnClick
              pagination
            />
          </Paper>
          <Frame.Info
            sx={{
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
              mt: -1,
              pb: 1,
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '&& pre': {
                bgcolor: 'transparent',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            }}
          >
            <Box sx={{ position: 'relative' }}>
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <HighlightedCode component={MarkdownElement} code={code} language="jsx" />
              </Box>
              <FlashCode startLine={startLine[demo]} sx={{ mx: -2 }} />
            </Box>
          </Frame.Info>
        </Grid>
      </Grid>
    </Section>
  );
}
