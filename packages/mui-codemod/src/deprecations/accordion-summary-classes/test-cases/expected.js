import { accordionSummaryClasses } from '@mui/material/AccordionSummary';

fn({
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        '&.MuiAccordionSummary-gutters .MuiAccordionSummary-content': {
          color: 'red',
        },
      },
    },
  },
});

fn({
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        [`&.${accordionSummaryClasses.gutters} .${accordionSummaryClasses.content}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    '&.MuiAccordionSummary-gutters .MuiAccordionSummary-content': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`&.${accordionSummaryClasses.gutters} .${accordionSummaryClasses.content}`]: {
      color: 'red',
    },
  };
});

<AccordionSummary
  sx={{
    '&.MuiAccordionSummary-gutters .MuiAccordionSummary-content': {
      color: 'red',
    },
  }}
/>;

<AccordionSummary
  sx={{
    [`&.${accordionSummaryClasses.gutters} .${accordionSummaryClasses.content}`]: {
      color: 'red',
    },
  }}
/>;
