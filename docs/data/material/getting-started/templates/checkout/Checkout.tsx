import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Info from './Info';
import getLPTheme from '../landing-page/getLPTheme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

const LPtheme = createTheme(getLPTheme('dark'));
const defaultTheme = createTheme({});

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const logoStyle = {
  width: '140px',
  height: 'auto',
  margin: 'auto',
  opacity: 0.3,
};

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <Grid container sx={{ height: '100dvh' }}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            display: 'flex',
            width: '100%',
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              maxWidth: 500,
              height: 600,
              mr: 10,
              ml: 'auto',
            }}
          >
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/material-ui/getting-started/templates/landing-page/"
              sx={{ alignSelf: 'start', ml: '-8px' }}
            >
              Back
            </Button>
            <Info />
            <Box sx={{ display: 'flex' }}>
              <img
                src={
                  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf7356420e154daf_SitemarkLight.svg'
                }
                style={logoStyle}
                alt="logo of sitemark"
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              maxWidth: 500,
              height: 600,
              mr: 'auto',
              ml: 10,
            }}
          >
            <Stepper activeStep={activeStep} sx={{ pb: 4 }}>
              {steps.map((label) => (
                <Step
                  sx={{
                    ':first-child': { pl: 0 },
                    ':last-child': { pr: 0 },
                  }}
                  key={label}
                >
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
                <Button variant="contained" sx={{ alignSelf: 'start', mt: 2 }}>
                  Go to my orders
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'end',
                    flexGrow: 1,
                    gap: 1,
                  }}
                >
                  {activeStep !== 0 && <Button onClick={handleBack}>Back</Button>}
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
