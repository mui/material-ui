import PropTypes from 'prop-types-compat';
function Dialog(props) {
  const { 'aria-describedby': ariaDescribedby } = props;
  return <div></div>;
}

Dialog.propTypes = {
  'aria-describedby': PropTypes.string.isRequired,
};

export default Dialog;
