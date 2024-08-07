import * as React from 'react';
import Box from '@mui/joy/Box';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Typography from '@mui/joy/Typography';

export default function SelectMinWidth() {
  return (
    <Box sx={{ width: 100 }}>
      <Select
        defaultValue="German Shepherd"
        slotProps={{
          listbox: {
            placement: 'bottom-start',
            sx: { minWidth: 160 },
          },
        }}
      >
        <Option value="German Shepherd">German Shepherd</Option>
        <Option value="Anatolian Shepherd Dog">Anatolian Shepherd Dog</Option>
        <Option value="West Highland White Terrier">
          West Highland White Terrier
        </Option>
        <Option value="Maltese dog">Maltese dog</Option>
      </Select>
      <Typography level="body-xs" sx={{ textAlign: 'center', mt: 1 }}>
        Width is fixed at 100px
      </Typography>
    </Box>
  );
}
