export default ({ linked, linkInverted, muiBaseTheme, primary }) => ({
  MuiTypography: {
    root: {
      '&.text--link': {
        ...linked,
        textDecoration: 'underline',
      },
      '&.text--inline': {
        display: 'inline-block',
      },
      '&.text--indented': {
        marginLeft: muiBaseTheme.spacing.unit,
      },
      '&.text--indented-lg': {
        marginLeft: muiBaseTheme.spacing.unit * 3,
      },
      '&.text--bold': {
        fontWeight: 'bold',
      },
      '&.text--inverted': {
        color: muiBaseTheme.palette.common.white,
      },
      '&.text--link-inverted': linkInverted,
      '&.text--light': {
        opacity: 0.6,
      },
      '&.text--icon': {
        display: 'flex',
        alignItems: 'flex-end',
        '& .MuiSvgIcon-root': {
          marginRight: muiBaseTheme.spacing.unit / 2,
        },
      },
      '&.text--icon.text--inline': {
        display: 'inline-flex',
      },
      '&.text--link-hovered:hover': {
        cursor: 'pointer',
        color: primary.main,
      },
    },
  },
});
