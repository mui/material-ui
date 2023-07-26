import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import AddIcon from '@mui/icons-material/Add';

export default function AccordionIndicator() {
  return (
    <AccordionGroup
      sx={{
        maxWidth: 400,
        [`& .${accordionSummaryClasses.indicator}`]: {
          transition: '0.2s',
        },
        [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]: {
          transform: 'rotate(45deg)',
        },
      }}
    >
      <Accordion>
        <AccordionSummary indicator={<AddIcon />}>First Header</AccordionSummary>
        <AccordionDetails>Content of the first accordion.</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary indicator={<AddIcon />}>Second Header</AccordionSummary>
        <AccordionDetails>Content of the second accordion.</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary indicator={<AddIcon />}>Third Header</AccordionSummary>
        <AccordionDetails>Content of the third accordion.</AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
