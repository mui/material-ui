import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

export default function AccordionDisabled() {
  return (
    <AccordionGroup sx={{ maxWidth: 400 }}>
      <Accordion disabled>
        <AccordionSummary>First Header</AccordionSummary>
        <AccordionDetails>Content of the first accordion.</AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary>Second Header</AccordionSummary>
        <AccordionDetails>Content of the second accordion.</AccordionDetails>
      </Accordion>
      <Accordion expanded disabled>
        <AccordionSummary>Third Header</AccordionSummary>
        <AccordionDetails>Content of the third accordion.</AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
