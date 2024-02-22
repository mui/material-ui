import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';

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
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            p: 3,
            height: { xs: '250px', sm: '280px' },
            width: { xs: '375px', sm: '420px' },
            borderRadius: '20px',
            backdropFilter: 'blur(35px)',
            border: '2px solid ',
            borderColor: 'divider',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="subtitle2">Credit card</Typography>
            <CreditCardRoundedIcon />
          </Box>
          <SimCardRoundedIcon
            sx={{ fontSize: '40px', transform: 'rotate(90deg)' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
            <TextField
              id="standard-basic"
              label="Card number"
              autoComplete="card-number"
              placeholder="0000 0000 0000 0000"
              variant="standard"
              required
              sx={{ flexGrow: 1 }}
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            <TextField
              id="cvv"
              label="CVV"
              autoComplete="CVV"
              placeholder="123"
              variant="standard"
              required
              sx={{ maxWidth: '20%' }}
              value={cvv}
              onChange={handleCvvChange}
            />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
            <TextField
              id="card-name"
              label="Name"
              autoComplete="card-name"
              placeholder="John Smith"
              variant="standard"
              required
            />
            <TextField
              id="card-expiration"
              label="Expiration date"
              autoComplete="card-expiration"
              placeholder="MM/YY"
              variant="standard"
              required
              value={expirationDate}
              onChange={handleExpirationDateChange}
            />
          </Box>
        </Box>
      </Box>
      <FormControlLabel
        control={<Checkbox name="saveCard" />}
        label="Remember credit card details for next time"
        sx={{ justifyContent: 'center' }}
      />
      <Divider sx={{ display: { xs: '', sm: 'none' }, mt: 2 }} />
    </React.Fragment>
  );
}
