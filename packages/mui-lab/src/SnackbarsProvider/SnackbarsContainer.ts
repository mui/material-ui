import { styled } from '@mui/material/styles';
import type { SnackbarsProviderProps } from './SnackbarsProvider';

const SnackbarsContainer = styled('div', {
  name: 'MuiSnackbarsContainer',
  slot: 'Root',
})<{
  ownerState: SnackbarsProviderProps;
}>(({ theme, ownerState }) => {
  const center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)',
  };

  return {
    ...(ownerState.anchorOrigin!.vertical === 'bottom' && { flexDirection: 'column-reverse' }),
    ...(ownerState.anchorOrigin!.vertical === 'top' && { flexDirection: 'column' }),
    zIndex: theme.zIndex.snackbar,
    position: 'fixed',
    display: 'flex',
    left: theme.spacing(),
    right: theme.spacing(),
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.anchorOrigin!.vertical === 'top'
      ? { top: theme.spacing() }
      : { bottom: theme.spacing() }),
    ...(ownerState.anchorOrigin!.horizontal === 'left' && { justifyContent: 'flex-start' }),
    ...(ownerState.anchorOrigin!.horizontal === 'right' && { justifyContent: 'flex-end' }),
    [theme.breakpoints.up('sm')]: {
      ...(ownerState.anchorOrigin!.vertical === 'top'
        ? { top: theme.spacing(3) }
        : { bottom: theme.spacing(3) }),
      ...(ownerState.anchorOrigin!.horizontal === 'center' && center),
      ...(ownerState.anchorOrigin!.horizontal === 'left' && {
        left: theme.spacing(3),
        right: 'auto',
      }),
      ...(ownerState.anchorOrigin!.horizontal === 'right' && {
        right: theme.spacing(3),
        left: 'auto',
      }),
    },
  };
});

export default SnackbarsContainer;
