fn({
  MuiTabs: {
    defaultProps: {
      ScrollButtonComponent: CustomScrollButton,
      TabScrollButtonProps: { disableRipple: true },
      TabIndicatorProps: { className: 'indicator' },
    },
  },
});
