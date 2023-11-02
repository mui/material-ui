const Custom = styled('div')(({ theme }) => ({
  background: theme.vars.palette.background.level0,
  '&:hover': {
    background: theme.vars.palette.background.level1,
  },
  '&:active': {
    background: theme.vars.palette.background.level0,
  },
}));

<div>
  <Card
    sx={{
      bgcolor: 'background.level0',
      '&:hover': {
        bgcolor: 'background.level1',
      },
      '&:active': {
        bgcolor: 'background.level0',
      },
    }}
  />
</div>;

extendTheme({
  typography: {
    kbd: {
      background:
        'linear-gradient(to top, var(--joy-palette-background-level0), var(--joy-palette-background-level1), var(--joy-palette-background-level0))',
      border: '1px solid var(--joy-palette-background-translucent)',
      borderRadius: 'var(--joy-radius-xs)',
      boxShadow: 'var(--joy-shadow-sm)',
      padding: '0.125em 0.375em',
    },
  },
});
