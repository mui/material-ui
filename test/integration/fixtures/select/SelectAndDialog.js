import * as React from 'react';
import PropTypes from 'prop-types';
import { MenuItem } from 'src/Menu';
import Select from 'src/Select';
import Dialog from 'src/Dialog';

// interface Props {
//  MenuProps?: MenuProps;
// }

function SelectAndDialog(props) {
  return (
    <Dialog open>
      <Select value={10} MenuProps={props.MenuProps}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </Dialog>
  );
}

SelectAndDialog.propTypes = {
  MenuProps: PropTypes.object,
};
export default SelectAndDialog;
