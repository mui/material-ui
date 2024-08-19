import * as React from 'react';
import Grid from '@mui/joy/Grid';
import FormLabel from '@mui/joy/FormLabel';
import FormControl from '@mui/joy/FormControl';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Sheet from '@mui/joy/Sheet';
import { HighlightedCode } from '@mui/docs/HighlightedCode';
import { BrandingProvider } from '@mui/docs/branding';

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event) => {
    setSpacing(Number(event.target.value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid size={12}>
        <Grid container spacing={spacing} sx={{ justifyContent: 'center' }}>
          {[0, 1, 2].map((value) => (
            <Grid key={value}>
              <Sheet sx={{ height: 140, width: 100 }} />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid size={12}>
        <Sheet sx={{ p: 2 }}>
          <Grid container>
            <Grid>
              <FormControl>
                <FormLabel>spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={spacing.toString()}
                  onChange={handleChange}
                  orientation="horizontal"
                  sx={{ flexWrap: 'wrap', gap: 2, '--RadioGroup-gap': '0px' }}
                >
                  {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                    <Radio
                      key={value}
                      value={value.toString()}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Sheet>
        <BrandingProvider mode="dark">
          <HighlightedCode code={jsx} language="jsx" />
        </BrandingProvider>
      </Grid>
    </Grid>
  );
}
