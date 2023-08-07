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
        borderRadius: 'lg',
        [`& .${accordionSummaryClasses.button}:hover`]: {
          bgcolor: 'transparent',
        },
        [`& .${accordionDetailsClasses.root}`]: {
          boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
          [`&.${accordionDetailsClasses.expanded}`]: {
            paddingBlock: '1rem',
          },
        },
      }}
    >
      <Accordion defaultExpanded>
        <AccordionSummary>First accordion</AccordionSummary>
        <AccordionDetails variant="soft">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <ListDivider />
      <Accordion>
        <AccordionSummary>Second accordion</AccordionSummary>
        <AccordionDetails variant="soft">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
      <ListDivider />
      <Accordion>
        <AccordionSummary>Third accordion</AccordionSummary>
        <AccordionDetails variant="soft">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}
