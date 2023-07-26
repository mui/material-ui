import * as React from 'react';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
  accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
  accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import ListDivider from '@mui/joy/ListDivider';

export default function AccordionDepthPanel() {
  return (
    <AccordionGroup
      variant="outlined"
      transition="0.2s"
      sx={{
        maxWidth: 400,
        '--List-radius': '6px',
        [`& .${accordionSummaryClasses.button}:hover`]: {
          bgcolor: 'transparent',
        },
        [`& .${accordionDetailsClasses.root}`]: {
          boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
          [`&.${accordionDetailsClasses.expanded}`]: {
            paddingBlockStart: 'calc(2 * var(--ListItem-paddingY))',
          },
        },
      }}
    >
      <Accordion defaultExpanded>
        <AccordionSummary>First Header</AccordionSummary>
        <AccordionDetails variant="soft">
          Content of the first accordion.
        </AccordionDetails>
      </Accordion>
      <ListDivider />
      <Accordion>
        <AccordionSummary>Second Header</AccordionSummary>
        <AccordionDetails variant="soft">
          Content of the second accordion.
        </AccordionDetails>
      </Accordion>
      <ListDivider />
      <Accordion>
        <AccordionSummary>Third Header</AccordionSummary>
        <AccordionDetails variant="soft">
          Content of the third accordion.
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
