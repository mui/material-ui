import * as React from 'react';
import Grid from '@mui/system/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Paper from '@mui/material/Paper';

export default function SpacingGrid() {
  const [spacing, setSpacing] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSpacing(Number((event.target as HTMLInputElement).value));
  };

  const jsx = `
<Grid container spacing={${spacing}}>
`;

  return (
    <Grid sx={{ flexGrow: 1 }} container spacing={2}>
      <Grid xs={12}>
        <Grid container justifyContent="center" spacing={spacing}>
          {[0, 1, 2].map((value) => (
            <Grid key={value}>
              <Paper
                sx={{
                  height: 140,
                  width: 100,
                  backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Paper sx={{ p: 2 }}>
          <Grid container>
            <Grid>
              <FormControl component="fieldset">
                <FormLabel component="legend">spacing</FormLabel>
                <RadioGroup
                  name="spacing"
                  aria-label="spacing"
                  value={spacing.toString()}
                  onChange={handleChange}
                  row
                >
                  {[0, 0.5, 1, 2, 3, 4, 8, 12].map((value) => (
                    <FormControlLabel
                      key={value}
                      value={value.toString()}
                      control={<Radio />}
                      label={value.toString()}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
        <HighlightedCode code={jsx} language="jsx" />
      </Grid>
    </Grid>
  );
}
