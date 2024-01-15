import * as React from 'react';
import PropTypes from 'prop-types';
function Grid(props) {
  const { series } = props;
  return <div>{series.type}</div>;
}

Grid.propTypes = {
  series: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    type: PropTypes.oneOf(['line']).isRequired,
  }).isRequired,
};


export default Grid;
