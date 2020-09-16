import React from 'react';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import HighlightedCode from 'docs/src/modules/components/HighlightedCode';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 240,
  },
  paper: {
    padding: theme.spacing(2),
    height: '100%',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
  },
}));

export default function InteractiveGrid() {
  const classes = useStyles();
  const [direction, setDirection] = React.useState('row');
  const [justify, setJustify] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');

  const jsx = `
<Grid
  container
  direction="${direction}"
  justify="${justify}"
  alignItems="${alignItems}"
>
`;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Grid
          container
          spacing={2}
          className={classes.demo}
          alignItems={alignItems}
          direction={direction}
          justify={justify}
        >
          {[0, 1, 2].map((value) => (
            <Grid key={value} item>
              <Paper
                className={classes.paper}
                style={{ paddingTop: (value + 1) * 10, paddingBottom: (value + 1) * 10 }}
              >
                {`Cell ${value + 1}`}
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>direction</FormLabel>
                <RadioGroup
                  row
                  name="direction"
                  aria-label="direction"
                  value={direction}
                  onChange={(event) => {
                    setDirection(event.target.value);
                  }}
                >
                  <FormControlLabel value="row" control={<Radio />} label="row" />
                  <FormControlLabel value="row-reverse" control={<Radio />} label="row-reverse" />
                  <FormControlLabel value="column" control={<Radio />} label="column" />
                  <FormControlLabel
                    value="column-reverse"
                    control={<Radio />}
                    label="column-reverse"
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>justify</FormLabel>
                <RadioGroup
                  row
                  name="justify"
                  aria-label="justify"
                  value={justify}
                  onChange={(event) => {
                    setJustify(event.target.value);
                  }}
                >
                  <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                  <FormControlLabel value="center" control={<Radio />} label="center" />
                  <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                  <FormControlLabel
                    value="space-between"
                    control={<Radio />}
                    label="space-between"
                  />
                  <FormControlLabel value="space-around" control={<Radio />} label="space-around" />
                  <FormControlLabel value="space-evenly" control={<Radio />} label="space-evenly" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>alignItems</FormLabel>
                <RadioGroup
                  row
                  name="alignItems"
                  aria-label="align items"
                  value={alignItems}
                  onChange={(event) => {
                    setAlignItems(event.target.value);
                  }}
                >
                  <FormControlLabel value="flex-start" control={<Radio />} label="flex-start" />
                  <FormControlLabel value="center" control={<Radio />} label="center" />
                  <FormControlLabel value="flex-end" control={<Radio />} label="flex-end" />
                  <FormControlLabel value="stretch" control={<Radio />} label="stretch" />
                  <FormControlLabel value="baseline" control={<Radio />} label="baseline" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <HighlightedCode code={jsx} language="jsx" />
      </Grid>
    </Grid>
  );
}
