import { styled } from '@material-ui/core/styles';

const PickerView = styled('div')(
  {
    overflowX: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    margin: '0 auto',
  },
  { name: 'MuiPickerView' },
);

export default PickerView;
