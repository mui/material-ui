import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { BarChart } from '@mui/x-charts/BarChart';
import { blueberryTwilightPaletteLight } from '@mui/x-charts';
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
  colors={blueberryTwilightPaletteLight}
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
              colors={blueberryTwilightPaletteLight}
            />
          </Box>
        </Paper>
      </Frame.Demo>
      <Frame.Info data-mui-color-scheme="dark" sx={{ maxHeight: 300, overflow: 'auto' }}>
        <HighlightedCode copyButtonHidden component={MarkdownElement} code={code} language="jsx" />
      </Frame.Info>
    </Frame>
  );
}
