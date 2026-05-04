import * as React from 'react';
import Badge from '@mui/material/Badge';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import MailIcon from '@mui/icons-material/Mail';
import { HighlightedCode } from '@mui/internal-core-docs/HighlightedCode';

type BadgeVerticalOrigin = 'top' | 'bottom';
type BadgeHorizontalOrigin = 'right' | 'left';

export default function BadgeAlignment() {
  const [horizontal, setHorizontal] = React.useState<BadgeHorizontalOrigin>('right');
  const [vertical, setVertical] = React.useState<BadgeVerticalOrigin>('top');

  const handleHorizontalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHorizontal(event.target.value as BadgeHorizontalOrigin);
  };

  const handleVerticalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVertical(event.target.value as BadgeVerticalOrigin);
  };

  const jsx = `
<Badge
  anchorOrigin={{
    vertical: '${vertical}',
    horizontal: '${horizontal}',
  }}
>
`;

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          '& fieldset': {
            margin: 3,
          },
        }}
      >
        <FormControl component="fieldset">
          <FormLabel component="legend">Vertical</FormLabel>
          <RadioGroup
            name="vertical"
            value={vertical}
            onChange={handleVerticalChange}
          >
            <FormControlLabel value="top" control={<Radio />} label="Top" />
            <FormControlLabel value="bottom" control={<Radio />} label="Bottom" />
          </RadioGroup>
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">Horizontal</FormLabel>
          <RadioGroup
            name="horizontal"
            value={horizontal}
            onChange={handleHorizontalChange}
          >
            <FormControlLabel value="right" control={<Radio />} label="Right" />
            <FormControlLabel value="left" control={<Radio />} label="Left" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box
        aria-hidden
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: 'action.active',
          '& > *': {
            margin: 2,
          },
        }}
      >
        <Badge
          color="secondary"
          variant="dot"
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={1}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={12}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          badgeContent={123}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
        <Badge
          color="secondary"
          max={999}
          badgeContent={1337}
          anchorOrigin={{
            horizontal,
            vertical,
          }}
        >
          <MailIcon />
        </Badge>
      </Box>
      <HighlightedCode code={jsx} language="jsx" />
    </Box>
  );
}
