import * as React from 'react';
import PropTypes from 'prop-types';
function Grid(props) {
  const { series, pieSeries } = props;
  return <div>{series.type}</div>;
}

Grid.propTypes = {
  pieSeries: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.oneOf(['pie']).isRequired,
  }).isRequired,
  series: PropTypes.oneOfType([
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.string).isRequired,
      type: PropTypes.oneOf(['pie']).isRequired,
    }),
    PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
      type: PropTypes.oneOf(['line']).isRequired,
    }),
  ]).isRequired,
};

export default Grid;
