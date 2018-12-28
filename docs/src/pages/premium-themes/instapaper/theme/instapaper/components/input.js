export default ({ nest, primary, NOTCHED_OUTLINE }) => ({
  MuiOutlinedInput: {
    root: {
      '& svg': {
        fontSize: 16,
        color: '#999999',
      },
      [nest(NOTCHED_OUTLINE.focused)]: {
        border: `2px solid ${primary.main}`,
      },
      backgroundColor: '#fafafa',
      borderRadius: 3,
    },
    notchedOutline: {
      border: '1px solid #dbdbdb',
    },
    input: {
      padding: '5px 10px 5px 0',
      fontSize: 14,
      lineHeight: '18px',
    },
  },
});
