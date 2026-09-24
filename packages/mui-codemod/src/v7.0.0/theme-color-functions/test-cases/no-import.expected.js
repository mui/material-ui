// This file should not be transformed because it doesn't import from @mui/system/colorManipulator

const Component = styled('div')(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: lighten(theme.palette.text.primary, 0.5),
  border: `1px solid ${darken(theme.palette.divider, 0.2)}`,
}));