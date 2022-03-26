import { SnackbarProps } from '../Snackbar';
import { snackbarStyles } from '../Snackbar/Snackbar';
import styled from '../styles/styled';

const SnackbarContainer = styled('div')<{ ownerState: SnackbarProps }>(({ theme, ownerState }) => {
  return {
    display: 'flex',
    ...snackbarStyles({ theme, ownerState }),
    ...(ownerState.anchorOrigin?.vertical === 'bottom' &&
      ownerState.anchorOrigin?.horizontal === 'left' && { flexDirection: 'column-reverse' }),
  };
});

export default SnackbarContainer;
