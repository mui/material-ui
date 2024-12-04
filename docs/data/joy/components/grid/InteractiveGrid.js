import * as React from 'react';
import Grid from '@mui/joy/Grid';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';

import { BrandingProvider } from '@mui/docs/branding';
import { HighlightedCode } from '@mui/docs/HighlightedCode';

export default function InteractiveGrid() {
  const [direction, setDirection] = React.useState('row');
  const [justifyContent, setJustifyContent] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');

  const jsx = `
<Grid
  container
  direction="${direction}"
  sx={{
    justifyContent: "${justifyContent}",
    alignItems: "${alignItems}",
  }}
>
`;

  return (
    <Grid sx={{ flexGrow: 1 }} container>
      <Grid size={12}>
        <Grid
          container
          spacing={2}
          direction={direction}
          sx={{ alignItems, justifyContent, height: 300, pt: 2, pb: 2 }}
        >
          {[0, 1, 2].map((value) => (
            <Grid key={value}>
              <Sheet
                sx={{
                  p: 2,
                  height: '100%',
                  pt: `${(value + 1) * 10}px`,
                  pb: `${(value + 1) * 10}px`,
                }}
              >
                {`Cell ${value + 1}`}
              </Sheet>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid size={12}>
        <Sheet sx={{ p: 2 }}>
          <Grid container spacing={3}>
            <Grid size={12}>
              <FormControl>
                <FormLabel sx={{ mb: 1.5 }}>direction</FormLabel>
                <RadioGroup
                  orientation="horizontal"
                  name="direction"
                  aria-label="direction"
                  value={direction}
                  onChange={(event) => {
                    setDirection(event.target.value);
                  }}
                  sx={{ flexWrap: 'wrap', gap: 2, '--RadioGroup-gap': '0px' }}
                >
                  <Radio label="row" value="row" />
                  <Radio label="row-reverse" value="row-reverse" />
                  <Radio label="column" value="column" />
                  <Radio label="column-reverse" value="column-reverse" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl>
                <FormLabel sx={{ mb: 1.5 }}>justifyContent</FormLabel>
                <RadioGroup
                  orientation="horizontal"
                  name="justifyContent"
                  aria-label="justifyContent"
                  value={justifyContent}
                  onChange={(event) => {
                    setJustifyContent(event.target.value);
                  }}
                  sx={{ flexWrap: 'wrap', gap: 2, '--RadioGroup-gap': '0px' }}
                >
                  <Radio label="flex-start" value="flex-start" />
                  <Radio label="center" value="center" />
                  <Radio label="flex-end" value="flex-end" />
                  <Radio label="space-between" value="space-between" />
                  <Radio label="space-around" value="space-around" />
                  <Radio label="space-evenly" value="space-evenly" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid size={12}>
              <FormControl>
                <FormLabel sx={{ mb: 1.5 }}>alignItems</FormLabel>
                <RadioGroup
                  orientation="horizontal"
                  name="alignItems"
                  aria-label="align items"
                  value={alignItems}
                  onChange={(event) => {
                    setAlignItems(event.target.value);
                  }}
                  sx={{ flexWrap: 'wrap', gap: 2, '--RadioGroup-gap': '0px' }}
                >
                  <Radio label="flex-start" value="flex-start" />
                  <Radio label="center" value="center" />
                  <Radio label="flex-end" value="flex-end" />
                  <Radio label="stretch" value="stretch" />
                  <Radio label="baseline" value="baseline" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Sheet>
      </Grid>
      <Grid size={12}>
        <BrandingProvider mode="dark">
          <HighlightedCode code={jsx} language="jsx" />
        </BrandingProvider>
      </Grid>
    </Grid>
  );
}
