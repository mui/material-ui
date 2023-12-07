import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Input from '@mui/joy/Input';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Stack from '@mui/joy/Stack';
import LocationOn from '@mui/icons-material/LocationOn';

export default function InputDecorators() {
  const [currency, setCurrency] = React.useState('dollar');
  return (
    <Stack spacing={1.5}>
      <Input
        placeholder="Amount"
        startDecorator={{ dollar: '$', baht: '฿', yen: '¥' }[currency]}
        endDecorator={
          <React.Fragment>
            <Divider orientation="vertical" />
            <Select
              variant="plain"
              value={currency}
              onChange={(_, value) => setCurrency(value!)}
              slotProps={{
                listbox: {
                  variant: 'outlined',
                },
              }}
              sx={{ mr: -1.5, '&:hover': { bgcolor: 'transparent' } }}
            >
              <Option value="dollar">US dollar</Option>
              <Option value="baht">Thai baht</Option>
              <Option value="yen">Japanese yen</Option>
            </Select>
          </React.Fragment>
        }
        sx={{ width: 300 }}
      />
      <Input
        placeholder="Your location"
        startDecorator={
          <Button variant="soft" color="neutral" startDecorator={<LocationOn />}>
            Locate
          </Button>
        }
        sx={{ width: 300 }}
      />
    </Stack>
  );
}
