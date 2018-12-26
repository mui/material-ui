export default ({ muiBaseTheme, white }) => ({
  MuiList: {
    root: {
      backgroundColor: white.text,
    },
  },
  MuiListItem: {
    root: {
      '& .MuiTypography-root.list__item-text--primary': {
        fontSize: 14,
        fontWeight: 600,
        color: muiBaseTheme.palette.text.primary,
        textDecoration: 'none',
      },
      '& .list__item-text--secondary': {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#999',
      },
      '& .list__item-text--tertiary': {
        fontSize: 12,
        fontWeight: 400,
        color: '#999',
      },
    },
  },
});
