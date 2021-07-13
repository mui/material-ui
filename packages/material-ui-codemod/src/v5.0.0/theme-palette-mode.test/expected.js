theme.palette.mode = isDark ? 'dark' : 'light';
({
  color: palette.mode === 'dark' ? '#fff' : palette.text.primary,
  '&:hover': () => ({
    color: palette.mode === 'dark' ? palette.primary.light : palette.primary.main,
  }),
  boxShadow: `0 0 0 0.2rem ${Color(normalColor).fade(palette.mode === 'dark' ? 0.48 : 0.75)}`,
});
{
  palette: {
    mode: 'light';
  }
}
{
  palette: { mode: 'light' }
}