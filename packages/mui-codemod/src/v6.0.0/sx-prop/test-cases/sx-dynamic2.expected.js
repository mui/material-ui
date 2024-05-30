<Accordion
  expanded={expanded}
  onChange={handleExpansion}
  slotProps={{ transition: { timeout: 400 } }}
  sx={[expanded ? {
    '& .MuiAccordion-region': {
      height: 'auto'
    }
  } : {
    '& .MuiAccordion-region': {
      height: 0
    }
  }, expanded ? {
    '& .MuiAccordionDetails-root': {
      display: 'block'
    }
  } : {
    '& .MuiAccordionDetails-root': {
      display: 'none'
    }
  }]}
></Accordion>;

<Box
  sx={[{
    display: 'flex',
    flexDirection: { xs: 'column-reverse', sm: 'row' },
    alignItems: 'end',
    flexGrow: 1,
    gap: 1,
    pb: { xs: 12, sm: 0 },
    mt: { xs: 2, sm: 0 },
    mb: '60px'
  }, activeStep !== 0 ? {
    justifyContent: 'space-between'
  } : {
    justifyContent: 'flex-end'
  }]}
></Box>;

<Box
  sx={[{
    display: 'flex',
    alignItems: 'baseline'
  }, tier.title === 'Professional' ? {
    color: 'grey.50'
  } : {
    color: null
  }]}
></Box>;
