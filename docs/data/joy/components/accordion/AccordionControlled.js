import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

export default function AccordionControlled() {
  const [index, setIndex] = React.useState(0);
  return (
    <AccordionGroup sx={{ maxWidth: 400 }}>
      <Accordion
        expanded={index === 0}
        onChange={(event, expanded) => {
          setIndex(expanded ? 0 : null);
        }}
      >
        <AccordionSummary>First Header</AccordionSummary>
        <AccordionDetails>Content of the first accordion.</AccordionDetails>
      </Accordion>
      <Accordion
        expanded={index === 1}
        onChange={(event, expanded) => {
          setIndex(expanded ? 1 : null);
        }}
      >
        <AccordionSummary>Second Header</AccordionSummary>
        <AccordionDetails>Content of the second accordion.</AccordionDetails>
      </Accordion>
      <Accordion
        expanded={index === 2}
        onChange={(event, expanded) => {
          setIndex(expanded ? 2 : null);
        }}
      >
        <AccordionSummary>Third Header</AccordionSummary>
        <AccordionDetails>Content of the third accordion.</AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
