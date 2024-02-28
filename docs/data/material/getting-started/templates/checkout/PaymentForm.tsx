import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/system';

import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';

const FormGrid = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm() {
  const [cardNumber, setCardNumber] = React.useState('');
  const [cvv, setCvv] = React.useState('');
  const [expirationDate, setExpirationDate] = React.useState('');

  const handleCardNumberChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (value.length <= 16) {
      setCardNumber(formattedValue);
    }
  };

  const handleCvvChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  const handleExpirationDateChange = (event: { target: { value: string } }) => {
    const value = event.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (value.length <= 4) {
      setExpirationDate(formattedValue);
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 3,
            height: { xs: '300px', sm: '350px' },
            width: { xs: '450px', sm: '525px' },
            borderRadius: '20px',
            border: '2px solid ',
            borderColor: 'divider',
            backgroundColor: 'background.paper',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">Credit card</Typography>
            <CreditCardRoundedIcon sx={{ color: 'text.secondary' }} />
          </Box>
          <SimCardRoundedIcon
            sx={{
              fontSize: { xs: '48px', sm: '56px' },
              transform: 'rotate(90deg)',
              color: 'text.secondary',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              gap: 3,
            }}
          >
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel required>Card number</FormLabel>
              <OutlinedInput
                id="standard-basic"
                autoComplete="card-number"
                placeholder="0000 0000 0000 0000"
                required
                value={cardNumber}
                onChange={handleCardNumberChange}
              />
            </FormGrid>
            <FormGrid sx={{ maxWidth: '20%' }}>
              <FormLabel required>CVV</FormLabel>
              <OutlinedInput
                id="cvv"
                autoComplete="CVV"
                placeholder="123"
                required
                value={cvv}
                onChange={handleCvvChange}
              />
            </FormGrid>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel required>Name</FormLabel>
              <OutlinedInput
                id="card-name"
                autoComplete="card-name"
                placeholder="John Smith"
                required
              />
            </FormGrid>
            <FormGrid sx={{ flexGrow: 1 }}>
              <FormLabel required>Expiration date</FormLabel>
              <OutlinedInput
                id="card-expiration"
                autoComplete="card-expiration"
                placeholder="MM/YY"
                required
                value={expirationDate}
                onChange={handleExpirationDateChange}
              />
            </FormGrid>
          </Box>
        </Box>
      </Box>
      <FormControlLabel
        control={<Checkbox name="saveCard" />}
        label="Remember credit card details for next time"
        sx={{ justifyContent: 'center' }}
      />
    </React.Fragment>
  );
}
