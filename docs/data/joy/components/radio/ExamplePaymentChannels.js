import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Switch from '@mui/joy/Switch';

export default function ExamplePaymentChannels() {
  const [row, setRow] = React.useState(false);
  return (
    <Box sx={{ minWidth: 240 }}>
      <Box sx={{ mb: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Typography id="example-payment-channel-label">Pay with</Typography>
        <Switch
          size="sm"
          endDecorator="Row"
          checked={row}
          onChange={(event) => setRow(event.target.checked)}
        />
      </Box>
      <RadioGroup
        aria-labelledby="example-payment-channel-label"
        overlay
        name="example-payment-channel"
      >
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: 'sm',
            boxShadow: 'sm',
            p: row ? '0px 6px' : '6px 0px',
          }}
        >
          <List row={row}>
            {['Credit Card', 'Paypal', 'QR Code'].map((value, index) => (
              <React.Fragment key={value}>
                {index !== 0 && <ListDivider />}
                <ListItem>
                  <Radio id={value} value={value} label={value} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Sheet>
      </RadioGroup>
    </Box>
  );
}
