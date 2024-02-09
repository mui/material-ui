import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/system';

import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';

const FormGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Payment method
      </Typography>
      <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 4 }}>
        <Card
          component={Button}
          startIcon={<CreditCardRoundedIcon />}
          fullWidth
          sx={{ justifyContent: 'start', pl: 4, py: 4 }}
        >
          <Typography>Credit card</Typography>
        </Card>
        <Card
          component={Button}
          startIcon={<AccountBalanceRoundedIcon />}
          fullWidth
          sx={{ justifyContent: 'start', pl: 4, py: 4 }}
        >
          <Typography>Bank account</Typography>
        </Card>
      </Stack>
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel required>Name on card</FormLabel>
          <InputBase
            id="card-name"
            name="card-name"
            type="card-name"
            placeholder="John Snow"
            autoComplete="card name"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel required>Card number</FormLabel>
          <InputBase
            id="card-number"
            name="card-number"
            type="card-number"
            placeholder="0000 0000 0000 0000"
            autoComplete="cc-number"
            sx={{ minWidth: 280 }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel required>Expiry date</FormLabel>
          <InputBase
            id="card-exp"
            name="card-exp"
            type="card-exp"
            placeholder="02 / 24"
            autoComplete="cc-exp"
            inputProps={{ required: true }}
            sx={{ minWidth: 280, maxHeight: '40px' }}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel required>CVV</FormLabel>
          <InputBase
            id="cvv"
            name="cvv"
            type="cvv"
            placeholder="123"
            autoComplete="cvv"
            inputProps={{ required: true }}
            sx={{ minWidth: 280 }}
          />
          <FormHelperText>Last three digits on signature strip</FormHelperText>
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </FormGrid>
      </Grid>
    </React.Fragment>
  );
}
