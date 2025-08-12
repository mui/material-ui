const Value = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  lineHeight: '100%',
  paddingRight: 8,
  fontVariantNumeric: 'tabular-nums',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  '&.good': {
    backgroundColor: theme.alpha((theme.vars || theme).palette.success.main, 0.3),
  },
  '&.bad': {
    backgroundColor: theme.alpha((theme.vars || theme).palette.error.main, 0.3),
  },
}));
