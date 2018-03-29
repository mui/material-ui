import React from 'react';
import PropTypes from 'prop-types';
import GridList, { GridListTile } from 'material-ui/GridList';
import DeleteIcon from 'material-ui-icons/Delete';
import IconButton from 'material-ui/IconButton';
import Tooltip from 'material-ui/Tooltip';

function AppendToBodyTooltips() {
  return (
    <GridList cols={1}>
      <GridListTile>
        <Tooltip id="tooltip-icon" title="Delete" appendToBody>
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </GridListTile>
    </GridList>
  );
}

AppendToBodyTooltips.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AppendToBodyTooltips;
