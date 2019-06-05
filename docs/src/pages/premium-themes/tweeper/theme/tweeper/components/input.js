export default ({ theme, white, attach, nest, ICON, INPUT_ADORNMENT }) => ({
  MuiInput: {
    root: {
      borderRadius: 100,
      backgroundColor: '#e6ecf0',
      [`& .${ICON.root}, & input::placeholder`]: {
        color: '#657786',
        opacity: 1,
      },
      '&$focused': {
        backgroundColor: white.text,
        border: `1px solid ${theme.palette.primary.main}`,
        [`& input, & .${ICON.root}`]: {
          color: theme.palette.primary.main,
        },
      },
    },
  },
  MuiInputAdornment: {
    positionStart: {
      [attach(INPUT_ADORNMENT.root)]: {
        [nest(ICON.root)]: {
          marginLeft: 12,
          fontSize: 20,
        },
      },
    },
  },
});
