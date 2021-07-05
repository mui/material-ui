theme.palette.type = isDark ? 'dark' : 'light';
({
  color: palette.type === 'dark' ? '#fff' : palette.text.primary,
  '&:hover': () => ({
    color: palette.type === 'dark' ? palette.primary.light : palette.primary.main,
  }),
  boxShadow: `0 0 0 0.2rem ${Color(normalColor).fade(palette.type === 'dark' ? 0.48 : 0.75)}`,
});
{
  palette: {
    type: 'light';
  }
}
{
  palette: { type: 'light' }
}