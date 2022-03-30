import type { SnackbarsProviderProps } from './SnackbarsProvider';
import snackbarStyles from '../Snackbar/Snackbar.styles';
import { styled } from '../styles';

const SnackbarsContainer = styled('div', {
  name: 'MuiSnackbarsContainer',
  slot: 'Root',
})<{
  ownerState: SnackbarsProviderProps & { isRtl: boolean };
  /* @ts-expect-error */
}>(({ theme, ownerState }) => {
  return {
    ...(ownerState.anchorOrigin!.vertical === 'bottom' && { flexDirection: 'column-reverse' }),
    ...(ownerState.anchorOrigin!.vertical === 'top' && { flexDirection: 'column' }),
    ...snackbarStyles({ theme, ownerState }),
  };
});

export default SnackbarsContainer;
