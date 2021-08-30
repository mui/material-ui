import * as React from 'react';
import { XGrid } from '@material-ui/x-grid';
import { useDemoData } from '@material-ui/x-grid-data-generator';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import GradientText from 'docs/src/components/typography/GradientText';
import Item, { Group } from 'docs/src/components/action/Item';
import Highlighter from 'docs/src/components/action/Highlighter';
import More from 'docs/src/components/action/More';
import EditOutlined from '@material-ui/icons/EditOutlined';
import HighlightAltRounded from '@material-ui/icons/HighlightAltRounded';
import SortByAlphaRounded from '@material-ui/icons/SortByAlphaRounded';
import AutoStoriesOutlined from '@material-ui/icons/AutoStoriesOutlined';
import FilterAltOutlined from '@material-ui/icons/FilterAltOutlined';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

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

export default function CoreTheming() {
  const [demo, setDemo] = React.useState(DEMOS[0]);
  const icons = {
    [DEMOS[0]]: <EditOutlined />,
    [DEMOS[1]]: <HighlightAltRounded />,
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
                <Item
                  icon={React.cloneElement(icons[name], { active: name === demo })}
                  title={name}
                />
              </Highlighter>
            ))}
            <More />
          </Group>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper
            variant="outlined"
            sx={{
              position: 'relative',
              zIndex: 1,
              height: 220,
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
            }}
          >
            <XGrid
              {...data}
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
              '& pre': {
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              },
            }}
          >
            <HighlightedCode component={MarkdownElement} code={code} language="jsx" />
          </Frame.Info>
        </Grid>
      </Grid>
    </Section>
  );
}
