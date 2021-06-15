import { styled } from '@material-ui/core/styles';
import { DIALOG_WIDTH, VIEW_HEIGHT } from '../constants/dimensions';

const PickerView = styled('div')({
  overflowX: 'hidden',
  width: DIALOG_WIDTH,
  maxHeight: VIEW_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
});

export default PickerView;
