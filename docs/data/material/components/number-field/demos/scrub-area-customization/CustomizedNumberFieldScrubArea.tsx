import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import NumberField from '@mui/material/NumberField';

export default function CustomizedNumberFieldScrubArea() {
  return (
    // @focus-start @padding 2
    <NumberField
      label="Quantity"
      defaultValue={5}
      scrubAreaPosition="start"
      slotProps={{
        scrubArea: ({ scrubbing }) => ({
          children: <DragIndicatorIcon fontSize="small" />,
          sx: {
            color: 'primary.main',
            bgcolor: scrubbing ? 'action.selected' : 'transparent',
          },
        }),
        scrubAreaCursor: {
          children: <SwapHorizIcon fontSize="small" />,
          sx: {
            color: 'primary.main',
          },
        },
      }}
    />
    // @focus-end
  );
}
