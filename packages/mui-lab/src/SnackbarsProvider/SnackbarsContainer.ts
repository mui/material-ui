import { styled } from '@mui/material/styles';
import type { SnackbarsProviderProps } from './SnackbarsProvider';

const SnackbarsContainer = styled('div', {
  name: 'MuiSnackbarsContainer',
  slot: 'Root',
})<{
  ownerState: SnackbarsProviderProps & { isRtl: boolean };
}>(({ theme, ownerState }) => {
  const center = {
    ...(!ownerState.isRtl && {
      left: '50%',
      right: 'auto',
      transform: 'translateX(-50%)',
    }),
    ...(ownerState.isRtl && {
      right: '50%',
      left: 'auto',
      transform: 'translateX(50%)',
    }),
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
        ...(!ownerState.isRtl && {
          left: theme.spacing(3),
          right: 'auto',
        }),
        ...(ownerState.isRtl && {
          right: theme.spacing(3),
          left: 'auto',
        }),
      }),
      ...(ownerState.anchorOrigin!.horizontal === 'right' && {
        ...(!ownerState.isRtl && {
          right: theme.spacing(3),
          left: 'auto',
        }),
        ...(ownerState.isRtl && {
          left: theme.spacing(3),
          right: 'auto',
        }),
      }),
    },
  };
});

export default SnackbarsContainer;
