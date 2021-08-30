import * as React from 'react';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ToggleButtonSizes() {
  const [alignment, setAlignment] = React.useState('left');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  const children = [
    <ToggleButton value="left" key="left">
      <FormatAlignLeftIcon fontSize="small" />
    </ToggleButton>,
    <ToggleButton value="center" key="center">
      <FormatAlignCenterIcon fontSize="small" />
    </ToggleButton>,
    <ToggleButton value="right" key="right">
      <FormatAlignRightIcon fontSize="small" />
    </ToggleButton>,
    <ToggleButton value="justify" key="justify">
      <FormatAlignJustifyIcon fontSize="small" />
    </ToggleButton>,
  ];

  const control = {
    value: alignment,
    onChange: handleChange,
    exclusive: true,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // TODO Replace with Stack
        '& > :not(style) + :not(style)': { mt: 2 },
      }}
    >
      <ToggleButtonGroup size="small" {...control}>
        {children}
      </ToggleButtonGroup>
      <ToggleButtonGroup {...control}>{children}</ToggleButtonGroup>
      <ToggleButtonGroup size="large" {...control}>
        {children}
      </ToggleButtonGroup>
    </Box>
  );
}
