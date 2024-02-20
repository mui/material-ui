import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';

import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import SimCardRoundedIcon from '@mui/icons-material/SimCardRounded';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm() {
  const [cardName, setCardName] = React.useState('');
  const [cardNumber, setCardNumber] = React.useState('');
  const [expiryDate, setExpiryDate] = React.useState('');
  const [cvv, setCvv] = React.useState('');

  const formatCardNumber = (number: string) => {
    const cleanedNumber = number
      .replace(/\s?/g, '')
      .replace(/(\d{4})(?=\d)/g, '$1 ');
    return cleanedNumber || '0000 0000 0000 0000';
  };

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <Card
          variant="outlined"
          sx={{
            width: { xs: '100%', sm: '70%' },
            minHeight: '200px',
            opacity: 0.5,
            mb: 4,
            pointerEvents: 'none',
          }}
        >
          <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">Credit card</Typography>
              <CreditCardRoundedIcon />
            </Box>
            <SimCardRoundedIcon
              sx={{ fontSize: '40px', transform: 'rotate(90deg)' }}
            />
            <Typography variant="h6">{formatCardNumber(cardNumber)}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">{cardName || 'Name'}</Typography>
              <Typography variant="subtitle2">{expiryDate || 'MM/YY'}</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel required>Name on card</FormLabel>
          <InputBase
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
            id="card-name"
            name="card-name"
            type="text"
            placeholder="John Snow"
            autoComplete="cc-name"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel required>Card number</FormLabel>
          <InputBase
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            id="card-number"
            name="card-number"
            type="text"
            placeholder="0000 0000 0000 0000"
            autoComplete="cc-number"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel required>Expiry date</FormLabel>
          <InputBase
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            id="card-exp"
            name="card-exp"
            type="text"
            placeholder="02 / 24"
            autoComplete="cc-exp"
            inputProps={{ required: true }}
            sx={{ minWidth: { xs: '', sm: 280 }, maxHeight: '40px' }}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel required>CVV</FormLabel>
          <InputBase
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            id="cvv"
            name="cvv"
            type="text"
            placeholder="123"
            autoComplete="cc-csc"
            inputProps={{ required: true }}
            sx={{ minWidth: { xs: '', sm: 280 } }}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveCard" />}
            label="Remember credit card details for next time"
          />
        </FormGrid>
      </Grid>
      <Divider sx={{ display: { xs: '', sm: 'none' }, mt: 2 }} />
    </React.Fragment>
  );
}
