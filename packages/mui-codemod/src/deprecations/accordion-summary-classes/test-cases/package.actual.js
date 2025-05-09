import { accordionSummaryClasses } from '@org/ui/material/AccordionSummary';

fn({
  MuiAccordionSummary: {
    styleOverrides: {
      root: {
        '& .MuiAccordionSummary-contentGutters': {
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
        [`& .${accordionSummaryClasses.contentGutters}`]: {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    '& .MuiAccordionSummary-contentGutters': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    [`& .${accordionSummaryClasses.contentGutters}`]: {
      color: 'red',
    },
  };
});

<AccordionSummary
  sx={{
    '& .MuiAccordionSummary-contentGutters': {
      color: 'red',
    },
  }}
/>;

<AccordionSummary
  sx={{
    [`& .${accordionSummaryClasses.contentGutters}`]: {
      color: 'red',
    },
  }}
/>;
