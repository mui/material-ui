export const DigitalClockItem = styled(MenuItem, {
  name: 'MuiDigitalClock',
  slot: 'Item',
  shouldForwardProp: (prop) => prop !== 'itemValue' && prop !== 'formattedValue',
  overridesResolver: (props, styles) => styles.item,
})(({ theme }) => ({
  padding: '8px 16px',
  margin: '2px 4px',
  '&:first-of-type': {
    marginTop: 4,
  },
  '&:hover': {
    backgroundColor: theme.alpha(
      (theme.vars || theme).palette.primary.main,
      (theme.vars || theme).palette.action.hoverOpacity
    ),
  },
  '&.Mui-selected': {
    backgroundColor: (theme.vars || theme).palette.primary.main,
    color: (theme.vars || theme).palette.primary.contrastText,
    '&:focus-visible, &:hover': {
      backgroundColor: (theme.vars || theme).palette.primary.dark,
    },
  },
  '&.Mui-focusVisible': {
    backgroundColor: theme.alpha(
      (theme.vars || theme).palette.primary.main,
      (theme.vars || theme).palette.action.focusOpacity
    ),
  },
}));
