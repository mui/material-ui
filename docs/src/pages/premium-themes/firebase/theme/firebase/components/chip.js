export default ({ muiBaseTheme, white }) => ({
  MuiChip: {
    root: {
      '&.chip--inverted': {
        backgroundColor: 'rgba(0,0,0,0.08)',
        '& .chip__label': {
          color: white.primary,
        },
        '&:hover, &:active, &:focus': {
          backgroundColor: muiBaseTheme.palette.divider,
          '& .chip__label': {
            color: white.text,
          },
        },
      },
      '&.chip--narrow': {
        '& .chip__icon': {
          marginLeft: 2,
          marginRight: -muiBaseTheme.spacing.unit / 2,
        },
        '& .chip__Zlabel': {
          fontSize: 14,
        },
      },
    },
  },
});
