import PropTypes from 'prop-types';

const forwardRef = f => f;
const AppBar = forwardRef(function AppBar() {});

AppBar.propTypes = {
  classes: PropTypes.object,
};
