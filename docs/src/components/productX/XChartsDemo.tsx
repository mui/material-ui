import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { mangoFusionPalette } from '@mui/x-charts';
import Frame from 'docs/src/components/action/Frame';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import MarkdownElement from 'docs/src/components/markdown/MarkdownElement';

const code = `
<BarChart
  series={[
    { data: [35, 44, 24, 34] },
    { data: [51, 6, 49, 30] },
    { data: [15, 25, 30, 50] },
    { data: [60, 50, 15, 25] },
  ]}
  height={250}
  xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
  colors={mangoFusionPalette}
  sx={{
    '& .MuiMarkElement-root': { display: 'none' },
    '& .MuiMarkElement-root.MuiMarkElement-highlighted': { display: 'block' },
  }}
/>`;

export default function XChartsDemo() {
  return (
    <Frame sx={{ height: '100%' }}>
      <Frame.Demo sx={{ p: 2, flexGrow: 1 }}>
        <Paper
          variant="outlined"
          sx={(theme) => ({
            maxWidth: '100%',
            mx: 'auto',
            bgcolor: '#FFF',
            height: '100%',
            borderRadius: '8px',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.900',
            }),
          })}
        >
          <Box sx={{ p: 2 }}>
            {/* <LineChart
              sx={{
                '& .MuiMarkElement-root': { display: 'none' },
                '& .MuiMarkElement-root.MuiMarkElement-highlighted': { display: 'block' },
              }}
              margin={{ top: 10, bottom: 50, left: 40, right: 20 }}
              series={[
                { data: [35, 44, 24, 34], stack: 'total', area: true },
                { data: [51, 32, 49, 30], stack: 'total', area: true },
                { data: [5, 31, 30, 50], stack: 'total', area: true },
                { data: [60, 50, 15, 10], stack: 'total', area: true },
              ]}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'point' }]}
              colors={mangoFusionPalette}
              height={250}
            /> */}
            <BarChart
              series={[
                { data: [35, 44, 24, 34] },
                { data: [51, 6, 49, 30] },
                { data: [15, 25, 30, 50] },
                { data: [60, 50, 15, 25] },
              ]}
              height={250}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
              margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              colors={mangoFusionPalette}
            />
          </Box>
        </Paper>
      </Frame.Demo>
      <Frame.Info sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden component={MarkdownElement} code={code} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
