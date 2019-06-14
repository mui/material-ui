import { createDialog } from '@material-ui/naked';
import Modal from '../Modal';
import Backdrop from '../Backdrop';
import Fade from '../Fade';
import Paper from '../Paper';
import styled from 'styled-components';
import styles from './Dialog.styles';
import { capitalize } from '@material-ui/core/utils/helpers';

function myStyled(component, name, style) {
  return styled(component).withConfig({
    displayName: name,
  })(...style);
}

function withOverride(name, key) {
  return props => {
    const theme = props.theme;
    if (!theme.overrides || !theme.overrides[name] || !theme.overrides[name][key]) {
      return null;
    }

    return theme.overrides[name][key];
  };
}

/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */
const Dialog = createDialog(
  {
    Modal: myStyled(Modal, 'Modal', [
      props => styles(props.theme).root,
      withOverride('MuiDialog', 'root'),
    ]),
    Container: myStyled('div', 'Container', [
      props => styles(props.theme).container,
      props => styles(props.theme)[`scroll${capitalize(props.scroll)}`],
      withOverride('MuiDialog', 'container'),
    ]),
    Backdrop,
    Fade,
    Paper: myStyled(Paper, 'Paper', [
      props => styles(props.theme).paper,
      props => styles(props.theme)[`paperScroll${capitalize(props.scroll)}`],
      props => styles(props.theme)[`paperWidth${capitalize(String(props.maxWidth))}`],
      props => props.fullScreen && styles(props.theme).paperFullScreen,
      props => props.fullWidth && styles(props.theme).paperFullWidth,
      withOverride('MuiDialog', 'paper'),
    ]),
  },
  (nodeName, props) => props,
);

export default Dialog;
