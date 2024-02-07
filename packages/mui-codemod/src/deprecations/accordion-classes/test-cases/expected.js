fn({
  MuiAccordionSummary: {
    styleOverrides: {
      gutters: {
        '& .MuiAccordionSummary-content': {
          color: 'red',
        },
      },
    },
  },
});

styled(Component)(() => {
  return {
    '.MuiAccordionSummary-gutters .MuiAccordionSummary-content': {
      color: 'red',
    },
  };
});

styled(Component)(() => {
  return {
    '.MuiAccordionSummary-gutters .MuiAccordionSummary-content': {
      color: 'red',
    },
  };
});

<>
  <AccordionSummary
    sx={{
      '.MuiAccordionSummary-gutters .MuiAccordionSummary-content': {
        color: 'red',
      },
    }}
  />

  <AccordionSummary
    sx={{
      '.MuiAccordionSummary-gutters .MuiAccordionSummary-content': {
        color: 'red',
      },
    }}
  />
</>;
