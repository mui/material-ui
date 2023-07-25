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
        onChange={(event, newValue) => setSize(newValue)}
      >
        <Button value="sm">Small</Button>
        <Button value="md">Medium</Button>
        <Button value="lg">Large</Button>
      </ToggleButtonGroup>
      <AccordionGroup size={size}>
        <Accordion>
          <AccordionSummary>First Header</AccordionSummary>
          <AccordionDetails>Content of the first accordion.</AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Second Header</AccordionSummary>
          <AccordionDetails>Content of the second accordion.</AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary>Third Header</AccordionSummary>
          <AccordionDetails>Content of the third accordion.</AccordionDetails>
        </Accordion>
      </AccordionGroup>
    </Stack>
  );
}
