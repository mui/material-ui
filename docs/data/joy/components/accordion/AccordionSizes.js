import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import Button from '@mui/joy/Button';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import Stack from '@mui/joy/Stack';

export default function AccordionSizes() {
  const [size, setSize] = React.useState('md');
  return (
    <Stack spacing={2} sx={{ maxWidth: 400, flex: 1 }}>
      <ToggleButtonGroup
        size="sm"
        buttonFlex={1}
        value={size}
        onChange={(event, newValue) => setSize(newValue || size)}
      >
        <Button value="sm">Small</Button>
        <Button value="md">Medium</Button>
        <Button value="lg">Large</Button>
      </ToggleButtonGroup>
      <AccordionGroup size={size}>
        <Accordion>
          <AccordionSummary>First accordion</AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Second accordion</AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Third accordion</AccordionSummary>
          <AccordionDetails>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Stack>
  );
}
