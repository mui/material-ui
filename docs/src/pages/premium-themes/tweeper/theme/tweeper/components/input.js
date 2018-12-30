export default ({ primary, white, attach, nest, ICON, INPUT_ADORNMENT }) => ({
  MuiInput: {
    root: {
      borderRadius: 100,
      backgroundColor: '#E6ECF0',
      [`& .${ICON.root}, & input::placeholder`]: {
        color: 'rgb(101, 119, 134)',
        opacity: 1,
      },
      '&$focused': {
        backgroundColor: white.text,
        border: `1px solid ${primary.main}`,
        [`& input, & .${ICON.root}`]: {
          color: primary.main,
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
