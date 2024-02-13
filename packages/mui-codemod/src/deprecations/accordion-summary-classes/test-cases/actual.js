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

styled(Component)(() => {
  return {
    '& .MuiAccordionSummary-contentGutters': {
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
