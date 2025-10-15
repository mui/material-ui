<Box
  sx={{
    mb: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 2,
    color: tier.title === 'Professional' ? 'grey.100' : '',
    backgroundColor: (theme) =>
      theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
    borderBottom: (theme) =>
      `1px solid ${theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'}`,
  }}
></Box>;

<Card
  sx={(theme) => ({
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    ...(tier.title === 'Professional' && {
      border: 'none',
      boxShadow:
        theme.palette.mode === 'light'
          ? `0 8px 12px hsla(210, 98%, 42%, 0.2)`
          : `0 8px 12px hsla(0, 0%, 0%, 0.8)`,
      background: 'radial-gradient(circle at 50% 0%, hsl(210, 98%, 35%), hsl(210, 100%, 16%))',
    }),
  })}
></Card>;

<Card
  key={index}
  component={Button}
  onClick={() => handleItemClick(index)}
  sx={(theme) => ({
    p: 3,
    height: 'fit-content',
    width: '100%',
    background: 'none',
    ...(selectedItemIndex === index && {
      backgroundColor: 'action.selected',
      borderColor: theme.palette.mode === 'light' ? 'primary.light' : 'primary.dark',
    }),
    '&:hover': {
      background:
        theme.palette.mode === 'light'
          ? 'linear-gradient(to bottom right, hsla(210, 100%, 97%, 0.5) 25%, hsla(210, 100%, 90%, 0.3) 100%)'
          : 'linear-gradient(to right bottom, hsla(210, 100%, 12%, 0.2) 25%, hsla(210, 100%, 16%, 0.2) 100%)',
      borderColor: theme.palette.mode === 'light' ? 'primary.light' : 'primary.dark',
      boxShadow:
        theme.palette.mode === 'light'
          ? '0px 2px 8px hsla(0, 0%, 0%, 0.1)'
          : '0px 1px 8px hsla(210, 100%, 25%, 0.5) ',
    },
  })}
></Card>;

<CreditCardRoundedIcon
  fontSize="small"
  sx={(theme) => ({
    color: theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
    ...(paymentType === 'creditCard' && {
      color: 'primary.main',
    }),
  })}
/>;

<IconButton
  edge="start"
  color="inherit"
  aria-label="open drawer"
  onClick={toggleDrawer}
  sx={{
    marginRight: '36px',
    ...(open && { display: 'none' }),
  }}
>
  <MenuIcon />
</IconButton>;

<div
  sx={[
    {
      ...(selectedItemIndex === index && {
        backgroundColor: 'action.selected',
        borderColor: theme.palette.mode === 'light' ? 'primary.light' : 'primary.dark',
      }),
    },
    (theme) => ({
      color: theme.palette.mode === 'light' ? 'grey.400' : 'grey.600',
      ...(paymentType === 'creditCard' && {
        color: 'primary.main',
      }),
    }),
    {
      marginRight: '36px',
      ...(open && { display: 'none' }),
    },
  ]}
/>;

<Step
  key={step}
  indicator={
    <StepIndicator
      variant={activeStep <= index ? 'soft' : 'solid'}
      color={activeStep < index ? 'neutral' : 'primary'}
    >
      {activeStep <= index ? index + 1 : <Check />}
    </StepIndicator>
  }
  sx={{
    '&:not([data-active])': {
      '&::after': {
        ...(activeStep > index && index !== 2 && { bgcolor: 'primary.solidBg' }),
      },
    },
  }}
>
  <StepButton onClick={() => setActiveStep(index)}>{step}</StepButton>
</Step>;
