import * as React from 'react';
import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';
import Typography from '@mui/joy/Typography';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ContactsOutlinedIcon from '@mui/icons-material/ContactsOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import Check from '@mui/icons-material/Check';

export default function IconStepper() {
  return (
    <Stepper
      size="lg"
      sx={{
        width: '100%',
        '--StepIndicator-size': '4rem',
        '--Step-connectorInset': '0px',
        [`& .${stepIndicatorClasses.root}`]: {
          borderWidth: 3,
        },
        [`& .${stepClasses.root}::after`]: {
          height: 3,
        },
        [`& .${stepClasses.completed}`]: {
          [`& .${stepIndicatorClasses.root}`]: {
            borderColor: 'primary.400',
            color: 'primary.400',
          },
          '&::after': {
            bgcolor: 'primary.400',
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
            <ShoppingCartOutlinedIcon />
          </StepIndicator>
        }
      />
      <Step
        orientation="vertical"
        completed
        indicator={
          <StepIndicator variant="outlined" color="primary">
            <ContactsOutlinedIcon />
          </StepIndicator>
        }
      />
      <Step
        orientation="vertical"
        completed
        indicator={
          <StepIndicator variant="outlined" color="primary">
            <LocalShippingOutlinedIcon />
          </StepIndicator>
        }
      />
      <Step
        orientation="vertical"
        active
        indicator={
          <StepIndicator variant="outlined" color="primary">
            <CreditCardOutlinedIcon />
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
            <Check />
          </StepIndicator>
        }
      />
    </Stepper>
  );
}
