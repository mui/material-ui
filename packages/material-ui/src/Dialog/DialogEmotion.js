import { createDialog } from '@material-ui/naked';
import Modal from '../Modal';
import Backdrop from '../Backdrop';
import Fade from '../Fade';
import Paper from '../Paper';
import styled from '@emotion/styled';
import styles from './Dialog.styles';
import { capitalize } from '@material-ui/core/utils/helpers';

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
const Dialog = createDialog(
  {
    Modal: styled(Modal)(props => styles(props.theme).root),
    Container: styled('div')(
      props => styles(props.theme).container,
      props => styles(props.theme)[`scroll${capitalize(props.scroll)}`],
    ),
    Backdrop,
    Fade,
    Paper: styled(Paper)(
      props => styles(props.theme).paper,
      props => styles(props.theme)[`paperScroll${capitalize(props.scroll)}`],
      props => styles(props.theme)[`paperWidth${capitalize(String(props.maxWidth))}`],
      props => props.fullScreen && styles(props.theme).paperFullScreen,
      props => props.fullWidth && styles(props.theme).paperFullWidth,
    ),
  },
  (nodeName, props) => props,
);

export default Dialog;
