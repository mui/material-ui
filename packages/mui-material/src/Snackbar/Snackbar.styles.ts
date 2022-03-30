import { Theme } from '../styles';
import type { SnackbarProps } from './Snackbar';

const snackbarStyles = ({
  theme,
  ownerState,
}: {
  theme: Theme;
  ownerState: SnackbarProps & { isRtl: boolean };
}) => {
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
};

export default snackbarStyles;
