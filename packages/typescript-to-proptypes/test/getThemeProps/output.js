import PropTypes from 'prop-types';
function Modal(inProps) {
  const props = getThemeProps({ props: inProps });
  const { onKeyDown, ...other } = props;

  function handleKeyDown(event) {
    if (onKeyDown) {
      onKeyDown(event);
    }
  }

  return <div onKeyDown={handleKeyDown} {...other} />;
}

Modal.propTypes = {
  onKeyDown: PropTypes.func,
};

export default Modal;
