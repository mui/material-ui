import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';
import ListDivider from '@mui/joy/ListDivider';

export default function AccordionDivider() {
  return (
    <AccordionGroup sx={{ maxWidth: 400 }}>
      <Accordion>
        <AccordionSummary>First Header</AccordionSummary>
        <AccordionDetails>Content of the first accordion.</AccordionDetails>
      </Accordion>
      <ListDivider />
      <Accordion>
        <AccordionSummary>Second Header</AccordionSummary>
        <AccordionDetails>Content of the second accordion.</AccordionDetails>
      </Accordion>
      <ListDivider />
      <Accordion>
        <AccordionSummary>Third Header</AccordionSummary>
        <AccordionDetails>Content of the third accordion.</AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
