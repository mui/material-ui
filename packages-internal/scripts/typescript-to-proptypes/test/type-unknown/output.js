import PropTypes from 'prop-types-compat';
function Select(props) {
  const { value, variant } = props;
  return <div></div>;
}

Select.propTypes = {
  value: PropTypes.any,
  variant: PropTypes.any.isRequired,
};

export default Select;
