import withStyles from '../styles/withStyles';
import Modal from '../Modal';
import Backdrop from '../Backdrop';
import Fade from '../Fade';
import Paper from '../Paper';
import styles from './Dialog.styles';
import { createDialog } from '@material-ui/naked';

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
const Dialog = createDialog({
  Modal,
  Backdrop,
  Fade,
  Paper,
});

export default withStyles(styles, { name: 'MuiDialog' })(Dialog);
