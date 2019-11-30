import React from 'react';
import Grid from '@material-ui/core/Grid';
import Stack from '@material-ui/core/Stack';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
// We don't have a typescript version of MarkdownElement
// tslint:disable-next-line: ban-ts-ignore
// @ts-ignore
import MarkdownElement from 'docs/src/modules/components/MarkdownElement';
import Resizable from 'docs/src/modules/components/Resizable';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  demo: {
    height: 280,
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  control: {
    marginTop: 24,
    padding: theme.spacing(2),
  },
  sliderFormControl: {
    width: '50%',
  },
  slider: {
    width: '100%',
  },
}));

export default function InteractiveGrid() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  const [direction, setDirection] = React.useState('row');
  const [justify, setJustify] = React.useState('center');
  const [alignItems, setAlignItems] = React.useState('center');

  const handleSliderChange = (event, newValue) => {
    setSpacing(newValue);
  };

  const code = `
\`\`\`jsx
<Stack
  ${spacing === 0 ? '' : `spacing={${spacing}}\n  `}direction="${direction}"
  justify="${justify}"
  alignItems="${alignItems}"
>
  {children}
</Stack>
\`\`\`
`;

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Resizable>
          <Stack
            className={classes.demo}
            spacing={spacing}
            alignItems={alignItems}
            direction={direction}
            justify={justify}
          >
            {[0, 1, 2].map(value => (
              <Paper key={value} className={classes.paper} style={{ padding: (value + 1) * 10 }}>
                {`Cell ${value + 1}`}
              </Paper>
            ))}
          </Stack>
        </Resizable>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.control}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl component="fieldset" className={classes.sliderFormControl}>
                <FormLabel>spacing</FormLabel>
                <Slider
                  className={classes.slider}
                  defaultValue={spacing}
                  // getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  marks
                  min={0}
                  max={10}
                  onChange={handleSliderChange}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel>direction</FormLabel>
                <RadioGroup
                  row
                  name="direction"
                  aria-label="direction"
                  value={direction}
                  onChange={event => {
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
                  onChange={event => {
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
                  onChange={event => {
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
        <MarkdownElement text={code} />
      </Grid>
    </Grid>
  );
}
