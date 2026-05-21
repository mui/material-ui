import { alpha } from '@mui/system/colorManipulator';

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
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.success.mainChannel} /  0.3)`
      : alpha(theme.palette.success.main, 0.3),
  },
  '&.bad': {
    backgroundColor: theme.vars
      ? `rgba(${theme.vars.palette.error.mainChannel} /  0.3)`
      : alpha(theme.palette.error.main, 0.3),
  },
}));
