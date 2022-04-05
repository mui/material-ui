import type { SnackbarsProviderProps } from './SnackbarsProvider';
import { styled } from '../styles';

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
    left: 8,
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.anchorOrigin!.vertical === 'top' ? { top: 8 } : { bottom: 8 }),
    ...(ownerState.anchorOrigin!.horizontal === 'left' && { justifyContent: 'flex-start' }),
    ...(ownerState.anchorOrigin!.horizontal === 'right' && { justifyContent: 'flex-end' }),
    [theme.breakpoints.up('sm')]: {
      ...(ownerState.anchorOrigin!.vertical === 'top' ? { top: 24 } : { bottom: 24 }),
      ...(ownerState.anchorOrigin!.horizontal === 'center' && center),
      ...(ownerState.anchorOrigin!.horizontal === 'left' && {
        ...(!ownerState.isRtl && {
          left: 24,
          right: 'auto',
        }),
        ...(ownerState.isRtl && {
          right: 24,
          left: 'auto',
        }),
      }),
      ...(ownerState.anchorOrigin!.horizontal === 'right' && {
        ...(!ownerState.isRtl && {
          right: 24,
          left: 'auto',
        }),
        ...(ownerState.isRtl && {
          left: 24,
          right: 'auto',
        }),
      }),
    },
  };
});

export default SnackbarsContainer;
