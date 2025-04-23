import PropTypes from 'prop-types-compat';
function Grid(props) {
  const { spacing } = props;
  return <div>spacing: {spacing}</div>;
}

Grid.propTypes = {
  spacing: PropTypes.oneOf(['auto', 'initial', 1, 2, 3, 4, 5]),
};

export default Grid;
