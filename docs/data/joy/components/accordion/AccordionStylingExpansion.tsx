import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion, { accordionClasses } from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary from '@mui/joy/AccordionSummary';

export default function AccordionStylingExpansion() {
  return (
    <AccordionGroup
      sx={{
        maxWidth: 400,
        [`& .${accordionClasses.root}.${accordionClasses.expanded}`]: {
          mb: 2,
          bgcolor: 'background.level1',
        },
        '& [aria-expanded="true"]': {
          color: 'primary.500',
          boxShadow: (theme) => `inset 0 -1px 0 ${theme.vars.palette.divider}`,
        },
      }}
    >
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
  );
}
