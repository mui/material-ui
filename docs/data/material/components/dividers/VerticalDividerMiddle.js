import * as React from 'react';
import Card from '@mui/material/Card';
import Divider, { dividerClasses } from '@mui/material/Divider';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatBoldIcon from '@mui/icons-material/FormatBold';

export default function VerticalDividerMiddle() {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        color: 'text.secondary',
        '& svg': {
          m: 1,
        },
        [`& .${dividerClasses.root}`]: {
          mx: 0.5,
        },
      }}
    >
      <FormatAlignLeftIcon />
      <FormatAlignCenterIcon />
      <FormatAlignRightIcon />
      <Divider orientation="vertical" variant="middle" flexItem />
      <FormatBoldIcon />
    </Card>
  );
}
