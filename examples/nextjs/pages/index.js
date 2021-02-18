import * as React from 'react';
import {
  Container,
  Typography,
  FormControl,
  Button,
  Grid,
  TextField,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import { useState } from 'react';

export default function Index() {
  const [formValues, setFormValues] = useState({ customerName: '', loavesType: '', breadType: '' });

  const [pans, setPans] = useState(0);
  const [rounds, setRounds] = useState(0);

  const [dailyBreadTypes, setdailyBreadTypes] = useState({
    sourdough: true,
    wholeGrain: true,
    banana: true,
  });
  const [optimizationReportError, setOptimizationReportError] = useState(false);

  const { loavesType: loaves, breadType: breads } = formValues;

  const handleCheckboxChange = (_event) => {
    setdailyBreadTypes({ ...dailyBreadTypes, [_event.target.name]: _event.target.checked });
  };

  const handleSubmit = () => {
    loaves.split(',').forEach((loaf) => {
      if (loaf.replace(' ', '').includes('pan')) {
        setPans((p) => p + 1);
        loaves.split(',');
      } else if (loaf.replace(' ', '').includes('round')) {
        setRounds((r) => r + 1);
      }
    });

    breads.split(', ').forEach((bread) => {
      if (bread === 'whole grain' && !dailyBreadTypes.wholeGrain) {
        setOptimizationReportError(true);
      } else if (bread === 'sourdough' && !dailyBreadTypes.sourdough) {
        setOptimizationReportError(true);
      } else if (bread === 'banana' && !dailyBreadTypes.banana) {
        setOptimizationReportError(true);
      }
    });
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const clearReport = () => {
    setPans(0);
    setRounds(0);
    setOptimizationReportError(false);
  };

  return (
    <Container>
      <Grid
        style={{ height: '100vh' }}
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        wrap="nowrap"
      >
        <Grid item style={{ width: '50%' }} sx={{ my: 2 }}>
          {optimizationReportError ? (
            <h4 style={{ color: 'tomato' }}>
              Call customers to sort out order error as 1 or more of the requested breads are not
              being served today.
            </h4>
          ) : (
            <ul style={{ flex: '0 0 1fr', margin: '0', padding: '0' }}>
              <h4>Report</h4>
              <li>
                Make <strong>{rounds}</strong> rounds for today
              </li>
              <li>
                Make <strong>{pans}</strong> pans for today
              </li>
            </ul>
          )}
        </Grid>
        <Grid item style={{ width: '50%' }} sx={{ my: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Daily Breads</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dailyBreadTypes.sourdough}
                    onChange={handleCheckboxChange}
                    name="sourdough"
                  />
                }
                label="Sourdough Bread"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dailyBreadTypes.wholeGrain}
                    onChange={handleCheckboxChange}
                    name="wholeGrain"
                  />
                }
                label="Whole Grain Bread"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={dailyBreadTypes.banana}
                    onChange={handleCheckboxChange}
                    name="banana"
                  />
                }
                label="Banana Bread"
              />
            </FormGroup>
            <FormHelperText>
              Select the breads you intend on making for today&apos;s operations.
            </FormHelperText>
          </FormControl>
        </Grid>
        <Grid style={{ width: '50%' }} sx={{ my: 2 }} item>
          <Typography variant="h3">Customer Information</Typography>
          <FormControl>
            <Grid
              style={{ display: 'flex', flexWrap: 'wrap', width: 'contain-content' }}
              sx={{ my: 1 }}
              item
            >
              <TextField
                style={{ flex: '0 0 100%' }}
                sx={{ my: 1 }}
                id="customer-name"
                name="customerName"
                label="Customer Names"
                type="text"
                value={formValues.customerName}
                onChange={handleFormInputChange}
              />
              <TextField
                style={{ flex: '0 0 100%' }}
                sx={{ my: 1 }}
                id="customer-loaves"
                name="loavesType"
                label="pan or round?"
                type="text"
                value={formValues.loavesType}
                onChange={handleFormInputChange}
              />
              <TextField
                style={{ flex: '0 0 100%' }}
                sx={{ my: 1 }}
                id="customer-bread"
                name="breadType"
                label="banana, sourdough, or whole grain?"
                type="text"
                value={formValues.breadType}
                onChange={handleFormInputChange}
              />
              <FormHelperText>
                Valid Values include: <strong>sourdough</strong>, <strong>whole grain</strong>, and{' '}
                <strong>banana</strong> for types of loaves
              </FormHelperText>
            </Grid>
            <FormHelperText>Enter data as a comma separated list</FormHelperText>
          </FormControl>
        </Grid>
        <Button
          onClick={handleSubmit}
          style={{ width: '50%', height: '50px' }}
          sx={{ my: 4 }}
          variant="contained"
          color="primary"
          type="submit"
        >
          Add Orders
        </Button>
        <Button
          onClick={clearReport}
          style={{ width: '50%', height: '50px' }}
          sx={{ my: 1 }}
          variant="contained"
          color="secondary"
          type="submit"
        >
          Clear Orders
        </Button>
      </Grid>
    </Container>
  );
}
