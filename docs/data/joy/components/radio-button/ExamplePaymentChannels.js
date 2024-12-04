import * as React from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import Switch from '@mui/joy/Switch';

export default function ExamplePaymentChannels() {
  const [orientation, setOrientation] = React.useState('vertical');
  return (
    <Box sx={{ minWidth: 240 }}>
      <Box
        sx={{
          mb: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          id="example-payment-channel-label"
          level="title-md"
          textColor={'text.secondary'}
          sx={{ fontWeight: 'xl' }}
        >
          Pay with
        </Typography>
        <Switch
          component="label"
          size="sm"
          startDecorator="List"
          endDecorator="Row"
          checked={orientation === 'horizontal'}
          onChange={(event) =>
            setOrientation(event.target.checked ? 'horizontal' : 'vertical')
          }
        />
      </Box>
      <RadioGroup
        aria-labelledby="example-payment-channel-label"
        overlay
        name="example-payment-channel"
        defaultValue="Paypal"
      >
        <List
          component="div"
          variant="outlined"
          orientation={orientation}
          sx={{ borderRadius: 'sm', boxShadow: 'sm' }}
        >
          {['Credit Card', 'Paypal', 'QR Code'].map((value, index) => (
            <React.Fragment key={value}>
              {index !== 0 && <ListDivider />}
              <ListItem>
                <Radio id={value} value={value} label={value} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </RadioGroup>
    </Box>
  );
}
