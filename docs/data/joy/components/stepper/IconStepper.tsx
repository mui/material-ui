import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function IconStepper() {
  return (
    <Stepper
      size="lg"
      sx={{
        width: '100%',
        '--StepIndicator-size': '3rem',
        '--Step-connectorInset': '0px',
        [`& .${stepIndicatorClasses.root}`]: {
          borderWidth: 4,
        },
        [`& .${stepClasses.root}::after`]: {
          height: 4,
        },
        [`& .${stepClasses.completed}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            borderColor: 'primary.300',
            color: 'primary.300',
          },
          '&::after': {
            bgcolor: 'primary.300',
          },
        },
        [`& .${stepClasses.active}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            borderColor: 'currentColor',
          },
        },
        [`& .${stepClasses.disabled} *`]: {
          color: 'neutral.outlinedDisabledColor',
        },
      }}
    >
      <Step
        completed
        orientation="vertical"
        indicator={
          <StepIndicator variant="outlined" color="primary">
            <ShoppingCartRoundedIcon />
          </StepIndicator>
        }
      />
      <Step
        orientation="vertical"
        completed
        indicator={
          <StepIndicator variant="outlined" color="primary">
            <ContactsRoundedIcon />
          </StepIndicator>
        }
      />
      <Step
        orientation="vertical"
        completed
        indicator={
          <StepIndicator variant="outlined" color="primary">
            <LocalShippingRoundedIcon />
          </StepIndicator>
        }
      />
      <Step
        orientation="vertical"
        active
        indicator={
          <StepIndicator variant="solid" color="primary">
            <CreditCardRoundedIcon />
          </StepIndicator>
        }
      >
        <Typography
          sx={{
            textTransform: 'uppercase',
            fontWeight: 'lg',
            fontSize: '0.75rem',
            letterSpacing: '0.5px',
          }}
        >
          Payment and Billing
        </Typography>
      </Step>
      <Step
        orientation="vertical"
        disabled
        indicator={
          <StepIndicator variant="outlined" color="neutral">
            <CheckCircleRoundedIcon />
          </StepIndicator>
        }
      />
    </Stepper>
  );
}
