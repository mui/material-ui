const Custom = styled('div')(({ theme }) => ({
  background: theme.vars.palette.background.body,
  '&:hover': {
    background: theme.vars.palette.background.surface,
  },
  '&:active': {
    background: theme.vars.palette.background.popup,
  },
}));

<div>
  <Card
    sx={{
      bgcolor: 'background.body',
      '&:hover': {
        bgcolor: 'background.surface',
      },
      '&:active': {
        bgcolor: 'background.popup',
      },
    }}
  />
</div>;
