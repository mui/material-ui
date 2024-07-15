import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import ModalClose from '@mui/joy/ModalClose';
import Stack from '@mui/joy/Stack';
import Slider, { sliderClasses } from '@mui/joy/Slider';
import FilterAltOutlined from '@mui/icons-material/FilterAltOutlined';
import CountrySelector from './CountrySelector';
import OrderSelector from './OrderSelector';

function valueText(value: number) {
  return `$${value.toLocaleString('en-US')}`;
}

export default function Filters() {
  const [open, setOpen] = React.useState(false);
  return (
    <Stack
      useFlexGap
      direction="row"
      spacing={{ xs: 0, sm: 2 }}
      sx={{ justifyContent: { xs: 'space-between' }, flexWrap: 'wrap', minWidth: 0 }}
    >
      <Button
        variant="outlined"
        color="neutral"
        startDecorator={<FilterAltOutlined />}
        onClick={() => setOpen(true)}
      >
        Filters
      </Button>
      <OrderSelector />
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Stack useFlexGap spacing={3} sx={{ p: 2 }}>
          <DialogTitle>Filters</DialogTitle>
          <ModalClose />
          <CountrySelector />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gridTemplateRows: 'auto auto',
              gap: 1,
            }}
          >
            <FormLabel htmlFor="filters-start-date">Start date</FormLabel>
            <div />
            <FormLabel htmlFor="filters-end-date">End date</FormLabel>

            <Input
              id="filters-start-date"
              type="date"
              placeholder="Jan 6 - Jan 13"
              aria-label="Date"
            />
            <Box sx={{ alignSelf: 'center' }}>-</Box>
            <Input
              id="filters-end-date"
              type="date"
              placeholder="Jan 6 - Jan 13"
              aria-label="Date"
            />
          </Box>
          <FormControl>
            <FormLabel>Price range</FormLabel>
            <Slider
              defaultValue={[2000, 4900]}
              step={100}
              min={0}
              max={10000}
              getAriaValueText={valueText}
              valueLabelDisplay="auto"
              valueLabelFormat={valueText}
              marks={[
                { value: 0, label: '$0' },
                { value: 5000, label: '$5,000' },
                { value: 10000, label: '$10,000' },
              ]}
              sx={{
                [`& .${sliderClasses.markLabel}[data-index="0"]`]: {
                  transform: 'none',
                },
                [`& .${sliderClasses.markLabel}[data-index="2"]`]: {
                  transform: 'translateX(-100%)',
                },
              }}
            />
          </FormControl>
        </Stack>
      </Drawer>
    </Stack>
  );
}
