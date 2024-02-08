import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';

import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Info from './Info';
import ToggleColorMode from './ToggleColorMode';
import getLPTheme from '../landing-page/getLPTheme';
import SvgMaterialDesign from 'docs/src/icons/SvgMaterialDesign';

const defaultTheme = createTheme({});

interface ToggleCustomThemeProps {
  showCustomTheme: Boolean;
  toggleCustomTheme: () => void;
}

function ToggleCustomTheme({
  showCustomTheme,
  toggleCustomTheme,
}: ToggleCustomThemeProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>
          <SvgMaterialDesign sx={{ fontSize: '20px', mr: 1 }} />
          Material Design
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

const whiteLogo =
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf7356420e154daf_SitemarkLight.svg';
const darkLogo =
  'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73563dba154dad_SitemarkDark.svg';

const logoStyle = {
  width: '140px',
  height: '56px',
  opacity: 0.8,
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
  const [mode, setMode] = React.useState<PaletteMode>('dark');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const [activeStep, setActiveStep] = React.useState(0);
  const logo = LPtheme.palette.mode === 'light' ? darkLogo : whiteLogo;

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <CssBaseline />
      <Grid container sx={{ height: '100dvh' }}>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.default',
            borderRight: '1px solid',
            borderColor: 'divider',
            alignItems: 'start',
            pt: 4,
            px: 10,
            gap: 16,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              ml: '-18px',
              alignItems: 'center',
            }}
          >
            <img src={logo} style={logoStyle} alt="logo of sitemark" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              width: '100%',
              maxWidth: 500,
            }}
          >
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/material-ui/getting-started/templates/landing-page/"
              sx={{ alignSelf: 'start', ml: '-8px' }}
            >
              Back to Sitemark
            </Button>
            <Info />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={7}
          lg={8}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'background.paper',
            borderRight: '1px solid',
            borderColor: 'divider',
            alignItems: 'start',
            pt: 4,
            px: 10,
            gap: 16,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              width: '100%',
              maxWidth: 600,
              height: 56,
            }}
          >
            <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              maxWidth: 600,
              height: 600,
              maxHeight: '700px',
            }}
          >
            <Stepper activeStep={activeStep} sx={{ mb: 10 }}>
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
                  Your order number is #140396. We have emailed your order
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
                    justifyContent: activeStep !== 0 ? 'space-between' : 'flex-end',
                    alignItems: 'end',
                    flexGrow: 1,
                    gap: 1,
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ArrowBackIosNewRoundedIcon />}
                      onClick={handleBack}
                    >
                      Previous
                    </Button>
                  )}
                  <Button variant="contained" onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
