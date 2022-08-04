import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';

export default function RadioButtonsGroup() {
  const [alignment, setAlignment] = React.useState('left');
  return (
    <RadioGroup
      orientation="horizontal"
      aria-label="Alignment"
      name="alignment"
      variant="outlined"
      value={alignment}
      onChange={(event) => setAlignment(event.target.value)}
    >
      {['left', 'center', 'right', 'justify'].map((item) => (
        <Box
          sx={(theme) => ({
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 48,
            height: 48,
            '&:not([data-first-child])': {
              borderLeft: '1px solid',
              borderColor: 'divider',
            },
            [`&[data-first-child] .${radioClasses.action}`]: {
              borderTopLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
              borderBottomLeftRadius: `calc(${theme.vars.radius.sm} - 1px)`,
            },
            [`&[data-last-child] .${radioClasses.action}`]: {
              borderTopRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
              borderBottomRightRadius: `calc(${theme.vars.radius.sm} - 1px)`,
            },
          })}
        >
          <Radio
            value={item}
            disableIcon
            overlay
            label={
              {
                left: <FormatAlignLeftIcon />,
                right: <FormatAlignRightIcon />,
                center: <FormatAlignCenterIcon />,
                justify: <FormatAlignJustifyIcon />,
              }[item]
            }
            variant={alignment === item ? 'solid' : 'plain'}
            componentsProps={{
              input: { 'aria-label': item },
            }}
            sx={{
              [`& .${radioClasses.action}`]: { borderRadius: 0, transition: 'none' },
              [`& .${radioClasses.label}`]: { lineHeight: 0 },
            }}
          />
        </Box>
      ))}
    </RadioGroup>
  );
}
