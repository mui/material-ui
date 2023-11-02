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

extendTheme({
  typography: {
    kbd: {
      background:
        'linear-gradient(to top, var(--joy-palette-background-body), var(--joy-palette-background-surface), var(--joy-palette-background-popup))',
      border: '1px solid var(--joy-palette-background-backdrop)',
      borderRadius: 'var(--joy-radius-xs)',
      boxShadow: 'var(--joy-shadow-sm)',
      padding: '0.125em 0.375em',
    },
  },
});
