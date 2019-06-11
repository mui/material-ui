import PropTypes from 'prop-types';

const forwardRef = f => f;

const AppBar = forwardRef(function AppBar() {});
export const muiDisplayName = 'MuiAppBar';
AppBar.propTypes = {
  classes: PropTypes.object
};